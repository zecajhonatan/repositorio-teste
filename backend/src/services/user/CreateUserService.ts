import prismaClient from "../../prisma";
import { hash } from "bcryptjs";

// tipagem dos dados
interface UserRequest {
  name: string;
  email: string;
  password: string;
}

// serviço de criação de usuario --> salva os dados na base de dados
class CreateUserService {
  async execute({ name, email, password }: UserRequest) {
    // verificar se existe o e-mail
    if (!email) {
      throw new Error("E-mail not exists");
    }
    // verificar se o email ja esta cadastrado na base de dados
    let userAlreadyExists = await prismaClient.user.findFirst({ // usuario já e existente 
      where: { email: email },
    });

    if (userAlreadyExists) {
      throw new Error("User Already Exists");
    }

    // faz a criptografia da senha
    let passWordHash = await hash(password, 8);

    let user = await prismaClient.user.create({
      //adiciona os dados na tabela na base de dados
      data: {
        name: name,
        email: email,
        password: passWordHash,
      },
      // seleciona os dados que eu quero que retorne
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return user;
  }
}

export default new CreateUserService();
