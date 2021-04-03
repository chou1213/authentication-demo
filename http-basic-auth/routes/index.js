var router = require('koa-router')();

router.get('/*', function* (next) {
  console.log(this.get('Authorization'))
  let Authorization = this.get('Authorization');
  if (Authorization) {
    Authorization = Authorization.replace('Basic ', '');
    const [usrname, passwd] = Buffer.from(Authorization, 'base64').toString().split(':');
    console.log(Buffer.from(Authorization, 'base64').toString().split(':'));
    if (usrname === '123' && passwd === '123') {
      yield this.render('user');
    } else {
      this.status = 403;
    }
  } else {
    this.status = 401;
    this.append('WWW-Authenticate', 'Basic')
  }
});

module.exports = router;
