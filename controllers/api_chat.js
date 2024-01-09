const ChatEV = require("../models/ModelSK");
const MyModel = require('../models/ModelSK')
const ChatModel = require('../models/Chat.models')

exports.getChat = async (req, res, next) => {
    let dataR={
        msg: "Danh sach chat event"
      }
      let dieu_kien = null;
      if (typeof (req.query.user_event) !== "undefined") {
        let user_event = req.query.user_event;
        dieu_kien = { user_event:user_event };
        console.log(dieu_kien);
      }
    
      let list = []
      try{
    
        // list = await MyModel.chatModel.find(dieu_kien).populate("user_id")
        list = await MyModel.chatModel.find(dieu_kien)
        dataR.data = list
    
      }catch(err){
        dataR.data = err.message;
      }
    //trả về client
    res.json(dataR);
    console.log(dataR);
}

exports.getIDChat = async (req, res, next) => {
    let dataR={
        msg: "Danh sach chat event"
      }
      let user_event = req.params.user_event;
      if (user_event === undefined) {
        res.status(400).json({
          error: "Missing user_id parameter in the request."
        });
        return;
      }
      let dieu_kien = { user_event: user_event };
      let list = []
      try{
    
        list = await MyModel.chatModel.find(dieu_kien)
        dataR.data = list
    
      }catch(err){
        dataR.data = err.message;
      }
    //trả về client
    res.json(dataR);
    console.log(dataR);
}

exports.postChat = async (req, res, next) => {
  try {
    const { user_id, user_event, content } = req.body;

    const user = await MyModel.userModel.findById(user_id);
    if (!user) {
      return res
        .status(404)
        .json({ message: "Người tạo sự kiện không tồn tại" });
    }
    const image = req.file ? req.file.filename : '';

    const postChat = await ChatEV.chatModel({
      user_id,
      user_event,
      content,
      image
    });
    const saveChat = await postChat.save();

      // Kiểm tra nếu user.saveEvent không được định nghĩa hoặc không phải là mảng
    if (!user.saveChat || !Array.isArray(user.saveChat)) {
        user.saveChat = []; // Nếu không, khởi tạo một mảng trống
      }

      user.saveChat.push(saveChat._id);
      await user.save();
      res.status(201).json({ message: 'Chat thành công', chat: saveChat });
  } catch (error) {
    console.log(error);
  }
};

// danh sach nguoi xin vo nhom
exports.getUserJoinGroup = async (req, res, next) => {
  let dataR={
      msg: "Danh sach nguoi xin tham gia Group"
    }
    let dieu_kien = null;
    if (typeof (req.query._id) !== "undefined") {
      let _id = req.query._id;
      dieu_kien = { _id:_id };
      console.log(dieu_kien);
    }
  
    let list = []
    try{
  
      // list = await MyModel.chatModel.find(dieu_kien).populate("user_id")
      list = await ChatModel.addChatModel.find(dieu_kien)
      dataR.data = list
  
    }catch(err){
      dataR.data = err.message;
    }
  //trả về client
  res.json(dataR);
  console.log(dataR);
}

// danh sach group
exports.getGroup = async (req, res, next) => {
  let dataR={
      msg: "Danh sach group event"
    }
    let dieu_kien = null;
    if (typeof (req.query.userID) !== "undefined") {
      let userID = req.query.userID;
    dieu_kien = { "numbers.userID": userID };
      console.log(dieu_kien);
    }
  
    let list = []
    try{
  
      // list = await MyModel.chatModel.find(dieu_kien).populate("user_id")
      list = await ChatModel.chatsModel.find(dieu_kien)
      dataR.data = list
  
    }catch(err){
      dataR.data = err.message;
    }
  //trả về client
  res.json(dataR);
  console.log(dataR);
}
exports.getGroupID = async (req, res, next) => {
  let dataR={
      msg: "Danh sach group event"
    }
    let dieu_kien = null;
    if (typeof (req.query._id) !== "undefined") {
      let _id = req.query._id;
    dieu_kien = { _id: _id };
      console.log(dieu_kien);
    }
  
    let list = []
    try{
  
      // list = await MyModel.chatModel.find(dieu_kien).populate("user_id")
      list = await ChatModel.chatsModel.find(dieu_kien).populate("numbers.userID")
      dataR.data = list
  
    }catch(err){
      dataR.data = err.message;
    }
  //trả về client
  res.json(dataR);
  console.log(dataR);
}
exports.getAdminGroup = async (req, res, next) => {
  let dataR={
      msg: "Danh sach group admin event"
    }
    let dieu_kien = null;
    if (typeof (req.query._id) !== "undefined") {
      let _id = req.query._id;
    dieu_kien = { _id: _id };
      console.log(dieu_kien);
    }
  
    let list = []
    try{
  
      // list = await MyModel.chatModel.find(dieu_kien).populate("user_id")
      list = await ChatModel.chatsModel.find(dieu_kien).populate("admin")
      dataR.data = list
  
    }catch(err){
      dataR.data = err.message;
    }
  //trả về client
  res.json(dataR);
  console.log(dataR);
}
// danh sach tin nhan
exports.getGroupMessage = async (req, res, next) => {
  let dataR={
      msg: "Danh sach chat event"
    }
    let dieu_kien = null;
    if (typeof (req.query._id) !== "undefined") {
      let _id = req.query._id;
    dieu_kien = { _id:_id };
      console.log(dieu_kien);
    }
  
    let list = []
    try{
  
      // list = await MyModel.chatModel.find(dieu_kien).populate("user_id")
      list = await ChatModel.chatsModel.find(dieu_kien)
      dataR.data = list
  
    }catch(err){
      dataR.data = err.message;
    }
  //trả về client
  res.json(dataR);
  console.log(dataR);

}
const mongoose = require('mongoose');
exports.getGroupChat = async (req, res, next) => {
  // let dataR={
  //     msg: "Danh sach chat event"
  //   }
  //   let dieu_kien = null;
  //   if (typeof (req.query._id) !== "undefined") {
  //     let _id = req.query._id;
  //   dieu_kien = { _id:_id };
  //     console.log(dieu_kien);
  //   }
  
  //   let list = []
  //   try{
  
  //     // list = await MyModel.chatModel.find(dieu_kien).populate("user_id")
  //     list = await ChatModel.chatsModel.find(dieu_kien)
  //     dataR.data = list
  
  //   }catch(err){
  //     dataR.data = err.message;
  //   }
  // //trả về client
  // res.json(dataR);
  // console.log(dataR);

  try {
    const userID = req.params.userID;
  
    // Find the user with the given ID
    const user = await MyModel.userModel.findById(userID);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
  
    // Find groups where the user is a member
    const ObjectId = mongoose.Types.ObjectId;

  // Find groups where the user is a member
  const groups = await ChatModel.chatsModel.find({
    'numbers.userID': new ObjectId(userID)
  });
  
    res.json(groups);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
  

}
// join group
exports.addUserToGroup = async (req, res) => {
  try {
    const { userID, groupID, status, content } = req.body;

    if (!userID || !groupID || !status || !content) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Kiểm tra nếu người dùng hiện tại có quyền xác nhận tham gia (admin, chẳng hạn)
    // Bạn có thể thực hiện cơ chế xác thực tùy thuộc vào cấu trúc người dùng của bạn
    const isAdmin = true; // Thay thế bằng cách xác định có phải là admin hay không

    if (!isAdmin) {
      return res.status(403).json({ error: 'Permission denied' });
    }

    // Kiểm tra xem người dùng đã tồn tại trong nhóm chưa
    const existingUser = await ChatModel.addChatModel.findOne({
      userID,
      groupID,
    });

    if (existingUser) {
      // Nếu người dùng đã tồn tại, cập nhật trạng thái
      existingUser.status = status;
      existingUser.content = content || '';
      await existingUser.save();
    } else {
      // Nếu người dùng chưa tồn tại, thêm mới
      const newJoinGroup = new ChatModel.addChatModel({
        userID,
        groupID,
        status,
        content
      });
      await newJoinGroup.save();
    }

    res.status(201).json({ message: 'Successfully processed the request' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// tao nhom group
exports.addGroups = async(req, res, next) => {
  try {
    // Lấy dữ liệu từ request body
    const { name, numbers, admin, chatHistory,eventID } = req.body;

    // Kiểm tra xem eventID đã tồn tại trong cơ sở dữ liệu chưa
    const existingGroup = await ChatModel.chatsModel.findOne({ eventID });

    if (existingGroup) {
      return res.status(400).json({ message: 'Duplicated eventID. Please use a different eventID.' });
    }

    const formattedChatHistory = chatHistory ? JSON.parse(chatHistory) : [];


    // Tạo một đối tượng nhóm mới
    const newGroup = new ChatModel.chatsModel({
        name,
        numbers: [{ userID: admin }],
        admin,
        chatHistory: formattedChatHistory,
        eventID,
        image: req.file ? req.file.filename : null,
    });

    // Lưu nhóm mới vào cơ sở dữ liệu
    await newGroup.save();

    res.status(201).json({ message: 'Nhóm đã được thêm thành công!' });
} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Đã có lỗi xảy ra khi thêm nhóm.' });
}
}

// xac nhan admin cho tham gia
exports.xacnhanZonhoms = async (req, res) => {
  try {
    const { userID, groupID, status, content } = req.body;

    if (!userID || !groupID || status === undefined) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Kiểm tra nếu người dùng hiện tại có quyền xác nhận tham gia (admin, chẳng hạn)
    // Bạn có thể thực hiện cơ chế xác thực tùy thuộc vào cấu trúc người dùng của bạn
    const isAdmin = true; // Thay thế bằng cách xác định có phải là admin hay không

    if (!isAdmin) {
      return res.status(403).json({ error: 'Permission denied' });
    }

    // Nếu status là "true" hoặc "false", thì chỉ cập nhật trạng thái trong addChatModel
    const existingUser = await ChatModel.addChatModel.findOne({ userID, groupID });
    let groupToUpdate;
    if (existingUser) {
      console.log('Existing User:', existingUser); // Log existing user details

      existingUser.status = status;
      existingUser.content = content || existingUser.content || ''; // Optional: Update content if provided
      await existingUser.save();

      groupToUpdate = await ChatModel.chatsModel.findOne({ _id: groupID });

  const userInNumbers = groupToUpdate.numbers.find(user => user.userID.equals(userID));

  if (!userInNumbers) {
    groupToUpdate.numbers.push({ userID: existingUser.userID });

    // Save the changes to the group after adding the user
    await groupToUpdate.save();

    console.log('Group After Update:', groupToUpdate);
  }


      // Trả về thông báo rằng người dùng đã có mặt trong nhóm
      return res.status(200).json({ message: 'User status updated successfully' });
    } else {
      // Nếu người dùng chưa tồn tại, thêm mới
      const newJoinGroup = new ChatModel.addChatModel({
        userID,
        groupID,
        status,
        content: content || ''
      });

      await newJoinGroup.save();
    }

    // Tìm nhóm chat để cập nhật
     groupToUpdate = await ChatModel.chatsModel.findOne({ _id: groupID });

    if (groupToUpdate) {
      console.log('Group Before Update:', groupToUpdate); // Log group details before update

      // Kiểm tra xem người dùng đã tồn tại trong mảng numbers chưa
      const userInNumbers = groupToUpdate.numbers.find(user => user.userID.equals(userID));

      if (!userInNumbers) {
        // Nếu không tồn tại, thêm userID vào mảng numbers
        groupToUpdate.numbers.push({ userID });
        await groupToUpdate.save();

        console.log('Group After Update:', groupToUpdate); // Log group details after update
      }
    }

    res.status(201).json({ message: 'Successfully processed the request' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const { format } = require('date-fns-tz');
const date = new Date();
const formattedDateVN = format(date, 'HH:mm dd/MM/yyyy', { timeZone: 'Asia/Ho_Chi_Minh' });
// API endpoint for posting a chat message
exports.startChat = async (req, res) => {
  try {
    const { chatId, userId, message } = req.body;

    // Find the chat by ID
    const chat = await ChatModel.chatsModel.findById(chatId);

    if (!chat) {
      return res.status(404).json({ error: 'Chat not found' });
    }

    // Check if the user is a member of the chat
    const isMember = chat.numbers.some(member => member.userID.equals(userId));

    if (!isMember) {
      return res.status(403).json({ error: 'User is not a member of the chat' });
    }

    // Add the new message to chatHistory
    const newMessage = {
      userId: userId,
      message: message || '',
      image: req.file ? req.file.filename : '',
      time: formattedDateVN // You might want to use a better time format
    };

    chat.chatHistory.push(newMessage);

    // Save the updated chat
    await chat.save();

    res.status(200).json({ message: 'Chat message added successfully', newMessage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
exports.logoutChat = async (req, res) => {
  try{

    const id = req.params.id;
    const result = await ChatModel.chatsModel.findOneAndUpdate(
      { 'numbers.userID': id },
      { $pull: { numbers: { userID: id } } },
      { new: true }
    );

    // Check if the update was successful
    if (result) {
      res.json({ success: true, message: 'User deleted successfully.' });
    } else {
      res.status(404).json({ success: false, message: 'User not found.' });
    }

  }catch (error){
    console.log(error);
    res.status(404).json({success: false, message: 'Internal server error.' });
  }
}

exports.getUserChat = async (req, res) => {
    let dataR={
        msg: "Danh sach chat event"
      }
      let dieu_kien = null;
      if (typeof (req.query.groupID) !== "undefined") {
        let groupID = req.query.groupID;
        dieu_kien = { groupID:groupID, status: 1 };
        console.log(dieu_kien);
      }
    
      let list = []
      try{
    
        // list = await MyModel.chatModel.find(dieu_kien).populate("user_id")
        list = await ChatModel.addChatModel.find(dieu_kien).populate("userID")
        dataR.data = list
    
      }catch(err){
        dataR.data = err.message;
      }
    //trả về client
    res.json(dataR);
    console.log(dataR);
}