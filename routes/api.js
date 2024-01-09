var express= require('express')
var router = express.Router();

var apiU = require('../controllers/api_users')
var apiSK = require('../controllers/api_sukien')
var apiChat = require('../controllers/api_chat')

var multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function name(req, file, cb) {
        cb(null, file.fieldname + "" + Date.now() + "" + file.originalname);
    }
});

const upload = multer({
    storage: storage,
    
}).single('image');


router.post('/login', apiU.loginUser);
router.post('/register', apiU.registerUser);
router.get('/register', apiU.registerUser);
router.put('/updatePassword/:id', apiU.UpdatePass)



router.post('/postEvent', upload ,apiSK.postData);
router.get('/postEvent', apiSK.getEvent);
router.get('/eventme/:user_id', apiSK.getEventMe)
router.post('/postEvent/:eventId/participants', apiSK.thamgiaEvent);

router.post('/joinEvent', apiSK.joinEvent)

router.patch('/updateimage/:id' , upload ,apiSK.UpdateOne)

router.get('/event/:eventId', apiSK.countUser)

// update status event
router.patch('/yeuthich/:id', apiSK.yeuthich);
// update status event cancelyeuthich
router.patch('/cancelyeuthich/:id', apiSK.cancelyeuthich);



// chat events

router.post('/postChat', upload, apiChat.postChat)
router.get('/getChat', apiChat.getChat)
router.get('/getChat/:user_event', apiChat.getIDChat)
router.get('/chatMess', apiChat.getChat)


// // join group
router.post('/addGroup', apiChat.addUserToGroup)
// add group
router.post('/addgroups',upload ,apiChat.addGroups)
// update status == true thì add zo nhom
router.put('/udgroupss', apiChat.xacnhanZonhoms)

router.get('/getGroup', apiChat.getGroup)
// hien thi theo id group
router.get('/getGroupID', apiChat.getGroupID)
// hien thi quan tri vien
router.get('/getAdmingroup', apiChat.getAdminGroup)
// danh sach tin nhan 
router.get('/getGroupMessage', apiChat.getGroupMessage)
router.get('/getGroupChat/:userID', apiChat.getGroupChat)
// list user join group
router.get('/listUserJoinGroup', apiChat.getUserJoinGroup)
// chat mesage (Hoan thanh)
router.post('/addchat',upload, apiChat.startChat)
// roi nhom chat
router.delete('/logoutChat/:id', apiChat.logoutChat)

// danh sach nguoi xin vo nhom
router.get('/getUserChatGroup', apiChat.getUserChat)


// thong ke
// so lung nhom
router.get('/eventCountUser/:user_id', apiSK.countVentUser)
// sk dang dien ra
router.get('/eventStart',apiSK.getOngoingEvents)

// sk dang den ra cua admin
router.get('/eventStartAdmin/:user_id',apiSK.getOngoingEventsAdmin)
//  su kien ma nguoi dung tham gia
router.get('/countJoinevent/:user_id',apiSK.countJoinVentUser);

// ------------------------------  Mai làm cái này--------------------------------
// sk dien ra năm 2023
router.get('/getUpcomingEvents',apiSK.getUpcomingEvents)
//su kien dang dien ra
router.get('/getListEventStart', apiSK.getListEventStart)
// su kien chua dien ra
router.get('/getEventChuaStart', apiSK.getEventChuaStart)
// sụ kiện trong tuần
router.get('/eventweek/:user_id',apiSK.eventweek)
// su kien theo thang
router.get('/eventmonth/:user_id',apiSK.eventmonth)

module.exports = router;