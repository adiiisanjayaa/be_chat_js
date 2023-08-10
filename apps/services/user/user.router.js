const express = require("express");
const router = express.Router();
const { API_PATH } = require("../../config/config");
const { checkJwt } = require("../../middlewares/checkJwt");
const {
  getByUsername,
  updateByUsername,
  deteleByUsername,
} = require("./user.controller");

// USER PATH
const USER_PATH_V1 = `${API_PATH}/v1/user`;

router.get(`${USER_PATH_V1}/ping`, (req, res) => {
  res.status(200).json({ ping: "OK" });
});

router.get(`${USER_PATH_V1}/:username`, checkJwt, getByUsername);
router.put(`${USER_PATH_V1}/update/:username`, updateByUsername);
router.delete(`${USER_PATH_V1}/delete/:username`, deteleByUsername);

module.exports = router;
