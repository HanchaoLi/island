const bcrypt = require('bcryptjs');
const {
    sequelize
} = require('../../core/db');
const {
    Sequelize,
    Model
} = require('sequelize');

class User extends Model {
    static async verifyEmailPassword(email, plainPassword) {
        const user = await User.findOne({
            where: {
                email
            }
        });
        if (!user) {
            throw new global.errs.AuthFailed('user does not exist');
        }
        const correct = bcrypt.compareSync(plainPassword, user.password);
        if (!correct) {
            throw new global.errs.AuthFailed('password not correct');
        }
        return user;
    }
    static async getUserByOpenid(openid) {
        const user = await User.findOne({
            where: {
                openid
            }
        });
        return user;
    }

    static async registerUserByOpenid(openid) {
        const user = await User.create({
            openid
        });
        return user;
    }
}

User.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nickname: Sequelize.STRING,
    email: {
        type: Sequelize.STRING(128),
        unique: true
    },
    // observation design pattern
    password: {
        type: Sequelize.STRING,
        set(val) {
            const salt = bcrypt.genSaltSync(10);
            const psw = bcrypt.hashSync(val, salt);
            this.setDataValue('password', psw);
        }
    },
    openid: {
        type: Sequelize.STRING(64),
        unique: true
    }
}, {
    sequelize,
    tableName: 'user'
});

module.exports = {
    User
}