import { PrismaClient } from '@prisma/client'
import { keyboards_cases } from '../src/data/products'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting seed...')

  // Delete existing data
  await prisma.cartItem.deleteMany()
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.keyboardCaseBuild.deleteMany()
  await prisma.keyboardCaseDesign.deleteMany()

  // Transform and insert keyboard cases
  for (const kbCase of keyboards_cases) {
    const caseDesign = await prisma.keyboardCaseDesign.create({
      data: {
        id: kbCase.id,
        name: kbCase.name,
        description: kbCase.description,
        price: kbCase.price,
        layout: kbCase.layout,
        tags: kbCase.tags,
        features: kbCase.features,
        images: kbCase.images,
        woodOptions: kbCase.woodOptions,
      },
    })

    console.log(`Created keyboard case design: ${caseDesign.name}`)
  }

  console.log('Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('Error during seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 