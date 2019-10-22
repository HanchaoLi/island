const {
    sequelize
} = require('../../core/db');
const {
    Sequelize,
    Model
} = require('sequelize');
const {Favor} = require('./favor');

class HotBook extends Model {
    static async getAll() {
        const books = await HotBook.findAll({
            order:[
                'index'
            ]
        });
        const ids = [];
        books.forEach((book) => {
            ids.push(book.id);
        });
        Favor.findAll({
            where: {
                [Op.in]: ids
            }
        });
        
    }

}

HotBook.init({
    // index used for sort
    index: Sequelize.INTEGER,
    image: Sequelize.STRING,
    author: Sequelize.STRING,
    title: Sequelize.STRING
});