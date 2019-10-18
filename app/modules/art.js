const {
    Movie,
    Sentence,
    Music
} = require('../modules/classic');

class Art {

    /**
     * get table instance based on art id and type
     * @param {*} art_id 
     * @param {*} type 
     */
    static async getData(art_id, type) {
        let art = null;
        const finder = {
            where: {
                id: art_id
            }
        }
        switch (type) {
            case 100:
                art = await Movie.findOne({
                    finder
                });
                break;
            case 200:
                art = await Music.findOne({
                    finder
                });
                break;
            case 300:
                art = await Sentence.findOne({
                    finder
                });
                break;
            case 400:

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