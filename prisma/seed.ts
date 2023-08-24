const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {

  const newUser = {
    username: 'taylor',
    email: 'taylor@nkeylabs.com',
    firstName: 'Evan',
    lastName: 'Yates',
    preferredName: 'Taylor',
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
