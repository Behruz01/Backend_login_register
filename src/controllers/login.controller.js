const Io = require("../utils/Io");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const Users = new Io("./db/users.json");
exports.loginPost = async (req, res) => {
  try {
    const body = req.body;
    const { username, password } = body;

    const users = await Users.read();
    const findUser = users.find((user) => user.username == username);

    const deHash = await bcrypt.compare(password, findUser.password);

    if (!findUser) {
      res.status(403).json({ massage: "User not found" });
      return;
    }
    if (!deHash) {
      return res.status(403).json({ massage: "Incorrect password" });
    }
    // create token
    const secretKey = process.env.SECRET_CEY;
    const token = jwt.sign({ id: findUser.id }, secretKey, {
      expiresIn: "1h",
    });

    res.status(200).json({ token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ massage: "Server error" });
  }
};
