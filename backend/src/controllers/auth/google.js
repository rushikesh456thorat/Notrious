import PageCollection from "../../models/pagecollection.model.js";
import User from "../../models/user.model.js";
import generateTokenAndSetCookie from "../../utils/generateTokens.js";
import { OAuth2Client } from "google-auth-library";

export const googleAuth = async (req, res) => {
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

    const { token } = req.body;

    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const { sub, email } = payload;

        let user = await User.findOne({ googleId: sub });
        let collection;
        if (!user) {
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
               return res.status(400).json({
                    status: 'fail',
                    message: "Internal server error"
                })
            }
            user = await User.create({
                googleId: sub,
                email,
                pages: collection._id,
                authProvider: "google",
                password: `${email}@google`,
            });
            await user.save();

        }
        await generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            status: 'success',
            _id: user._id,
            email: user.email,

        });
    } catch (err) {
        console.error("Google sign-in error:", err);
        res.status(401).json({ success: false, message: "Invalid token" });
    }
}

