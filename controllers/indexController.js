import User from "../models/userModel.js";
import bcrypt from "bcrypt";

export const createUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    switch (true) {
      case !name:
        return res.json({
          message: "Name is reqired !",
        });
      case !email:
        return res.json({
          message: "Email is reqired !",
        });
      case !password:
        return res.json({
          message: "Password is reqired !",
        });
      case !phone:
        return res.json({
          message: "Phone is reqired !",
        });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
    });

    await newUser.save();

    if (newUser) {
      res.status(201).json({
        success: true,
        message: "User created successfully !",
        newUser,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "User not created!",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const readAllUser = async (req, res) => {
  try {
    const allUser = await User.find();

    if (allUser.length > 0) {
      res.json({
        success: true,
        message: "Users found successfully !",
        allUser,
      });
    } else {
      res.json({
        success: false,
        message: "Users not found!",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// export const readOneUser = async (req, res) => {
//   try {
//     const user = await User.findById("66ab8f25fd09f2bfdc50aad7");

//     res.json(user);
//   } catch (error) {
//     console.log(error);
//   }
// };

export const readOneUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);

    res.json(user);
  } catch (error) {
    console.log(error);
  }
};

export const readOneUserByName = async (req, res) => {
  try {
    const user = await User.find({ phone: 1234567890 });

    res.json(user);
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (req, res) => {
  try {
    const userID = req.params.userId;

    const updatedUser = await User.findByIdAndUpdate(userID, req.body);

    if (updatedUser) {
      res.status(200).json({
        success: true,
        message: "User updated successfully !",
        updateUser,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userID = req.params.userId;

    await User.findByIdAndDelete(userID);

    res.json({
      message: "User deleted Successfully",
    });
  } catch (error) {
    console.log(error);
  }
};
