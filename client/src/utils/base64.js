const encode = str => Buffer.from(str).toString('base64');
const decode = encStr => Buffer.from(encStr, 'base64').toString('ascii');

export default {
  encode,
  decode
};
