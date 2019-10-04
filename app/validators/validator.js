const { LinValidator, Rule } = require("../../core/lin-validator-v2");
const {User} = require('../modules/user');
class PositiveIntegerValidator extends LinValidator {
  constructor() {
    super();
    this.id = [
      new Rule("isInt", "need a positive integer", { 
        min: 1 
      }),
    ];
  }
}
class RegisterValidator extends LinValidator {
  constructor() {
      super()
      this.email = [
          new Rule('isEmail', 'not a email address')
      ];
      this.password1 = [
          new Rule('isLength', 'password should at least 6 char and max 32 char', {
              min: 6,
              max: 32
          }),
          new Rule('matches', 'passowrd not matches rule', '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]')
      ];
      this.password2 = this.password1;
      this.nickname = [
          new Rule('isLength', 'username should be at lease 4 char and max 32 char', {
              min: 4,
              max: 32
          }),
      ];
  }

  validatePassword(vals) {
      const psw1 = vals.body.password1;
      const psw2 = vals.body.password2;
      if (psw1 !== psw2) {
          throw new Error('two password must be same');
      }
  }
  async validateEmail(vals) {
    const email = vals.body.email;
    const user = await User.findOne({
        where: {
            email: email
        }
    });
    if (user) {
        throw new Error('email has exist')
    }
  }
}

module.exports = {
    PositiveIntegerValidator,
    RegisterValidator
}
