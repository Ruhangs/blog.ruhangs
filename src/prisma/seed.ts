import { db } from "../lib/db"

async function main() {
  const response = await db.user.upsert({
    where: { email: 'alice@prisma.io' },
    update: {},
    create: {
      email: '1241713147@qq.com',
      name: 'rhs',
      password: "19981207",
      profile: {
        create: {
          qq: "1241713247",
          introduction: "一名热爱前端的人儿",
          weixin: "Jan23-R",
          github: "https://github.com/Ruhangs",
          hometown: "重庆万州",
          university: "重庆邮电大学"
        }
      }
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