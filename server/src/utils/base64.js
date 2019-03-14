module.exports = {
  encode: str => Buffer.from(str).toString('base64'),
  decode: encStr => Buffer.from(encStr, 'base64').toString('ascii')
};
