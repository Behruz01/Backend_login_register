const { Router } = require("express");
const { regisPost } = require("../controllers/regis.controller");

const router = Router();

router.post("/auth/register", regisPost);

module.exports = router;
