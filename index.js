import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import indexRoutes from "../server/routes/index.js";

import dotenv from "dotenv";

dotenv.config();
const app = express();

/**
 * Every request will call by localhost:8080/posts
 */

/**
 * Limit Image Size
 */

app.use(
  bodyParser.json({
    limit: "30mb",
    extended: true,
  })
);

app.use(
  bodyParser.urlencoded({
    limit: "30mb",
    extended: true,
  })
);

app.use(cors());

app.use("/posts", indexRoutes);

const PORT = process.env.PORT;

mongoose.set("strictQuery", true);

mongoose
  .connect(process.env.CONNECTION_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

/**
   * 
   * https://mongoosejs.com/docs/search.html?q=useFindAndModify
   * 
   * mongoose.set("useFindAndModify", false);
   * 
   * {
   useNewUrlParser: true,
   useUnifiedTopology: true,
  }
  
  */
