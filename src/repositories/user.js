import { UserModel } from "../models/index.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'

//config dotenv 

dotenv.config()


const login = async ({username, password}) => {
    const user = await UserModel.findOne({username}).exec()
    // check notexistUser
    if (!user) {
        return {
            success: false,
            message: 'Tài khoản không tồn tại trên hệ thống',
        }
    }
    const passwordHashedInDB = user.password 
    const isValidPassword = await bcrypt.compare(password, passwordHashedInDB)
    if (!isValidPassword) {
        return {
            success: false,
            message: 'Tài khoản hoặc mật khẩu không chính xác',
        }
    }
    // do this 
    // create jsonWebToken User
    const token = jwt.sign({
        user
    }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    })
    return {
        success: true,
        token,
    }
}


const register = async ({username, password}) => {
    // do this
    const user = await UserModel.findOne({username}).exec()
    // check notexistUser
    if (user) {
        return {
            success: false,
            message: 'User exists',
        }
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new UserModel({
        username,
        password: hashedPassword,
    })
    await newUser.save()

    //create jsonWebToken
    const token = jwt.sign({
        data:newUser,
    }, 
        process.env.JWT_SECRET,
        {
            expiresIn: '7d',
        }
    )

    return  {
        success: true,
        message: 'User registered successfully',
        token: token
    }

}



export default {
    login,
    register,
}