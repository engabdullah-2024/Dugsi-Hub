const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
    try {
        const categories = [
            { name: "Web Development", slug: "web-development" },
            { name: "Mobile Development", slug: "mobile-development" },
            { name: "Data Science", slug: "data-science" },
            { name: "Graphic Design", slug: "graphic-design" },
            { name: "Business", slug: "business" },
            { name: "Marketing", slug: "marketing" },
        ];

        for (const category of categories) {
            await database.category.upsert({
                where: { name: category.name },
                update: {},
                create: category,
            });
        }

        console.log("Success: Categories seeded");
    } catch (error) {
        console.log("Error seeding categories:", error);
    } finally {
        await database.$disconnect();
    }
}

main();
