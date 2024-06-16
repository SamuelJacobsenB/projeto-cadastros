const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//-----------------------------------

const UserSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        require: true
    }
});

//-----------------------------------

mongoose.model('cadastros', UserSchema);