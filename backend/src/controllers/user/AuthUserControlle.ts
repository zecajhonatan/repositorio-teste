import { Request, Response } from "express";
import AuthUserServices from "../../services/user/AuthUserServices";

// controle de autenticação de usuarios
class AuthUserController {
  async Handle(req: Request, res: Response) {
    let { email, password } = req.body;

    let auth = await AuthUserServices.execute({ email, password });

    res.json(auth);
  }
}

export default new AuthUserController();
