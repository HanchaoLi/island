const { LinValidator, Rule } = require("../../core/lin-validator");

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
    super();
    this.email = [
      new Rule('isEmail', 'invalid email')
    ];
    this.password1 = [
      new Rule('isLength','need length bewteen 6 and 32', {
        min: 6, max: 32
      }),
      new Rule('matches', 'don not matchs the password rule', '^(?![0-9]+$(?![a-zA-z]+$)[0-9A-Za-z])')
    ];
    this.password2 = this.password1
    this.nickname = [new Rule('isLength','username not matchs the length', {
        min: 4, max: 32
      })
    ];
  }

  validatePassword(vals) {
    const psw1 = vals.body.password1;
    const psw2 = vals.body.password2;
    if (psw1 !== psw2) {
      throw new Error('passowrd did not matches');
    }
  }

}

module.exports = {
    PositiveIntegerValidator,
    RegisterValidator
}
