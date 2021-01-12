const ShoppingListService = {
    getItems(knex) {
        return knex.select("*")
        .from('shopping_list');
    },

    getId(knex, id) {
        return knex
        .from('shopping_list')
        .select("*")
        .where('id', id)
        .first();
    },
    insertItem(knex, insertedItem) {
        return knex
        .insert(insertedItem)
        .into('shopping_list')
        .returning('*')
        .then(rows => rows[0])
    },
    deleteItem(knex, id) {
        return knex('shopping_list')
        .where({ id })
        .delete();
    },
    updateItem(knex, id, newField) {
        return knex('shopping_list')
        .where({ id })
        .update(newField)
    },
};

module.exports = ShoppingListService