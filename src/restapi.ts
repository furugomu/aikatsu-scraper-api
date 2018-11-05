import express from "express";
import scrapeUrl from "./scrape-url";

const api = express();
export default api;

api.use(express.urlencoded({ extended: true }));

api.use((_req, res, next) => {
  res.set("Content-Type", "application/json");
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  next();
});

api.get("/", async (req, res) => {
  const url: string | undefined = req.query.url;
  if (!url) {
    res.status(403);
    return;
  }
  try {
    res.json(await scrapeUrl(url));
  } catch (e) {
    res.status(403).json({ message: e.toString() });
  }
});
