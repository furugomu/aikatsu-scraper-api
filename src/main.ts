import express from "express";
import graphql from "./graphql";

const app = express();

app.use("/graphql", graphql);

const port = Number(process.env.PORT || 3000);
app.listen(port, () => console.log("hello! " + port));
