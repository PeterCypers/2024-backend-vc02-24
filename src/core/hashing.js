const crypto = require('crypto');

module.exports = function genereerUniekeId(value) {
  return crypto.createHash('sha256').update(value).digest('hex');
}