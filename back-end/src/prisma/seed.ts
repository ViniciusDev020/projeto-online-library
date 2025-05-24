import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";
const prisma = new PrismaClient();
async function main() {
  const normalUser = await prisma.user.createMany({
    data: [
      {
        id: "105",
        email: "joao@email.com",
        name: "João",
        password: "joao123",
        perfil: "usuario",
      },
      {
        id: "108",
        email: "pedro@email.com",
        name: "Pedro",
        password: "pedro123",
        perfil: "admin",
      },
    ],
  });

  const autor = await prisma.author.upsert({
    where: { id: randomUUID() },
    update: {},
    create: {
      id: "230",
      age: 23,
      name: "Pedro Lopez",
      nacionality: "Brasileiro",
    },
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
        authorId: "230",
      },
      {
        id: randomUUID(),
        name: "Livro de matemática",
        description: "Descrição do livro de matemática.",
        authorId: "230",
      },
      {
        id: randomUUID(),
        name: "Livro de ciência",
        description: "Descrição do livro de ciência.",
        authorId: "230",
      },
      {
        id: randomUUID(),
        name: "Livro de geografia",
        description: "Descrição do livro de geografia.",
        authorId: "230",
      },
      {
        id: randomUUID(),
        name: "Livro de ciência",
        description: "Descrição do livro de ciência.",
        authorId: "230",
      },
      {
        id: randomUUID(),
        name: "Livro de fantasia",
        description: "Descrição do livro de fantasia.",
        authorId: "230",
      },
      {
        id: randomUUID(),
        name: "Livro de ciência",
        description: "Descrição do livro de ciência.",
        authorId: "230",
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
        authorId: "230",
      },
      {
        id: randomUUID(),
        name: "Livro de história",
        description: "Descrição do livro de história.",
        authorId: "230",
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
