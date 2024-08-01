import User from "../models/userModel.js";

export const createUser = async (req, res) => {
  try {
    const newUser = await User.create({
      name: "Nikhil",
      email: "nikuuu@gmail.com",
      password: "434ef",
      phone: 1234567890,
    });

    await newUser.save();

    res.json(newUser);
  } catch (error) {
    console.log(error.message);
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
