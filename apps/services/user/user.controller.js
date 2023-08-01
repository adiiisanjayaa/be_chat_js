// import { PrismaClient } from "@prisma/client";
// import Helper from "../utilities/helpers";
import { successResponse, errorResponse } from "../utilities/helpers";

//get user by username
async function getByUsername(req, res, next) {
  const { username } = req.params;

  //initialize prisma client
  const prisma = new PrismaClient();
  let user;
  try {
    user = await prisma.tb_users.findUnique({
      where: { username: String(username) },
      select: Users.excludePassword(),
    });
  } catch (error) {
    return res.json(errorResponse(500, "Failed to get users"));
  }
  if (user == null) {
    return res.json(errorResponse(404, "User not found!"));
  }
  return res.json(successResponse(200, "Success", user));
}

//update by username
async function updateByUsername(req, res, next) {
  const { username } = req.params;
  const { name, email, phone, address } = req.body;
  if (!name) {
    return res.status(400).json(errorResponse(400, "Name cannot be empty!"));
  }

  //initialize prisma client
  const prisma = new PrismaClient();
  let user;
  try {
    let findUser = await prisma.tb_users.findUnique({
      where: { username: username },
    });
    if (findUser == null) {
      return res.json(errorResponse(404, "User not found!"));
    }
    user = await prisma.tb_users.update({
      data: {
        name: name,
        email: email,
        phone: phone,
        address: address,
        updatedAt: new Date(),
      },
      where: { username: username },
      select: Users.excludePassword(),
    });
  } catch (error) {
    return res.json(errorResponse(500, "Failed to update user"));
  }
  res.clearCookie("accessToken");
  return res.json(successResponse(200, "Success", user));
}

//delete by username
async function deteleByUsername(req, res, next) {
  const { username } = req.params;
  //initialize prisma client
  const prisma = new PrismaClient();
  let user;
  try {
    let findUser = await prisma.tb_users.findUnique({
      where: { username: username },
    });
    if (findUser == null) {
      return res.json(errorResponse(404, "User not found!"));
    }
    user = await prisma.tb_users.delete({
      where: { username: username },
      select: Users.excludePassword(),
    });
  } catch (error) {
    return res.json(errorResponse(500, "Failed to delete user"));
  }
  res.clearCookie("accessToken");
  return res.json(successResponse(200, "Success", user));
}

module.exports = {
  getByUsername,
  updateByUsername,
  deteleByUsername,
};
