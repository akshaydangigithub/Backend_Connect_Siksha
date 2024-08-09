import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

export const userSignIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password required !",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found !",
      });
    }

    const isMatched = bcrypt.compareSync(password, user.password);

    if (isMatched) {
      const token = jwt.sign({ id: user._id }, "secretPass", {
        expiresIn: "1h",
      });

      res.status(200).json({
        success: true,
        message: "User found successfully !",
        token,
        id: user._id,
      });
    } else {
      res.status(200).json({
        success: false,
        message: "Invalid credentials !",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const checkToken = async (req, res) => {
  try {
    var authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(400).json({
        success: false,
        message: "Authorization required !",
      });
    }

    var token = authHeader.split(" ")[1];
    const decode = jwt.verify(token, "secretPass");

    if (!decode) {
      return res.status(400).json({
        success: false,
        message: "Authorization failed !",
      });
    } else {
      const user = await User.findById(decode.id);

      if (!user) {
        return res.status(400).json({
          success: false,
          message: "Authorization failed !",
        });
      } else {
        res.status(200).json({
          success: true,
          message: "Valid token",
          userID: user._id,
        });
      }
    }
  } catch (error) {
    if (error === "JsonWebTokenError") {
      return res.status(400).json({
        success: false,
        message: "invalid token",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Your token is expired or invalid",
      });
    }
  }
};
