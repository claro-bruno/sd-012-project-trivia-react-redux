import md5 from 'crypto-js/md5';

const email = 'email@example.com';

const a = md5(email).toString();

console.log(email, a);
