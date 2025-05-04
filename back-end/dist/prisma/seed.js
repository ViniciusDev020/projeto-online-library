import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";
const prisma = new PrismaClient();
async function main() {
    const livroHistoria = await prisma.livro.upsert({
        where: { id: randomUUID() },
        update: {},
        create: {
            id: randomUUID(),
            name: "Livro de história",
            description: "Descrição do livro de história.",
            author: {},
        },
    });
    console.log({ livroHistoria });
    const autor = await prisma.author.upsert({
        where: { id: randomUUID() },
        update: {},
        create: {
            id: randomUUID(),
            name: "Pedro Lopez",
        },
    });
    console.log({ autor });
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
