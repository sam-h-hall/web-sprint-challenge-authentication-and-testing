const db = require("../database/dbConfig");

const findBy = (username) => db("users").where(username);

const findById = (id) => {
  return db("users").where({
    id
  }).first();
};

const add = async (user) => {
  try {

    const [id] = await db("users").insert(user, "id");
    return findById(id);

  } catch (err) {

    throw err;

  }
}



module.exports = {
  add,
  findBy,
  findById,
}