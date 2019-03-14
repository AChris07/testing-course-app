const math = require('mathjs');

module.exports.evalExpression = expr => math.eval(expr);
