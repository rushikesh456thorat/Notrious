import User from "../../models/user.model.js";
import bcrypt from "bcrypt";
import generateTokenAndSetCookie from "../../utils/generateTokens.js";

const login = async (req, res) => {

    try {


        const { email, password } = req.body;


        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                status: 'fail',
                message: "Invalid credentials"
            });
        }

        if (user.authProvider === "google") {
            return res.status(401).json({
                status: 'fail',
                message: "Use Google Sign-In for this account"
            });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user?.password ?? "");


        if (!user || !isPasswordCorrect) {
            return res.status(400).json({
                status: 'fail',
                message: "Invalid Credentials"
            });
        }

        await generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            status: 'success',
            _id: user._id,
            email: user.email,

        });


    } catch (error) {
        console.log("Error in login controller", error.message)
        res.status(500).json({
            status: 'fail',
            message: "Internal server error"
        });
    }

};
export default login