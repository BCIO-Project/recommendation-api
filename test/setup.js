process.env.ENVIRONMENT = process.env.NODE_ENV ?  process.env.NODE_ENV : 'dev';
require('dotenv').config({path : process.cwd() + '/config/' + process.env.ENVIRONMENT + '/.env'})