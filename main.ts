import express from "express";
import mongoose from "mongoose";

import { addEvent } from "./resolvers/addEvent.ts";
import { getEvents } from "./resolvers/getEvents.ts";
import { getEvent } from "./resolvers/getEvent.ts";
import { deleteEvent } from "./resolvers/deleteEvent.ts";
import { updateEvent } from "./resolvers/updateEvent.ts";

const MONGO_URL = Deno.env.get("MONGO_URL");

if (!MONGO_URL) {
  console.log("No mongo URL found");
  Deno.exit(1);
}

await mongoose.connect(MONGO_URL);

const app = express(); 
app.use(express.json());

//Endpoints

app.post("/addEvent", addEvent);

app.get("/events", getEvents);
app.get("/event/:id", getEvent);

app.delete("/event/:id", deleteEvent);

app.put("/event/:id", updateEvent);

app.listen(3000, () => { console.log("Funcionando en puerto 3000") });