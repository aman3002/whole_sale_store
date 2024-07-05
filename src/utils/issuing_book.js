const mongo = require("mongoose");
const schema = require("./schema");

const mongo=require("./connect")
mongo()
async function issue(item, shop_name, cost, user, librarian) {
  console.log(cost,"bgfnf")
  const data = { book_name: item, ISBN_No: Date.now(), cost: cost, shop_name: shop_name };
  const users = mongo.model(`${user}_boroweds`, schema.schema4);
  const ok = new users(data);

  try {
    await ok.save();

    const lib = mongo.model(`${librarian}`, schema.schema);
    const search = await lib.find({ book_name: item });
    console.log(search[0].count);

    if (search[0].count > 0) {
      await lib.updateOne({ book_name: item }, { $set: { count: search[0].count - 1 } });
      console.log("book issued");
    } else {
      console.log("item is not available");
    }
  } catch (error) {
    console.error("Error issuing book:", error);
  } finally {
  }
}

module.exports = issue;
