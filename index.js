import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import indexRoutes from "../server/routes/index.js";

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

const CONNECTION_URL = "mongodb://127.0.0.1:27017";

/**
 * use 127.0.0.1 instead localhost
 */

const PORT = process.env.PORT || 8080;

mongoose.set("strictQuery", true);

mongoose
  .connect(CONNECTION_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
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
