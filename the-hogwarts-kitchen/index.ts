import express from "express";
import axios from "axios";

import path from "path";
import cors from "cors";
import routes from "./routes";

import { recipeSample, promptUserContext } from "./utils/templates";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use(routes);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
  res.end("home");
});

app.post("/api/axios/recipes", async (req, res) => {
  const body = req.body;
  const ingredients = body.ingredients;
  try {
    const newRecipe = await axios.post(
      "https://api.portkey.ai/v1/chatComplete",
      {
        config: {
          provider: "openai",
          api_key: process.env.OPENAI_API_KEY,
        },
        params: {
          messages: [
            {
              role: "user",
              content: promptUserContext(ingredients, recipeSample),
            },
          ],
          model: "gpt-3.5-turbo",
        },
      },
      {
        headers: {
          "x-portkey-api-key": process.env.PORTKEYAI_API_KEY,
          "x-portkey-retry-count": "2",
          "x-portkey-cache": "semantic",
          "Content-Type": "application/json",
        },
      }
    );
    res.status(200).json(newRecipe.data.choices[0].message);
  } catch (error: any) {
    console.error("error", error);
    res.status(400).end("Unexpected error occured");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
