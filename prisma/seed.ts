import { PrismaClient } from '@prisma/client'
import { keyboards_cases } from '../src/data/products'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting seed...')

  // Delete existing data
  await prisma.review.deleteMany()
  await prisma.cartItem.deleteMany()
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.keyboardCaseBuild.deleteMany()
  await prisma.keyboardCaseDesign.deleteMany()
  await prisma.user.deleteMany()

  // Create test users
  const users = []
  for (let i = 0; i < 20; i++) {
    const user = await prisma.user.create({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        emailVerified: faker.date.past({ years: 1 }),
        image: faker.image.avatar(),
      }
    })
    users.push(user)
    console.log(`Created test user: ${user.name}`)
  }

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
        reviewStats: {
          averageRating: 0,
          totalReviews: 0
        }
      },
    })

    console.log(`Created keyboard case design: ${caseDesign.name}`)
  }

  // Get all existing keyboard case designs
  const designs = await prisma.keyboardCaseDesign.findMany()

  // For each design, create between 5-15 reviews
  for (const design of designs) {
    const numberOfReviews = faker.number.int({ min: 5, max: 15 })
    
    const reviews = []
    let totalRating = 0

    // Create reviews for this design
    for (let i = 0; i < numberOfReviews; i++) {
      const rating = faker.number.int({ min: 3, max: 5 }) // Bias towards positive reviews
      totalRating += rating

      const review = {
        userId: users[i % users.length].id,
        productId: design.id,
        rating,
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraphs(2),
        helpful: faker.number.int({ min: 0, max: 50 }),
        reported: faker.datatype.boolean({ probability: 0.05 }), // 5% chance of being reported
        createdAt: faker.date.past({ years: 1 }),
        updatedAt: faker.date.past({ years: 1 })
      }

      reviews.push(review)
    }

    // Calculate review statistics
    const averageRating = totalRating / numberOfReviews
    const reviewStats = {
      averageRating,
      totalReviews: numberOfReviews,
    }

    // Create all reviews and update the design's review stats in parallel
    await Promise.all([
      prisma.review.createMany({
        data: reviews,
      }),
      prisma.keyboardCaseDesign.update({
        where: { id: design.id },
        data: {
          reviewStats,
        },
      }),
    ])

    console.log(`Created ${numberOfReviews} reviews for design: ${design.name}`)
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