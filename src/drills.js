require("dotenv").config();
const knex = require("knex");

const knexInstance = knex({
  client: "pg",
  connection: process.env.DB_URL,
});

function searchByItemName(searchTerm) {
    knexInstance
      .select("*")
      .from("shopping_list")
      .where("name", "ILIKE", `%${searchTerm}%`)
      .then((result) => {
        console.log('SEARCH TERM', { searchTerm })
        console.log(result);
      });
  }

  function paginateItems(page) {
    const limit = 6;
    const offset = limit * (page - 1);
    knexInstance
      .select("*")
      .from("shopping_list")
      .limit(limit)
      .offset(offset)
      .then((result) => {
        console.log('PAGINATE ITEMS', { page })
        console.log(result);
      });
  }

  function itemsAddedAfter(days) {
    knexInstance
      .select('id', 'name', 'price', 'date_added', 'checked', 'category')
      .from("shopping_list")
      .where(
        'date_added',
        '>',
        knexInstance.raw(`now() - '?? days'::INTERVAL`, days)
      )
      .then(result => {
        console.log(result)
      })
  }

 function categoryCost() {
     knexInstance
     .select('category')
     .sum('price as total')
     .from("shopping_list")
     .groupBy('category')
     .then((result) => {
        console.log(result);
      });
 }

 categoryCost()