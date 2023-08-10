const { responseError, responseOk } = require("../../utils/response.helper");
const knex = require("../../db/knex");

//get all room
async function getAllRoom(req, res, next) {
  let data = null;
  try {
    data = await knex.select().from("rooms");
  } catch (error) {
    return res.status(500).json(responseError("Failed to get users"));
  }
  if (data.length == 0) {
    return res.status(404).json(responseError("User not found!"));
  } else {
    const finalData = data;
    return res.status(200).json(responseOk("Success", finalData));
  }
}

//checkRoom room
async function checkRoom(req, res, next) {
  const { name, type, idUser1, idUser2 } = req.body;
  if (!(name && type && idUser1 && idUser2)) {
    return res.status(400).json(responseError("field cannot be empty!"));
  }
  if (type != "PRIVATE" && type != "GROUP") {
    return res.status(400).json(responseError("Type must be PRIVATE or GROUP"));
  }

  let data;
  try {
    let checkRoom = await knex
      .select()
      .from("rooms")
      .whereIn("id_room", [idUser1 + idUser2, idUser2 + idUser1]);

    console.log("check room : ", checkRoom);
    if (checkRoom.length == 0 || checkRoom == undefined) {
      data = {
        id_room: idUser1 + idUser2,
        name: name,
        type: type,
        deleted_by: [],
        read_by: [],
        created_at: new Date(),
        updated_at: new Date(),
      };
      await knex("rooms").insert(data);

      await knex("participants").insert({
        id_room: idUser1 + idUser2,
        uid_users: idUser1,
        created_at: new Date(),
        updated_at: new Date(),
      });

      await knex("participants").insert({
        id_room: idUser1 + idUser2,
        uid_users: idUser2,
        created_at: new Date(),
        updated_at: new Date(),
      });
    } else {
      data = checkRoom[0];
    }
  } catch (error) {
    console.log(error);
    return res.json(responseError("Failed to create room"));
  }
  if (data == null) {
    return res.json(responseError("Failed to create room"));
  }
  return res.json(responseOk("Success", data));
}

//update room
async function updateRoom(req, res, _next) {
  const { id } = req.params;
  const { name, deletedBy, readBy, totalUnread } = req.body;

  let data;
  try {
    const room = await knex.select().from("rooms").where("id_room", id);
    if (room.length > 0) {
      let newDeleteBy = room[0].deleted_by;
      console.log(newDeleteBy);
      newDeleteBy.push(deletedBy);

      console.log(room);
      console.log(deletedBy);
      console.log(room.deletedBy);
      console.log(newDeleteBy);

      data = await knex("rooms")
        .update({
          name: name,
          total_unread: totalUnread,
          deleted_by: newDeleteBy,
          read_by: readBy,
        })
        .where("id_room", id);
    } else {
      return res.status(404).json(responseError("Room not found!"));
    }
  } catch (error) {
    console.log("Error update room: ", error);
    return res.status(400).json(responseError("Failed to update room"));
  }
  if (data == null) {
    return res.status(400).json(responseError("Failed to update room"));
  }
  return res.status(200).json(responseOk("Success", data));
}

//get recent chat
async function getRecentChat(req, res, next) {
  const { idUser } = req.params;

  let data;
  try {
    data = await knex
      .from("participants")
      .join("rooms", "rooms.id_room", "participants.id_room")
      .select("participants.*", "rooms.*")
      .where("uid_users", idUser)
      .whereRaw("? != ALL(deleted_by)", idUser);

    console.log(data);
  } catch (error) {
    console.log("error get recent chat: ", error);
    return res.status(500).json(responseError("Failed to get recent chat"));
  }
  if (data == null) {
    return res.status(404).json(responseError("Chat not found!"));
  }
  return res.status(200).json(responseOk("Success", data));
}

//get detail chat
async function detailChat(req, res, next) {
  const { idRoom } = req.params;
  if (!idRoom) {
    return res.status(400).json(responseError("field cannot be empty!"));
  }

  let data;
  try {
    data = await knex.select().from("messages").where("id_room", idRoom);
  } catch (error) {
    return res.status(500).json(responseError("Failed to get detail chat"));
  }
  if (data == null) {
    return res.status(404).json(responseError("chat not found!"));
  }
  return res.status(200).json(responseOk("Success", data));
}

//sent chat
async function sentChat(req, res, _next) {
  const { idUser, idRoom, content, contentType } = req.body;
  if (!(idUser && idRoom && content && contentType)) {
    return res.status(400).json(responseError("field cannot be empty!"));
  }

  let isCorrectContent = false;
  switch (contentType) {
    case "TEXT":
      isCorrectContent = true;
      break;
    case "STICKER":
      isCorrectContent = true;
      break;
    case "IMAGE":
      isCorrectContent = true;
      break;
    case "VIDEO":
      isCorrectContent = true;
      break;
    case "AUDIO":
      isCorrectContent = true;
      break;
    case "DOC":
      isCorrectContent = true;
      break;
    default:
      break;
  }

  if (!isCorrectContent) {
    return res.status(400).json(responseError("Content type incorrect!"));
  }

  let data;
  let value;
  try {
    value = {
      id_room: idRoom,
      uid_users: idUser,
      content: content,
      type: contentType,
      created_at: new Date(),
      updated_at: new Date(),
    };
    data = await knex("messages").insert(value);
  } catch (error) {
    console.log(error);
    return res.status(400).json(responseError("Failed to create message"));
  }
  if (data == null) {
    return res.status(404).json(responseError("message not found!"));
  }
  return res.status(200).json(responseOk("Success", value));
}

//delete chat
async function deleteChat(req, res, next) {
  const { idRoom } = req.params;
  const { idUser } = req.body;

  let data;
  try {
    const room = await knex.select().from("rooms").where("id_room", idRoom);

    if (room == null || room == undefined || room.length == 0) {
      return res.status(400).json(responseError("Room not found!"));
    }
    let newDeleteBy = room[0].deleted_by;
    newDeleteBy.push(idUser);

    data = await knex("rooms")
      .update({
        deleted_by: newDeleteBy,
      })
      .where("id_room", idRoom);
  } catch (error) {
    console.log("Error update to delete room: ", error);
    return res.status(500).json(responseError("Failed to delete chat"));
  }
  if (data == null) {
    return res.status(500).json(responseError("Failed to delete chat"));
  }
  return res.status(200).json(responseOk("Success", data));
}

module.exports = {
  getAllRoom,
  checkRoom,
  deleteChat,
  detailChat,
  getRecentChat,
  sentChat,
  updateRoom,
};
