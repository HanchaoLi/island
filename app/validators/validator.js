const { LinValidator, Rule } = require("../../core/lin-validator");

class PositiveIntegerValidator extends LinValidator {
  constructor() {
    super();
    this.id = [new Rule("isInt", "need a positive integer", { min: 1 })];
  }
}

module.exports = {
    PositiveIntegerValidator
}
