import User from "../../models/user.model.js";
import bcrypt from "bcrypt";
import generateTokenAndSetCookie from "../../utils/generateTokens.js";
import PageCollection from "../../models/pagecollection.model.js";

const signup = async (req, res) => {
    try {
        const { email, password, confirmPassword } = req.body;

        if (!email || !password || !confirmPassword) {
            return res.status(400).json({
                status: 'fail',
                message: "Please fill all the fields"
            })
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                status: 'fail',
                message: "Passwords do not match"
            })
        }



        const isEmail = await User.findOne({ email });

        if (isEmail) {
            return res.status(400).json({
                status: 'fail',
                message: isEmail.authProvider === 'google'
                    ? 'Email already registered with Google Sign-In. Use Google login.'
                    : 'User already exists with this email.'
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);


        let collection;
        try {
            collection = await PageCollection.create({});
        } catch (collectionError) {
            console.error("Error creating PageCollection:", collectionError);
            return res.status(500).json({
                status: 'error',
                message: "Failed to create user's page collection."
            });
        }

        if (!collection) {
            res.status(400).json({
                status: 'fail',
                message: "Internal server error"
            })
        }

        const newUser = new User({
            email,
            password: hashPassword,
            pages: collection._id,
            authProvider: "local"
        });

        if (newUser) {

            await newUser.save();
            generateTokenAndSetCookie(newUser._id, res);

            res.status(201).json({
                _id: newUser._id,
                email: newUser.email,

            });
        } else {
            res.status(400).json({
                status: 'fail',
                message: "Invalid User Data"
            })
        }


    } catch (error) {
        console.log("Error in signup controller", error.message)
        res.status(400).json({
            status: 'fail',
            message: "Internal server error"
        });
    }
};
export default signup