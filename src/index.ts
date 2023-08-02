import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";

dotenv.config();

if (!process.env.PORT) {
  process.exit();
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
