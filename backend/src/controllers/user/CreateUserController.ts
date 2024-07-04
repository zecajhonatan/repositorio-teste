import { Request, Response } from "express";
import CreateUserService from "../../services/user/CreateUserService";

class CreateUserController {
  async Handle(req: Request, res: Response) {
    let { name, email, password } = req.body;

    let user = await CreateUserService.execute({ name, email, password });

    res.json(user);
  }
}

export default new CreateUserController();
