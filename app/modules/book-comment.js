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
    static async addComment(bookID, content) {
        const comment = await Comment.findOne({
            where: {
                book_id: bookID,
                content
            }
        });
        if (!comment) {
            return await Comment.create({
                book_id: bookID,
                content,
                nums: 1
            });
        } else {
            return await comment.increment('nums', {
                by: 1
            });
        }
    }
    static async getComments(bookID) {
        const comments = await Comment.findAll({
            where: {
                book_id: bookID
            }
        });
        return comments;
    }
}

Comment.init({
    content: Sequelize.STRING(12),
    nums: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    book_id: Sequelize.INTEGER
}, {
    sequelize,
    tableName: 'comment'
});

module.exports = {
    Comment
}