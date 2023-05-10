const Io = require("../utils/Io");
const User = new Io("./db/users.json");
const modelUser = require("../models/user");
const bcrypt = require("bcrypt");

exports.regisPost = async (req, res) => {
  try {
    body = req.body;
    const { username, password } = body;
    const users = await User.read();

    const hashPassword = await bcrypt.hash(password, 7);

    const findUser = users.find((user) => user.username == username);
    const id = (users[users.length - 1]?.id || 0) + 1;
    const newUser = new modelUser(id, username, hashPassword);
    if (findUser) {
      res.status(403).json({ massage: "User already exists" });
      return;
    }
    // write data
    const data = users.length ? [...users, newUser] : [newUser];
    User.write(data);
    res.status(200).json({ success: "Registreted" });
  } catch (error) {
    console.log(error);
    res.status(403).json({ massage: "Not found" });
  }
};
