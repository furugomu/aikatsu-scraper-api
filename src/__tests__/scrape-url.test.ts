import "jest";
import assert from "assert";

import scrapeUrl from "../scrape-url";

describe("scrapeUrl", () => {
  test("dcd.sc", async () => {
    const url =
      "http://dcd.sc/n2?i=.kxxNOOxUIa1Lba0XK9PyYlvXsh02Me1_s90WOxcCuBD6tOFXRPfWtlv7qoVXse5.";
    const card = await scrapeUrl(url);
    assert(card.name === "スノープリンセストップス");
  });
});
