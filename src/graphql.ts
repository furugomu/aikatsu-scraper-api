import express from "express";
import graphqlHTTP from "express-graphql";
import { buildSchema } from "graphql";
import scrapeUrl from "./scrape-url";
import { Card } from "@furugomu/aikatsu-scraper";

const app = express();
export default app;

const schema = buildSchema(`
enum Type {
  CUTE
  COOL
  SEXY
  POP
}
enum Category {
  TOPS
  BOTTOMS
  SHOES
  TOPS_BOTTOMS
}
type AikatsuCard {
  id: String!
  name: String!
  type: Type!
  category: String!
  brand: String!
  appealPoint: Int!
  rarity: String!
  rarityLevel: Int!
}

type Query {
  scrape(url: String!): AikatsuCard!
}
`);

interface AikatsuCardGQL {
  id: string;
  name: string;
  type: "CUTE" | "COOL" | "SEXY" | "POP";
  category: "TOPS" | "BOTTOMS" | "SHOES" | "ACCESSORY" | "TOPS_BOTTOMS";
  brand: string;
  appealPoint: number;
  rarity: string;
  rarityLevel: number;
}

const convertType = (type: Card["type"]): AikatsuCardGQL["type"] => {
  switch (type) {
    case "キュート":
      return "CUTE";
    case "クール":
      return "COOL";
    case "セクシー":
      return "SEXY";
    case "ポップ":
      return "POP";
  }
};

const convertCategory = (
  category: Card["category"]
): AikatsuCardGQL["category"] => {
  switch (category) {
    case "トップス":
      return "TOPS";
    case "ボトムス":
      return "BOTTOMS";
    case "シューズ":
      return "SHOES";
    case "アクセサリー":
      return "ACCESSORY";
    case "トップス＆ボトムス":
      return "TOPS_BOTTOMS";
  }
};

const convert = (card: Card): AikatsuCardGQL => ({
  ...card,
  type: convertType(card.type),
  category: convertCategory(card.category)
});

const rootValue = {
  scrape: ({ url }: { url: string }): Promise<AikatsuCardGQL> =>
    scrapeUrl(url).then(convert)
};
app.use("/", graphqlHTTP({ schema, rootValue, graphiql: true }));
