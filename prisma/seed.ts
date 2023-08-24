const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {

  const newUser = {
    username: 'seeded_user',
    email: 'seeded@example.com',
    firstName: 'Seeded',
    lastName: 'User',
    preferredName: 'Seedling',
    phone: {
      create: {
        countryCode: '+1',
        areaCode: '909',
        phoneNumber: '5381940',
        extension: null,
      }
    },
  };

  await prisma.user.create({
    data: newUser,
  });

  console.log('User seeded successfully.');
}

main()
  .catch((error) => {
    console.error('Error seeding:', error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
