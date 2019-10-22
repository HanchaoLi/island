const {
    sequelize
} = require('../../core/db');
const {
    Sequelize,
    Model
} = require('sequelize');

class HotBook extends Model {

}

HotBook.init({
    // index used for sort
    index: Sequelize.INTEGER,
    image: Sequelize.STRING,
    author: Sequelize.STRING,
    title: Sequelize.STRING
});