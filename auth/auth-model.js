const db = require("../database/dbConfig");

const findBy = (username) => db("users").where(username);

const findById = (id) => {
  return db("users")
    .where({
      id,
    })
    .first();
};

const add = async (user) => {
  try {
    const [id] = await db("users").insert(user, "id");
    return findById(id);
  } catch (err) {
    throw err;
  }
};

const testFindBy = (username) => db("test").where(username);

const testFindById = (id) => {
  return db("test")
    .where({
      id,
    })
    .first();
};

const testAdd = async (user) => {
  try {
    const [id] = await db("test").insert(user, "id");
    return findById(id);
  } catch (err) {
    throw err;
  }
};

module.exports = {
  add,
  findBy,
  findById,
  testFindBy,
  testFindById,
  testAdd,
};
