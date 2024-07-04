import { Request, Response } from "express";
import DetailUserServices from "../../services/user/DetailUserServices";

class DetailUserController {
  async Handle(req: Request, res: Response) {
    let user_id = req.user_id;

    let user = await DetailUserServices.execute(user_id);
    return res.json(user);
  }
}

export default new DetailUserController();
