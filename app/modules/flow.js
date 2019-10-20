const {
    sequelize
} = require('../../core/db');
const {
    Sequelize,
    Model
} = require('sequelize');

class Flow extends Model {
    static async getLatestFlow() {
        const flow = await Flow.findOne({
            order: [
                ['index', 'DESC']
            ]
        });
        return flow;
    }
    static async getNextFlow(index) {
        const flow = await Flow.findOne({
            where: {
                index: index + 1
            }
        });
        return flow;
    }
    static async getPreviousFlow(index) {
        const flow = await Flow.findOne({
            where: {
                index: index - 1
            }
        });
        return flow;
    }
}

Flow.init({
    index: Sequelize.INTEGER,
    art_id: Sequelize.INTEGER,
    type: Sequelize.INTEGER
},{
    sequelize,
    tableName: 'flow'
});

module.exports = {
    Flow
}