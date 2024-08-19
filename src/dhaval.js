// ==>users.controller.js
// const Users = require('../model/users.model');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

// const createToken = async (id) => {
//     try {
//         const user = await Users.findById(id);

//         if (!user) {
//             throw new Error("User not found");
//         }

//         const accessToken = jwt.sign(
//             { _id: user._id, role: user.role },
//             'fshjkjhjkas4578ghks',
//             { expiresIn: '1h' }
//         );

//         const refreshToken = jwt.sign(
//             { _id: id },
//             'djkjkkj4679hbjjk',
//             { expiresIn: '2d' }
//         );

//         user.refreshToken = refreshToken;
//         await user.save({ validateBeforeSave: false });

//         return { accessToken, refreshToken };
//     } catch (error) {
//         console.log(error.message);
//         throw error;
//     }
// };

// const ragister = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         const user = await Users.findOne({ email });

//         if (user) {
//             return res.status(409).json({
//                 success: false,
//                 message: "User already exists"
//             });
//         }

//         const hashPassword = await bcrypt.hash(password, 10);
//         const userData = await Users.create({ ...req.body, password: hashPassword });

//         if (!userData) {

//             return res.status(500).json({
//                 success: false,
//                 message: "Error creating user"
//             });
//         }

//         const userDataF = await Users.findById(userData._id).select("-password");

//         res.status(201).json({
//             success: true,
//             message: "Registered successfully",
//             data: userDataF
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: "Internal server error: " + error.message
//         });
//     }
// };

// const login = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         const user = await Users.findOne({ email });

//         if (!user) {
//             return res.status(404).json({
//                 success: false,
//                 message: "User not found"
//             });
//         }

//         const validPassword = await bcrypt.compare(password, user.password);

//         if (!validPassword) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Invalid credentials"
//             });
//         }

//         const { accessToken, refreshToken } = await createToken(user._id);

//         const options = {
//             httpOnly: true,
//             secure: true
//         };

//         const userDataF = await Users.findById(user._id).select("-password -refreshToken");

//         res.status(200)
//             .cookie("accessToken", accessToken, options)
//             .cookie("refreshToken", refreshToken, options)
//             .json({
//                 success: true,
//                 message: "Login successful",
//                 data: { ...userDataF.toObject(), accessToken }
//             });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: "Internal server error: " + error.message
//         });
//     }
// };

// const generateNewTokens = async (req, res) => {
//     try {
//         console.log(req.cookies.refreshToken);

//         const VerifyToken = await jwt.verify(req.cookies.refreshToken,  'djkjkkj4679hbjjk');
//         console.log(VerifyToken);

//         if (!VerifyToken) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Invalid Token"
//             })
//         }

//         const user = await Users.findById(VerifyToken._id);
//         console.log(user);

//         if (!user) {
//             return res.status(400).json({
//                 success: false,
//                 message: "User Not Define"
//             })
//         }

//         if (req.cookies.refreshToken != user.toObject().refreshToken) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Invalid Token"
//             })
//         }

//         const { accessToken, refreshToken } = await craeteToken(user._id)

//         console.log({ accessToken, refreshToken });

//         const option = {
//             httpOnly: true,
//             secure: true
//         }

//         res.status(200)
//             .cookie("accessToken", accessToken, option)
//             .cookie("refreshToken", refreshToken, option)
//             .json({
//                 success: true,
//                 message: "Refresh Token Sucessfully",
//                 data: {
//                     accessToken
//                 }
//             })

//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: "internal server error" + error.message
//         })
//     }
// }
// module.exports = {
//     ragister,
//     login,
//     generateNewTokens
// };


// ==>users.routes.js
// const express = require('express');
// const { usersController } = require('../../../controller');




// const routes = express.Router();

// routes.post(
//     '/register',
//     usersController.ragister
// )

// routes.post(
//     '/login',
//     usersController.login
// )

// routes.post(
//     '/generateNewTokens',
//     usersController.generateNewTokens
// )


// module.exports = routes;


// ==>users.model.js
// const mongooes = require("mongoose");

// const usersSchema = new mongooes.Schema(
//     {
//         name: {
//             type: String,
//             required: true,
//             trim: true,
//             lowercase: true
//         },
//         email: {
//             type: String,
//             unique: true,
//             trim: true,
//             required: true
//         }, 
//         password: {
//             type: String,
//             trim: true,
//             required: true
//         },
//         role: {
//             type: String,
//             trim: true,
//             required: true
//         },
//         refreshToken : {
//             type: String,
//             // required: true
//         },
//         isActive: {
//             type: Boolean,
//             default: true
//         }
//     },
//     {
//         timestamps: true,
//         versionKey: false
//     }
// );

// const Users = mongooes.model("Users", usersSchema);
// module.exports = Users;

// error solve and rewrite a code