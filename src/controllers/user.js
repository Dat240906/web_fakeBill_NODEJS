import { userRepository } from "../repositories/index.js";
import { statusCode } from "../utils/index.js";

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const response = await userRepository.login({ username, password });

        if (!response.success) {
            return res.status(statusCode.OK).json({
                success: false,
                message: response.message,
                redirect: null,
            });
        }

        res.cookie('token', response.token, { httpOnly: true, secure: true });

        return res.status(statusCode.OK).json({
            success: true,
            message: 'Đăng nhập thành công',
            redirect: '/test',
        });
    } catch (error) {
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'An error occurred during login',
            redirect: null,
        });
    }
}

const register = async (req, res) => {
    try {
        const { username, password } = req.body;
        const response = await userRepository.register({ username, password });

        if (!response.success) {
            return res.status(statusCode.BAD_REQUEST).json({
                success: false,
                message: response.message,
                redirect: null,
            });
        }

        res.cookie('token', response.token, { httpOnly: true, secure: true });

        return res.status(statusCode.OK).json({
            success: true,
            message: 'Registration successful',
            redirect: '/test',
        });
    } catch (error) {
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'An error occurred during registration',
            redirect: null,
        });
    }
}

const getdata = async (req, res) => {
    res.send('get data successfully');
}

export default {
    login,
    register,
    getdata,
};
