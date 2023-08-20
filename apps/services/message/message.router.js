const express = require("express");
const router = express.Router();
const { API_PATH } = require("../../config/config");
const { checkJwt } = require("../../middlewares/checkJwt");
const {
  getAllRoom,
  checkRoom,
  updateRoom,
  getRecentChat,
  detailChat,
  sentChat,
  deleteChat,
  deleteChatAll,
} = require("./message.controller");

// USER PATH
const MESSAGE_PATH_V1 = `${API_PATH}/v1/message`;

router.get(`${MESSAGE_PATH_V1}/ping`, (req, res) => {
  res.status(200).json({ ping: "OK" });
});

//get all room
router.get(`${MESSAGE_PATH_V1}/room`, [checkJwt], getAllRoom);
//create room
router.post(`${MESSAGE_PATH_V1}/check-room`, [checkJwt], checkRoom);
//update room
router.put(`${MESSAGE_PATH_V1}/room/update/:id`, [checkJwt], updateRoom);
//get recent chat
router.get(`${MESSAGE_PATH_V1}/recent/:idUser`, [checkJwt], getRecentChat);
//get recent chat
router.get(`${MESSAGE_PATH_V1}/detail/:idRoom`, [checkJwt], detailChat);
//create participant
router.post(`${MESSAGE_PATH_V1}/sent`, [checkJwt], sentChat);
//delete chat
router.put(`${MESSAGE_PATH_V1}/room/delete/:idRoom`, [checkJwt], deleteChat);
router.delete(
  `${MESSAGE_PATH_V1}/room/delete/:idRoom`,
  [checkJwt],
  deleteChatAll
);

module.exports = router;
