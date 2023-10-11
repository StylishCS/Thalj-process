const connection = require("../DB/dbConnection");
const util = require("util");

exports.add = async (data1, data2) => {
  try {
    const query = util.promisify(connection.query).bind(connection);
    await query("INSERT INTO orders SET ?", [data1, data2]);
  } catch (error) {
    throw error;
  }
};

exports.get = async()=>{
  const query = util.promisify(connection.query).bind(connection);
  return await query(`
  SELECT id, region, regionRecipient, name FROM orders
  WHERE status = 'Pending'
`)
}

exports.getOne = async(id)=>{
  const query = util.promisify(connection.query).bind(connection);
  return await query("SELECT * FROM orders WHERE id = ?", [id])
}
