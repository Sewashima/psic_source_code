const moment = require('moment');

module.exports = {
    dateYMD: (dat) => moment(dat).format('Y-MM-DD HH:mm:ss'),
};