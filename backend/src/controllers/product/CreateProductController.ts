import { Request, Response } from "express";
import CreateProductService from "../../services/product/CreateProductService";

class CreateProductController {
  async Handle(req: Request, res: Response) {
    let { name, price, description, category_id } = req.body;

    if (!req.file) { 
      throw new Error("error upload file");
    } else {
      let { originalname, filename: banner } = req.file;

      let product = await CreateProductService.execute({
        name,
        price,
        description,
        banner,
        category_id,
      });

      return res.json(product);
    }
  }
}

export default new CreateProductController();
