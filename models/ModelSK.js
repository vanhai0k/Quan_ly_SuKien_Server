var db =require('./db')

const userSchema = new db.mongoose.Schema({
    username : {type: String , required: true},
    email: {type: String , required: true},
    password: {type: String , required: true},
    phone : {type: String , required: true},
    dob : {type: String , required: false},
    sex : {type: String , required: false},
    eventsAttending: [
        {
        eventId: { type: db.mongoose.Schema.Types.ObjectId, ref: 'event_Channel' },
        status: {type: String , required: false},
        },
      ],
      image: { type: String, require: true },
      date:{ type: String, default: false },
}, {
    collection :'users'
})

const enventSchema = new db.mongoose.Schema({
    eventName : {type: String, required: true},
    location: {type: String, required: true},
    description: {type: String, required: true},
    limit: {type: String, required: false},
    image: { type: String, require: true },
    startTime : {type: String, required: true},
    endTime : {type: String, required: true},
    // id nguoi tao event
    user_id: { type: db.mongoose.Schema.Types.ObjectId, ref: 'userModel' },
    participants: [
        {
            // id nguoi tham gia
        user_id: { type: db.mongoose.Schema.Types.ObjectId, ref: 'userModel', required: false },
        status: {type:String, required: false} // Trạng thái tham gia (ví dụ: Đã xác nhận, Chưa xác nhận)
        },
        // Các người tham gia khác
      ],
      createdAt: {type: String, required: true},
      updatedAt: {type: String, required:true},
      status: {type: String, required: true},

}, {collection:'event_Channel'})

const chatEvent = new db.mongoose.Schema({
    user_id: { type: db.mongoose.Schema.Types.ObjectId, ref: 'userModel' },
    user_event: { type: db.mongoose.Schema.Types.ObjectId, ref: 'eventModel' },
    content : { type: String, required: true },
    image: { type: String, required: false},
}, { collection :'ChatMESS'})

let userModel = db.mongoose.model('userModel', userSchema)
let eventModel = db.mongoose.model('eventModel', enventSchema)
let chatModel = db.mongoose.model('chatModel', chatEvent)
module.exports={
    userModel,eventModel, chatModel
}