const faker = require('faker');


console.log(
  'faker test',
  {
    id: faker.random.uuid(),  
    name: faker.name.firstName()
  }
) 