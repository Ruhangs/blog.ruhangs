import { db } from "@/lib/db"

async function main() {
  const response = await db.user.upsert({
    where: { email: 'alice@prisma.io' },
    update: {},
    create: {
      email: '1241713147@qq.com',
      name: 'rhs',
      password: "19981207"
    },
  })
  console.log(response)
}
main()
  .then(async () => {
    await db.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await db.$disconnect()
    process.exit(1)
  })