import express from "express";
import mongoose from "mongoose";

import { holamundo } from "./resolvers/holamundo.ts";

const MONGO_URL = Deno.env.get("MONGO_URL");

if (!MONGO_URL) {
  console.log("No mongo URL found");
  Deno.exit(1);
}

await mongoose.connect(MONGO_URL);

const app = express(); 
app.use(express.json());

//Endpoints
app.get("/api", holamundo);

app.listen(3000, () => { console.log("Funcionando en puerto 3000") });