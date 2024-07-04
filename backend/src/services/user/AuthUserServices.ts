import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

// tipagem dos dados
interface AuthRequest {
  email: string;
  password: string;
}

class AuthUserService {
  async execute({ email, password }: AuthRequest) {
    // busca o email na base de dados
    let user = await prismaClient.user.findFirst({
      where: { email: email },
    });
    // verificar se o email existe
    if (!user) {
      throw new Error("Email não confere!");
    }
    // faz a conversão da criptografia para fazer a comparação com a senha passada no login
    let passwordWatch = await compare(password, user.password);
    // verificar se a senha esta correta retornando a criptografia
    if (!passwordWatch) {
      throw new Error("Senha não confere!");
    }

    // se passou por todas as verificações vamos gerar o token JWT
    const token = sign(
      // header
      {
        name: user.name,
        email: user.email,
      },
      // payload
      process.env.JWT_SECRET,
      // assinature
      {
        subject: user.id,
        expiresIn: "30d",
      }
    );

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token: token,
    };
  }
}

export default new AuthUserService();
