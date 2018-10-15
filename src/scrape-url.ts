import { scrapeFriends, Card, scrapeStars } from "@furugomu/aikatsu-scraper";
import axios from "axios";

const scrapeUrl = async (url: string): Promise<Card> => {
  const { host } = new URL(url);
  if (host === "dcd.sc" || host === "aikatsu.com") {
    const response = await axios.get(url, {
      maxRedirects: 0,
      validateStatus: status => status >= 300 && status < 400
    });
    url = response.headers["location"];
  }

  const { data } = await axios.get(url, { responseType: "text" });
  const { pathname } = new URL(url);
  if (pathname.startsWith("/friends/")) {
    return scrapeFriends(data);
  } else if (pathname.startsWith("/stars/")) {
    return scrapeStars(data);
  } else {
    throw ":-(";
  }
};
export default scrapeUrl;
