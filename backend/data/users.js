import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Philip Nirushan',
    email: 'Nirushan@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'John Doe',
    email: 'John@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Jane Doe',
    email: 'Jane@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Jack Sparrow',
    email: 'Jack@example.com',
    password: bcrypt.hashSync('123456', 10),
    isShopOwner: true,
  },
  {
    name: 'Micheal John',
    email: 'Micheal@example.com',
    password: bcrypt.hashSync('123456', 10),
    isShopOwner: true,
  },
]

export default users
