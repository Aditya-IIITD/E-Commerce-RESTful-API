export class UserModel {
  constructor(name, email, password, type, id) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.type = type;
    this.id = id;
  }

  static signup(name, email, pass, type) {
    const newuser = new UserModel(name, email, pass, type);
    newuser.id = users.length + 1;
    users.push(newuser);
    return newuser;
  }

  static signin(email, pass) {
    const user = users.find((u) => u.email == email && u.password == pass);
    return user;
  }

  static getAll() {
    return users;
  }
}

let users = [
  {
    id: 1,
    name: "Seller user",
    email: "seller@ecom.com",
    password: "password1",
    type: "seller",
  },
  {
    id: 2,
    name: "customer user",
    email: "customer@ecom.com",
    password: "password2",
    type: "customer",
  },
];
