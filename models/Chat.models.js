var db = require('./db');

const chatsSchema = new db.mongoose.Schema({
    name: {type: String, required: true},
    numbers : [
        {
            userID : {type: db.mongoose.Schema.Types.ObjectId, ref: 'userModel'},
        }
    ],
    admin: { type: db.mongoose.Schema.Types.ObjectId, ref: 'userModel'},
    eventID: { type: db.mongoose.Schema.Types.ObjectId, ref: 'event_Channel'},
    chatHistory: [
        {
            userId : {type: db.mongoose.Schema.Types.ObjectId, ref: 'userModel'},
            message : {type: String, required: false},
            image: {type: String, required: false},
            time: {type: String, required: false}
        }
    ],
    image: { type: String, required: false},
}, { collection: 'chatHistory' })

const addchatSchema = new db.mongoose.Schema({
    userID: { type: db.mongoose.Schema.Types.ObjectId, ref: 'userModel'},
    groupID: { type: db.mongoose.Schema.Types.ObjectId, ref: 'chatsModel'},
    status: { type: String, required: true},
    content: {type : String, required: false}

}, { collection: 'addchatSchema' })

let chatsModel = db.mongoose.model("chatsModel", chatsSchema);
let addChatModel = db.mongoose.model("addChatModel", addchatSchema);

module.exports = {
    chatsModel,addChatModel
}