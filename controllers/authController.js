import { StatusCodes } from "http-status-codes";
import { hashPassword, comparePassword } from "../utils/passwordUtils.js";
import User from '../models/UserModel.js'
import { UnauthenticatedError } from "../errors/customErrors.js";
import { createJWT } from "../utils/tokenUtils.js";

export const register = async (req, res) => {
    const isFirstAccount = (await User.countDocuments() === 0)
    req.body.role = isFirstAccount ? 'admin' : 'user'

    const hashedPassword = await hashPassword(req.body.password)
    req.body.password = hashedPassword

    const user = await User.create(req.body)
    res.status(StatusCodes.CREATED).json({ msg: 'user created' })
};

export const login = async (req, res) => {
    // Check if user exists
    const user = await User.findOne({ email: req.body.email })
    if (!user) throw new UnauthenticatedError('invalid credentials');

    //Check if password is correct
    const isPasswordCorrect = await comparePassword(
        req.body.password,
        user.password
    );
    if (!isPasswordCorrect) throw new UnauthenticatedError('invalid credentials');

    // const isValidUser = user && (await comparePassword(req.body.password, user.password))
    // if (!isValidUser) throw new UnauthenticatedError('invalid credz')

    //Frontend will store the token and then send to the backend to decode it
    //test at jwt.io to see what data/payload is associated with the token
    const token = createJWT({ userId: user._id, role: user.role })
    // res.json({ token })
    // console.log(token)

    //Represents milliseconds in a day
    const oneDay = 1000 * 60 * 60 * 24

    //Create a cookie
    res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === 'production'
    })
    res.status(StatusCodes.OK).json({ msg: 'user logged in' })



}

