const {
    Op
} = require('sequelize');
const {
    flatten
} = require('lodash');

const {
    Movie,
    Sentence,
    Music
} = require('./classic');

class Art {

    constructor(art_id, type) {
        this.art_id = art_id;
        this.type = type;
    }

    async getDetail(uid) {
        const art = await Art.getData(this.art_id, this.type);
        if (!art) {
            throw new global.errs.NotFound();
        }
        const {
            Favor
        } = require('./favor');
        const like = await Favor.userLikeIt(this.art_id, this.type, uid);
        return {
            art,
            like_status: like
        }
    }

    /**
     * get list of art id, including movie, setence, music
     * @param {Array} artInfoList 
     */
    static async getList(artInfoList) {
        const artInfoObj = {
            100: [],
            200: [],
            300: []
        }
        for (let artInfo of artInfoList) {
            artInfoObj[artInfo.type].push(artInfo.art_id);
        }
        const arts = [];
        for (let key in artInfoObj) {
            const ids = artInfoObj[key];

            // if arr is empty, then skip operation
            if (ids.length === 0) {
                continue;
            }
            arts.push(await Art._getListByType(artInfoObj[key], parseInt(key)));
        }

        // convert 2d array to 1d array, then return array.
        return flatten(arts);
    }

    static async _getListByType(ids, type) {
        let arts = null;
        const finder = {
            where: {
                id: {
                    [Op.in]: ids
                }
            }
        }
        const scope = 'bh';
        switch (type) {
            case 100:
                arts = await Movie.scope(scope).findAll({
                    finder
                });
                break;
            case 200:
                arts = await Music.scope(scope).findAll({
                    finder
                });
                break;
            case 300:
                arts = await Sentence.scope(scope).findAll({
                    finder
                });
                break;
            case 400:
                break;
            default:
                break;
        }
        return arts;
    }

    /**
     * get table instance based on art id and type
     * @param {*} art_id 
     * @param {*} type 
     */
    static async getData(art_id, type, useScope = true) {
        let art = null;
        const finder = {
            where: {
                id: art_id
            }
        }
        const scope = useScope ? 'bh' : null;
        switch (type) {
            case 100:
                art = await Movie.scope(scope).findOne({
                    finder
                });
                break;
            case 200:
                art = await Music.scope(scope).findOne({
                    finder
                });
                break;
            case 300:
                art = await Sentence.scope(scope).findOne({
                    finder
                });
                break;
            case 400:
                const {
                    Book
                } = require('./book');
                art = await Book.scope(scope).findOne({
                    finder
                });
                if (!art) {
                    art = await Book.create({
                        id: art_id
                    });
                }
                break;
            default:
                break;
        }
        return art;
    }
}

module.exports = {
    Art
}