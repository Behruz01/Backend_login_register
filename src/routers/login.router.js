const { Router } = require("express");
const { loginPost } = require("../controllers/login.controller");

const router = Router();

router.post("/auth/login", loginPost);

module.exports = router;
