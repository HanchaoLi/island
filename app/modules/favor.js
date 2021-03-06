const {
    sequelize
} = require('../../core/db');
const {
    Sequelize,
    Model,
    Op
} = require('sequelize');

const {Art} = require('./art');

/**
 * thumbs up/down bussiness logic
 */
class Favor extends Model {

    /**
     * thumbs up function, insert record into favor table and update related
     * table, like movie, music.
     * 
     * @param {Integer} art_id 
     * @param {Integer} type 
     * @param {Integer} uid 
     */
    static async like(art_id, type, uid) {
        const favor = await Favor.findOne({
            where: {
                art_id,
                type,
                uid
            }
        });
        if (favor) {
            throw new global.errs.LikeError();
        }
        return sequelize.transaction(async t => {
            await Favor.create({
                art_id,
                type,
                uid
            }, {transaction: t});
            const art = await Art.getData(art_id, type, false);
            await art.increment('fav_nums', {by: 1, transaction: t});
        });
    }

    /**
     * thumbs down function, delete record in favor table and update related
     * table, like movie, music.
     * 
     * @param {Integer} art_id 
     * @param {Integer} type 
     * @param {Integer} uid 
     */
    static async dislike(art_id, type, uid) {
        const favor = await Favor.findOne({
            where: {
                art_id,
                type,
                uid
            }
        });
        if (!favor) {
            throw new global.errs.DislikeError();
        }
        return sequelize.transaction(async t => {
            await favor.destroy({
                force: true,
                transaction: t
            });
            const art = await Art.getData(art_id, type, false);
            await art.decrement('fav_nums', {by: 1, transaction: t});
        });
    }

    /**
     * return if current user already liked this publication
     * @param {Integer} art_id 
     * @param {Integer} type 
     * @param {Integer} uid 
     * @returns true, user already liked, false, user haven't been liked
     */
    static async userLikeIt(art_id, type, uid) {
        const favor = await Favor.findOne({
            where: {
                uid,
                art_id,
                type
            }
        });
        return favor ? true : false;
    }

    /**
     * get user liked movie and music, except book
     * @param {Integer} uid user id
     */
    static async getMyClassicFavors(uid) {
        let arts = await Favor.findAll({
            where: {
                uid,
                type: {
                    [Op.not]: 400
                }
            }
        });
        if (!arts) {
            throw new global.errs.NOtFound();
        }
        return await Art.getList(arts);
    }

    static async getBookFavor(uid, bookID) {
        const favorNums = await Favor.count({
            where: {
                art_id: bookID,
                type: 400
            }
        });

        const myFavor = await Favor.findOne({
            where: {
                art_id: bookID,
                uid,
                type: 400
            }
        });
        return {
            fav_nums: favorNums,
            like_status: myFavor ? 1 : 0
        }
    }
}

Favor.init({
    uid: Sequelize.INTEGER,
    art_id: Sequelize.INTEGER,
    type: Sequelize.INTEGER
}, {
    sequelize,
    tableName: 'favor'
});

module.exports = {
    Favor
}