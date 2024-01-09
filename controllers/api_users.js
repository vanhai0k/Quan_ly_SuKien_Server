const MyModel = require('../models/ModelSK')
const bcrypt = require('bcrypt');

exports.registerUser = async (req, res, next) =>{

    const { username, fullname, email ,password, dob, phone, tokenNotify} = req.body;
    const existingUser = await MyModel.userModel.findOne({ username });
    const existingEmail = await MyModel.userModel.findOne({ email });
    const existingPhone = await MyModel.userModel.findOne({ phone });
    const role = 'User';
    const image = 'https://i.pinimg.com/564x/16/3e/39/163e39beaa36d1f9a061b0f0c5669750.jpg'
    const sex = 'Khác'
    
    if (existingUser) {
      return res.status(409).json({ message: 'Tên người dùng đã tồn tại' });
    }
    if (existingEmail) {
      return res.status(401).json({ message: 'Email người dùng đã tồn tại' });
    }
    if (existingPhone) {
      return res.status(403).json({ message: 'Phone người dùng đã tồn tại' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newPerson = new MyModel.userModel({ username , email, image, password: hashedPassword, dob, role, sex, phone, tokenNotify });
  
    newPerson
      .save()
      .then(() => {
        res.status(201).json({ message: "Đăng ký thành công" });
      })
      .catch((error) => {
        console.error("Lưu thất bại:", error);
        res.status(500).json({ error: "Lỗi server" });
      });
}
exports.loginUser = async (req, res, next) =>{  
    try {
      const { username, password } = req.body;
  
      const user = await MyModel.userModel.findOne({ username });
      if (!user) {
        return res.status(401).json({ message: 'Tên người dùng không tồn tại' });
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
          return res.status(403).json({ message: 'Mật khẩu không chính xác' });
      }
    //   const token = jwt.sign({ userId: user._id }, 'secretKey');
  
    //   res.json({ token });
      res.status(201).json({ message: 'Đăng nhập thành công',password: user.password,
      _id: user._id,email: user.email, username: user.username,phone: user.phone, 
      image: user.image,phone: user.phone,dob: user.dob,sex: user.sex});
    } catch (error) {
      console.error('Đăng nhập thất bại:', error);
      res.status(500).json({ message: 'Đăng nhập thất bại' });
    }
}

exports.UpdatePass = async (req, res) => {
  let data = {
    status: 1,
    msg: "Update successful"
  }

  if (req.method === 'PUT') {
    try {
      const user = await MyModel.userModel.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ status: 0, msg: "User not found" });
      }
      const isPasswordValid = await bcrypt.compare(req.body.currentPassword, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ status: 0, msg: "Current password is incorrect" });
      }
      if (req.body.newPassword !== req.body.confirmPassword) {
        return res.status(409).json({ status: 0, msg: "New password and confirm password do not match" });
      }
      const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);
      await MyModel.userModel.updateOne({ _id: req.params.id }, {
        $set: { password: hashedPassword }
      });
      res.status(200).json(data);
    } catch (err) {
      console.log(err);
      data.msg = err.message;
      res.status(500).json(data);
    }
  } else {
    res.status(400).json({ status: 0, msg: "Invalid request method" });
  }
};
