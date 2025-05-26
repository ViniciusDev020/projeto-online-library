import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
async function main() {
  const saltRounds = 10;

  const hashFirstUser = await bcrypt.hash("joao123", saltRounds);
  const hashSecondUser = await bcrypt.hash("pedro123", saltRounds);

  const normalUser = await prisma.user.createMany({
    data: [
      {
        id: "105",
        email: "joao@email.com",
        name: "João",
        password: hashFirstUser,
        perfil: "usuario",
      },
      {
        id: "108",
        email: "pedro@email.com",
        name: "Pedro",
        password: hashSecondUser,
        perfil: "admin",
      },
    ],
  });

  const autor = await prisma.author.createMany({
    data: [
      {
        id: "230",
        age: 23,
        name: "Pedro Lopez",
        nacionality: "Brasileiro",
      },
      {
        id: "231",
        age: 23,
        name: "Pedro Cabral",
        nacionality: "Brasileiro",
      },
      {
        id: "232",
        age: 23,
        name: "Marcelo",
        nacionality: "Brasileiro",
      },
      {
        id: "233",
        age: 23,
        name: "Edivaldo Pereira",
        nacionality: "Brasileiro",
      },
      {
        id: "234",
        age: 23,
        name: "Augosto Lopez",
        nacionality: "Brasileiro",
      },
      {
        id: "235",
        age: 23,
        name: "Arnaldo Lopez",
        nacionality: "Brasileiro",
      },
      {
        id: "236",
        age: 23,
        name: "Pedro Gustavo",
        nacionality: "Brasileiro",
      },
      {
        id: "237",
        age: 23,
        name: "Marcela Lopez",
        nacionality: "Brasileiro",
      },
      {
        id: "238",
        age: 23,
        name: "Shirley Alcantara",
        nacionality: "Brasileiro",
      },
      {
        id: "239",
        age: 23,
        name: "Edinaldo Pereira",
        nacionality: "Brasileiro",
      },
      {
        id: "240",
        age: 23,
        name: "Paulo Gonçalves",
        nacionality: "Brasileiro",
      },
    ],
  });

  const livros = await prisma.livro.createMany({
    data: [
      {
        id: randomUUID(),
        name: "Livro de história",
        description: "Descrição do livro de história.",
        authorId: "230",
      },
      {
        id: randomUUID(),
        name: "Livro de fantasia",
        description: "Descrição do livro de fantasia.",
        authorId: "231",
      },
      {
        id: randomUUID(),
        name: "Livro de matemática",
        description: "Descrição do livro de matemática.",
        authorId: "232",
      },
      {
        id: randomUUID(),
        name: "Livro de ciência",
        description: "Descrição do livro de ciência.",
        authorId: "233",
      },
      {
        id: randomUUID(),
        name: "Livro de geografia",
        description: "Descrição do livro de geografia.",
        authorId: "234",
      },
      {
        id: randomUUID(),
        name: "Livro de ciência",
        description: "Descrição do livro de ciência.",
        authorId: "235",
      },
      {
        id: randomUUID(),
        name: "Livro de fantasia",
        description: "Descrição do livro de fantasia.",
        authorId: "236",
      },
      {
        id: randomUUID(),
        name: "Livro de ciência",
        description: "Descrição do livro de ciência.",
        authorId: "237",
      },
      {
        id: randomUUID(),
        name: "Livro de história",
        description: "Descrição do livro de história.",
        authorId: "230",
      },
      {
        id: randomUUID(),
        name: "Livro de ciência",
        description: "Descrição do livro de ciência.",
        authorId: "231",
      },
      {
        id: randomUUID(),
        name: "Livro de história",
        description: "Descrição do livro de história.",
        authorId: "233",
      },
    ],
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
