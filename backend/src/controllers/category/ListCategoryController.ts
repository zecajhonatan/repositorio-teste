import { Request, Response } from "express";
import ListCategoryService from "../../services/category/ListCategoryService";

class ListCategoryController {
  async Handle(req: Request, res: Response) {
    let listCategories = await ListCategoryService.execute();
    return res.json(listCategories);
  }
}

export default new ListCategoryController();
