import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (userId, res) =>{
    const notrious_jwt = jwt.sign({userId}, process.env.JWT_SECRET,
        {expiresIn: '15d'});

    res.cookie('notrious_jwt', notrious_jwt, {
        maxAge: 15*24*60*60*1000,
        httpOnly: false,
        sameSite: 'Lax',
        secure: false,
        path: '/',
    });
}

export  default generateTokenAndSetCookie;