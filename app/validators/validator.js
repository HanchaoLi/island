const {
  LinValidator,
  Rule
} = require("../../core/lin-validator-v2");
const {
  User
} = require('../modules/user');
const {
  LoginType,
  ArtType
} = require('../lib/enum');
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

class TokenValidator extends LinValidator {
  constructor() {
    super();
    this.account = [
      new Rule('isLength', 'account does not matches the rule', {
        min: 4,
        max: 32
      })
    ];
    this.scret = [
      new Rule('isOptional'),
      new Rule('isLength', 'at lease 6 char', {
        min: 6,
        max: 128
      })
    ];
  }
  validateLoginType(vals) {
    if (!vals.body.type) {
      throw new Error('missing login type!');
    }
    if (!LoginType.isThisType(vals.body.type)) {
      throw new Error('type param is illegal!');
    }
  }
}

class NotEmptyValidator extends LinValidator {
  constructor() {
    super();
    this.token = [
      new Rule('isLength', 'token should not be empty', {min: 1})
    ];
  }
}

class SearchValidator extends LinValidator {
  constructor() {
    super();
    this.q = [
      new Rule('isLength', 'search keyword can not be empty', {min:1, max: 16})
    ];
    this.start = [
      new Rule('isInt', 'start param not legeal', {min: 0, max: 60000}),
      new Rule('isOptional', '', 0)
    ];
    this.count = [
      new Rule('isInt', 'count param not legeal', {min: 1, max: 20}),
      new Rule('isOptional', '', 0)
    ];
  }
}

function checkType(vals) {
  let type = vals.body.type || vals.path.type;
  if (!type) {
    throw new Error('type must be param');
  }
  type = parseInt(type);
  if (!LoginType.isThisType(type)) {
    throw new Error('type param is not legal');
  }
}

class Checker {
  constructor(type) {
    this.enumType = type;
  }

  check(vals) {
    let type = vals.body.type || vals.path.type;
    if (!type) {
      throw new Error('type must be param');
    }
    type = parseInt(type);

    if (!this.enumType.isThisType(type)) {
      throw new Error('type param is not legal');
    }
  }
}

class LikeValidator extends PositiveIntegerValidator {
  constructor() {
    super();
    const checker = new Checker(ArtType);
    // bind current object to current validator
    this.validateType = checker.check.bind(checker);
  }
}

class AddShortCommentValidator extends PositiveIntegerValidator {
  constructor() {
    super();
    this.content = [
      new Rule('isLength','must be 1 - 24 character', {
        min: 1,
        max: 24
      });
    ];
  }
}

class ClassicValidator extends LikeValidator {

}

module.exports = {
  PositiveIntegerValidator,
  RegisterValidator,
  TokenValidator,
  NotEmptyValidator,
  LikeValidator,
  ClassicValidator,
  SearchValidator,
  AddShortCommentValidator
}