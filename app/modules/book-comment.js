const {
    sequelize
} = require('../../core/db');
const axios = require('axios');
const util = require('util');
const {
    Sequelize,
    Model,
    Op
} = require('sequelize');

class Comment extends Model {

}

Comment.init({
    content: Sequelize.STRING(12),
    nums: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }
}, {
    sequelize,
    tableName: 'comment'
});