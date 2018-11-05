import { Card, scrapeFriends, scrapeStars } from "@furugomu/aikatsu-scraper";
import axios from "axios";

const scrapeUrl = async (originalUrl: string): Promise<Card> => {
  const url = await handleRedirect(originalUrl);

  const { data } = await axios.get(url, { responseType: "text" });
  const { pathname } = new URL(url);
  if (pathname.startsWith("/friends/")) {
    // アイカツフレンズ！
    return scrapeFriends(data);
  } else if (pathname.startsWith("/stars/")) {
    // アイカツスターズ！
    return scrapeStars(data);
  } else {
    // アイカツ！ の裏面 QR はカードのページに飛ばないのでだめ
    // あるいは全然アイカツじゃない URL
    throw "このURLはだめ " + url;
  }
};

// http -> https とか dcd.sc -> aikatsu.com とか aikatsu.com -> www.aikatsu.com とか
const handleRedirect = async (
  url: string,
  attempts: number = 1
): Promise<string> => {
  const { host } = new URL(url);
  const hosts = ["dcd.sc", "aikatsu.com"]; // リダイレクトするはずのホスト
  if (!hosts.includes(host)) return url;
  if (attempts > 3) throw "リダイレクトしすぎ";
  const response = await axios.get(url, {
    maxRedirects: 0,
    validateStatus: status => status >= 300 && status < 400
  });
  return handleRedirect(response.headers["location"], attempts + 1);
};
export default scrapeUrl;
