require('../config/db.connection');

module.exports = {
    User: require('./user_model'),
    Post: require('./post_model')
}