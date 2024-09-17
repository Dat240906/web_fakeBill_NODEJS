import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import { userRouter } from './routes/index.js';
import connectDB from './database/database.js';
import cookieParser from 'cookie-parser';
import checkToken from './authentication/auth.js';
connectDB()

// Đường dẫn của tệp hiện tại
const __filename = fileURLToPath(import.meta.url);

// Đường dẫn của thư mục hiện tại
const __dirname = path.dirname(__filename);
const app = express()


app.use(cookieParser());
// config get data req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(checkToken)
app.use('/resources', express.static(path.join(__dirname, 'resources')));
// Sử dụng __dirname để cấu hình views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', "ejs");



// ROUTEs
app.use('/auth', (req, res) => res.render('auth'))
app.use('/user', userRouter)
app.use('/home', (req, res) => res.render('home'))
app.use('/test', (req, res) => res.render('mbbank'))
// Khởi động server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});