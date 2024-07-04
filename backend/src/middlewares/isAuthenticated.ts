import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

// tipagem dos dados
interface PayLoad {
  sub: string;
}

// MIDDLEWARE
export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // receber o token
  const authToken = req.headers.authorization;
  // autenticação tokem
  if (!authToken) {
    return res.status(401).end();
  }
  
  // faz a separação do prefixo do token
  const [, token] = authToken.split(" ");

  try {
    // validar o token
    const { sub } = verify(token, process.env.JWT_SECRET) as PayLoad;

    // Recuperar o id do token e colocar dentro da variavel user_id e colocar dentro do Request
    req.user_id = sub;

    return next();
  } catch (error) {
    res.status(404).end();
  }
}
