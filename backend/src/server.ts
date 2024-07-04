import express, { Response, Request, NextFunction } from "express";
import "express-async-errors";
import cors from "cors";
import path from "path";

import { router } from "./routes";

const app = express();

app.use(express.json());
app.use(cors());

app.use(router);

// middleware responsavel pelo carregamento da imagens na url
app.use("/files", express.static(path.resolve(__dirname, "..", "tmp")));

// middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    // se for uma instancia de tipo de erro
    return res.status(400).json({
      error: err.message,
    });
  }
  return res.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
});

app.listen(3333, () => console.log("Servidor Online"!));
