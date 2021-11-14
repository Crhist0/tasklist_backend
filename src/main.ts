import express from "express";
import cors from "cors";
import { route } from "./routes";

const app = express();
app.use(express.json(), cors(), route);

app.listen(process.env.PORT || 8081, () => console.log("Server is running..."));
