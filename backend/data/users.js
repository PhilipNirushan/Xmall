import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Philip Nirushan',
    email: 'nirushan@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'John Doe',
    email: 'john@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Jane Doe',
    email: 'jane@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Jack Sparrow',
    email: 'jack@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    isShopOwner: true,
  },
  {
    name: 'Micheal John',
    email: 'micheal@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    isShopOwner: true,
  },
]

export default users
