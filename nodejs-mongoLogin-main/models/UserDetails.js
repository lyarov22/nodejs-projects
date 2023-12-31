const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserDetailsSchema = new Schema({
    nickname: { type: String },
    avatarUrl: { type: String },
    about: { type: String },
    user: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('UserDetails', UserDetailsSchema, 'UserDetails');