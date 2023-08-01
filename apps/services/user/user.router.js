const express = require("express");
const router = express.Router();
const { API_PATH } = require("../../config/config");

// USER PATH
const AUTH_PATH_V1 = `${API_PATH}/v1/user`;

router.get(`${AUTH_PATH_V1}/ping`, (req, res) => {
  res.status(200).json({ ping: "OK" });
});

router.post(`${AUTH_PATH_V1}/users`, (req, res) => {});
router.post(`${AUTH_PATH_V1}/create-user`, (req, res) => {});

module.exports = router;
