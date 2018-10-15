import express from "express";
import graphqlHTTP from "express-graphql";
import { buildSchema } from "graphql";
import scrapeUrl from "./scrape-url";

const app = express();
export default app;

const schema = buildSchema(`
type AikatsuCard {
  id: String
  name: String
  type: String
  category: String
  brand: String
  appealPoint: Int
  rarity: String
  rarityLevel: Int
}

type Query{
  scrape(url: String): AikatsuCard
}
`);

const rootValue = {
  scrape: ({ url }: { url: string }) => scrapeUrl(url)
};
app.use("/", graphqlHTTP({ schema, rootValue, graphiql: true }));
