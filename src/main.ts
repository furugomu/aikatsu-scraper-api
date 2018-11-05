import express from "express";
import path from "path";
import graphql from "./graphql";
import restapi from "./restapi";

const app = express();

app.use("/graphql", graphql);
app.use("/card", restapi);

app.get("/", (_req, res) => {
  res.sendFile(path.resolve("README.md"));
});

const port = Number(process.env.PORT || 3000);
app.listen(port, () => console.log("hello! " + port));
