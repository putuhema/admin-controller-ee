import express, { Request, Response } from "express";
import next from "next";
import { urlencoded, json } from "body-parser";

import apiHandler from "../api/";

const PORT = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";

const app = next({ dev });

const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(urlencoded({ extended: false }));
  server.use(json());
  server.use("/api", apiHandler);
  server.all("*", (req: Request, res: Response) => handle(req, res));

  server.listen(PORT, () => {
    console.log(`Ready on http://localhost:${PORT}`);
  });
});
