const util = require('util');
const axios = require('axios');
const {User} = require('../app/modules/user');
const {generateToken} = require('../core/util');
const {Auth} = require('../middlewares/auth');

class WXManager {
    static async codeToToken(code) {
        const url = util.format(global.config.wx.loginUrl,
        global.config.wx.appId,
        global.config.wx.appSecret,
        code);

        const result = await axios.get(url);
        if (result.status != 200) {
            throw new global.errs.AuthFailed('opendid failed');
        }
        const errcode = result.data.errcode;
        const errmsg = result.data.errmsg;
        if (errcode) {
            throw new global.errs.AuthFailed('opendid failed:' + errcode + " " + errmsg);
        }
        let user = await User.getUserByOpenid(result.data.openid);
        if (!user) {
            user = await User.registerUserByOpenid(result.data.openid);
        }
        return generateToken(user.id, Auth.USER);
    }
}

module.exports = {
    WXManager
}