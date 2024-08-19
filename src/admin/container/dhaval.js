
// const Users = require("../model/users.model");
// const bcrypt = require('bcrypt');

// const register = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         const user = await Users.findOne({ email });
//         if (user) {
//             return res.status(400).json({ msg: "Email already used" });
//         }

      
//         const hashedPassword = await bcrypt.hash(password, 10);

 
//         const newUser = await Users.create({ email, password: hashedPassword });

//         if (!newUser) {
//             return res.status(500)
//             .json({ error: "Failed to create user" });
//         }

        
//         const userData = await Users.findById(newUser._id);

//         if (!userData) {
//             return res.status(500)
//             .json({ error: "Failed to fetch user data" });
//         }

       
//         return res.status(201).json(userData);

//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: "Internal server error: " + error.message
//         });
//     }
// };

// module.exports = {
//     register,
// };


// {
//     "success": false,
//     "message": "Internal server error: Users validation failed: name: Path `name` is required."
// }

