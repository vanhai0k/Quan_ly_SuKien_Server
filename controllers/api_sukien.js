const MyModel = require('../models/ModelSK')
const { format } = require('date-fns-tz');
const date = new Date();
const formattedDateVN = format(date, 'dd-MM-yyyy', { timeZone: 'Asia/Ho_Chi_Minh' });

exports.getEvent = async (req, res, next) => {
  let dataR={
    msg: "Danh sach event"
  }
  let dieu_kien = null;
  if (typeof (req.query._id) !== "undefined") {
    let _id = req.query._id;
    dieu_kien = { _id:_id };
    console.log(dieu_kien);
  }

  let list = []
  try{

    list = await MyModel.eventModel.find(dieu_kien).populate("participants.user_id")
    dataR.data = list

  }catch(err){
    dataR.data = err.message;
  }
//trả về client
res.json(dataR);
console.log(dataR);
}

exports.getEventUserLimit = async (req, res, next) => {
  let dataR={
    msg: "Danh sach event"
  }
  let dieu_kien = null;
  if (typeof (req.query._id) !== "undefined") {
    let _id = req.query._id;
    dieu_kien = { _id:_id };
    console.log(dieu_kien);
  }

  let list = []
  try{

    list = await MyModel.eventModel.find(dieu_kien).populate("participants.user_id")
    dataR.data = list

  }catch(err){
    dataR.data = err.message;
  }
//trả về client
res.json(dataR);
console.log(dataR);
}

exports.getEventMe = async (req, res, next) => {
  let dataR={
    msg: "Danh sach event"
  }
  let user_id = req.params.user_id;
// Check if user_id is undefined
if (user_id === undefined) {
  res.status(400).json({
    error: "Missing user_id parameter in the request."
  });
  return;
}

let dieu_kien = { user_id: user_id };
  let list = []
  try{

    list = await MyModel.eventModel.find(dieu_kien).populate("participants.user_id");
    dataR.data = list

  }catch(err){
    dataR.data = err.message;
  }
//trả về client
res.json(dataR);
console.log(dataR);
}

exports.postData = async (req, res, next) => {
    try{
    const {
        eventName,
        location,
        description,
        startTime,
        endTime,
        user_id,
        participants,
        createdAt,
        updatedAt,
        status,
        limit,
      } = req.body;
  
      // Kiểm tra xem người tạo sự kiện có tồn tại không
      const user = await MyModel.userModel.findById(user_id);
      if (!user) {
        return res.status(404).json({ message: 'Người tạo sự kiện không tồn tại' });
      }
      const initialParticipants = participants && Array.isArray(participants) ? participants : [];

    const newEvent = new MyModel.eventModel({
        eventName,
        location,
        description,
        image: req.file.filename,
        startTime,
        endTime,
        user_id,
        participants: initialParticipants,
        createdAt,
        updatedAt,
        status,
        limit
      });

      const saveEvent = await newEvent.save();

      // Kiểm tra nếu user.saveEvent không được định nghĩa hoặc không phải là mảng
    if (!user.saveEvent || !Array.isArray(user.saveEvent)) {
        user.saveEvent = []; // Nếu không, khởi tạo một mảng trống
      }

      user.saveEvent.push(saveEvent._id);
      await user.save();
      res.status(201).json({ message: 'Sự kiện đã được thêm thành công', event: saveEvent });
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Đã xảy ra lỗi', error });
      }
}
exports.thamgiaEvent = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const participantData = req.body;

    const event = await MyModel.eventModel.findById(eventId);
    if (!event) {
        return res.status(404).json({ error: 'Event not found' });
    }

    event.participants.push(participantData);
    await event.save();

    res.status(200).json(event);
} catch (error) {
    res.status(500).json({ error: error.message });
}
}
//nen su dung cai nay de tham gia
exports.joinEvent = async (req, res, next) => {
  try {
      const { eventId, userId, status } = req.body;

      // Kiểm tra xem sự kiện có tồn tại không
      const event = await MyModel.eventModel.findById(eventId);
      if (!event) {
          return res.status(404).json({ message: 'Sự kiện không tồn tại' });
      }

      // Kiểm tra xem người dùng có tồn tại không
      const user = await MyModel.userModel.findById(userId);
      if (!user) {
          return res.status(404).json({ message: 'Người dùng không tồn tại' });
      }

      // Kiểm tra xem người dùng đã tham gia sự kiện chưa
      const participantIndex = event.participants.findIndex(participant => participant.user_id.toString() === userId);
      if (participantIndex !== -1) {
          return res.status(400).json({ message: 'Người dùng đã tham gia sự kiện' });
      }

      // Thêm người dùng vào danh sách tham gia sự kiện
      event.participants.push({
          user_id: userId,
          status: status || 'Pending' // Trạng thái mặc định là 'Pending' nếu không có trạng thái được cung cấp
      });

      await event.save();

      res.status(200).json({ message: 'Người dùng đã tham gia sự kiện thành công', event });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Đã xảy ra lỗi', error });
  }
}

exports.UpdateOne = async (req, res, next) => {
  let data = {
    status: 1,
    msg: "update",
  };

  if (req.method == "PATCH") {
    try {
        await MyModel.eventModel.updateOne(
          { _id: req.params.id },
          {
            $set: {
              eventName: req.body.eventName,
              image : req.file.filename
            }
          }
        );

        res.status(200).json(data);

    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  } else {
    res.status(400).json({ status: 0, msg: "Invalid request method" });
  }
};

exports.yeuthich = async (req, res, next) => {
  let data = {
    status: 1,
    msg: "update",
  };
if (req.method == "PATCH") {
    try {
      await MyModel.eventModel.updateOne(
        { _id: req.params.id },
        {
          $set: {
            status: "1",
          }
        }
      );
      res.status(200).json(data);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }else {
    res.status(400).json({ status: 0, msg: "Invalid request method" });
  }
}
exports.cancelyeuthich = async (req, res, next) => {
  let data = {
    status: 1,
    msg: "update",
  };
if (req.method == "PATCH") {
    try {
      await MyModel.eventModel.updateOne(
        { _id: req.params.id },
        {
          $set: {
            status: "2",
          }
        }
      );
      res.status(200).json(data);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }else {
    res.status(400).json({ status: 0, msg: "Invalid request method" });
  }
}

exports.countUser = async (req, res, next) => {
    const eventId = req.params.eventId;

  try {
    // Lấy thông tin sự kiện từ cơ sở dữ liệu
    const event = await MyModel.eventModel.findById(eventId);

    if (!event) {
        console.log('Sự kiện không tồn tại');
        return 0;
    }

    // Lấy số lượng người tham gia từ mảng participants
    const participantCount = event.participants.length;

    console.log(`Số lượng người tham gia sự kiện ${event.eventName}: ${participantCount}`);
    return res.json({participantCount});
} catch (error) {
    console.error('Lỗi khi lấy thông tin sự kiện:', error);
    return res.status(500).json({ error: 'Có lỗi xảy ra khi xử lý yêu cầu' });

}
}

exports.countVentUser = async (req, res, next) => {
  const { user_id } = req.params;

  try {
    // Lấy thông tin sự kiện từ cơ sở dữ liệu
    const events = await MyModel.eventModel.find({ user_id : user_id });

    if (!events || events.length === 0) {
        console.log('Không có sự kiện nào cho user_id này');
        return res.json({ participantCount: 0 });
    }

    // Lấy số lượng sự kiện mà người dùng tham gia
    const participantCount = events.length;

    console.log(`Số lượng sự kiện mà người dùng: ${participantCount}`);
    return res.json({ participantCount });
  } catch (error) {
    console.error('Lỗi khi lấy thông tin sự kiện:', error);
    return res.status(500).json({ error: 'Có lỗi xảy ra khi xử lý yêu cầu' });
  }
}

exports.countJoinVentUser = async (req, res, next) => {
  const { user_id } = req.params;

  try {
    // Lấy thông tin sự kiện từ cơ sở dữ liệu
    const events = await MyModel.eventModel.find({ 'participants.user_id': user_id });

    if (!events || events.length === 0) {
        console.log('Không có sự kiện nào cho user_id này');
        return res.json({ participantCount: 0 });
    }

    // Lấy số lượng sự kiện mà người dùng tham gia
    const participantCount = events.reduce((count, event) => {
      return count + event.participants.filter(participant => String(participant.user_id) === String(user_id)).length;
    }, 0);

    console.log(`Số lượng sự kiện mà người dùng tham gia: ${participantCount}`);
    return res.json({ participantCount });
  } catch (error) {
    console.error('Lỗi khi lấy thông tin sự kiện:', error);
    return res.status(500).json({ error: 'Có lỗi xảy ra khi xử lý yêu cầu' });
  }
}


exports.getOngoingEvents = async (req, res, next) => {
  try {
    // Lấy ngày hiện tại
    const currentDate = new Date();

    // Truy vấn sự kiện đang diễn ra
    const ongoingEvents = await MyModel.eventModel.find({
      createdAt: { $lte: formattedDateVN },
      updatedAt: { $gte: formattedDateVN },
    });

    console.log('Số lượng sự kiện đang diễn ra:', ongoingEvents.length);
    return res.json({ ongoingEventsCount: ongoingEvents.length });
  } catch (error) {
    console.error('Lỗi khi thống kê sự kiện đang diễn ra:', error);
    return res.status(500).json({ error: 'Có lỗi xảy ra khi xử lý yêu cầu' });
  }
};
// Truy vấn sự kiện đang diễn ra
exports.getListEventStart = async (req, res, next) => {
  try {
    // Lấy ngày hiện tại
    const currentDate = new Date();

    // Truy vấn sự kiện đang diễn ra
    const ongoingEvents = await MyModel.eventModel.find({
      createdAt: { $lte: formattedDateVN },
      updatedAt: { $gte: formattedDateVN },
    }).populate("participants.user_id");
    console.log('Số lượng sự kiện đang diễn ra:', ongoingEvents.length);
    return res.json({ ongoingEventsCount: ongoingEvents });
  } catch (error) {
    console.error('Lỗi khi thống kê sự kiện đang diễn ra:', error);
    return res.status(500).json({ error: 'Có lỗi xảy ra khi xử lý yêu cầu' });
  }
};


exports.getOngoingEventsAdmin = async (req, res, next) => {
  const { user_id } = req.params;
  try {
    // Lấy ngày hiện tại
    const currentDate = new Date();

    // Truy vấn sự kiện đang diễn ra
    const ongoingEvents = await MyModel.eventModel.find({
      user_id :user_id,
      createdAt: { $lte: formattedDateVN },
      updatedAt: { $gte: formattedDateVN },
    });

    console.log('Số lượng sự kiện đang diễn ra:', ongoingEvents.length);
    return res.json({ ongoingEventsCount: ongoingEvents.length });
  } catch (error) {
    console.error('Lỗi khi thống kê sự kiện đang diễn ra:', error);
    return res.status(500).json({ error: 'Có lỗi xảy ra khi xử lý yêu cầu' });
  }
};
// các sự kiện diễn ra trong năm 2023
exports.getUpcomingEvents = async (req, res) => {
  try {
    // Lấy ngày hiện tại
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    // Chuyển định dạng ngày sang đối tượng Date
    const formattedDateVN = format(currentDate, 'dd-MM-yyyy', { timeZone: 'Asia/Ho_Chi_Minh' });

    console.log('Ngày hiện tại: ', formattedDateVN);
    console.log('Năm hiện tại: ', currentYear);

    // Truy vấn sự kiện chưa diễn ra
    const upcomingEvents = await MyModel.eventModel.find({
      $expr: {
        $lt: [
          { $toDate: "$createdAt" },
          { $toDate: new Date(`01-01-${currentYear}`) }
        ],
      }
    });

    console.log('Số lượng sự kiện chưa diễn ra:', upcomingEvents);

    return res.json({ upcomingEventsCount: upcomingEvents.length, upcomingEvents });
  } catch (error) {
    console.error('Lỗi khi thống kê sự kiện chưa diễn ra:', error);
    return res.status(500).json({ error: 'Có lỗi xảy ra khi xử lý yêu cầu' });
  }
}

exports.getEventChuaStart = async (req, res) => {
  try {
    // Lấy ngày hiện tại
    const currentDate = new Date();

    // Chuyển định dạng ngày sang đối tượng Date
    const formattedDateVN = format(currentDate, 'dd-MM-yyyy', { timeZone: 'Asia/Ho_Chi_Minh' });

    console.log('Ngày hiện tại: ', formattedDateVN);

    // Truy vấn sự kiện chưa diễn ra
    const upcomingEvents = await MyModel.eventModel.find({
      $expr: {
        $gt: [
          { $toDate: "$createdAt" },
          currentDate
        ],
      }
    }).populate("participants.user_id");

    console.log('Số lượng sự kiện chưa diễn ra:', upcomingEvents);

    return res.json({ upcomingEventsCount: upcomingEvents.length, upcomingEvents });
  } catch (error) {
    console.error('Lỗi khi thống kê sự kiện chưa diễn ra:', error);
    return res.status(500).json({ error: 'Có lỗi xảy ra khi xử lý yêu cầu' });
  }
}
const moment = require('moment');
exports.eventweek = async (req, res) => {

  const user_id = req.params.user_id;
  try {
    const now = moment();
    const startOfWeek = now.startOf('week').format('DD-MM-YYYY');
    const endOfWeek = now.endOf('week').format('DD-MM-YYYY');

    const events = await MyModel.eventModel.find({
      user_id :user_id,
      $or: [
        { createdAt: { $gte: startOfWeek, $lte: endOfWeek } },
        { updatedAt: { $gte: startOfWeek, $lte: endOfWeek } }
      ]
    }).populate("participants.user_id").exec();
    console.log('startOfWeek: ',startOfWeek);
    console.log('endOfWeek: ', endOfWeek);
    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

exports.eventmonth = async (req, res) => {

  const user_id = req.params.user_id;
  try {
    const now = moment();
    const startOfWeek = now.startOf('month').format('DD-MM-YYYY');
    const endOfWeek = now.endOf('month').format('DD-MM-YYYY');

    const events = await MyModel.eventModel.find({
      user_id :user_id,
      $or: [
        { createdAt: { $gte: startOfWeek, $lte: endOfWeek } },
        { updatedAt: { $gte: startOfWeek, $lte: endOfWeek } }
      ]
    }).populate("participants.user_id").exec();
    console.log('startOfMonth: ',startOfWeek);
    console.log('endOfMonth: ', endOfWeek);
    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

