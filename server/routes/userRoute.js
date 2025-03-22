const express = require("express");
const { submitUser } = require("../controller/userContoller");

const router = express.Router();

router.post("/submit-user",submitUser);

module.exports = router