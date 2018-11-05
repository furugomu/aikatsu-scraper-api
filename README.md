# aikatsu-scraper-api

## GraphQL

`/graphql`

```graphql
type Query {
  scrape(url: String!): AikatsuCard!
}
```

## REST

`/card?url=URL`

```json
{
  "id": "F3-128",
  "name": "スノープリンセストップス",
  "type": "クール", // "キュート" | "クール" | "セクシー" | "ポップ"
  "category": "トップス", // "トップス" | "ボトムス" | "シューズ" | "アクセサリー" | "トップス＆ボトムス"
  "brand": "ロリゴシック",
  "appealPoint": 700,
  "rarity": "プレミアムレア",
  "rarityLevel": 3
}
```

## LICENSE

MIT
