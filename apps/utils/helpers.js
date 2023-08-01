import * as bcrypt from "bcryptjs";

//hash password
export function hashPassword(password) {
  if (password != undefined && password != "") {
    password = bcrypt.hashSync(password, 8);
    return password;
  }
}
//checkk if unencrypted password is valid
export function checkIfUnencryptedPasswordIsValid(
  password,
  unencryptedPassword
) {
  return bcrypt.compareSync(unencryptedPassword, password);
}

//exclude password
export function excludePassword() {
  return {
    uid: true,
    name: true,
    username: true,
    email: true,
    address: true,
    phone: true,
    createdAt: true,
    updatedAt: true,
  };
}

module.exports = {
  hashPassword,
  checkIfUnencryptedPasswordIsValid,
  excludePassword,
};
