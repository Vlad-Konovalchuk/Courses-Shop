const bcrypt = require("bcrypt");
exports.hashPassword = async function(password) {
  console.log("hashPassword");
  const hash = await bcrypt.hash(password, 10);
  return hash;
};
exports.comparePassword = async function(password, userPassword) {
  console.log("comparePassword");
  const compare = await bcrypt.compare(password, userPassword);
  return compare;
};
