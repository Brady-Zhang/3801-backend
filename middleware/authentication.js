//npm install jsonwebtoken
const jwt = require('jsonwebtoken');
const User = require('/Users/depengzhang/Documents/UQ/s2-2023/DECO3801/3801-backend/models/users.js');

const SECRET_KEY = "YOUR_SECRET_KEY"; // 通常不直接在代码中存储，而是在环境变量中

function authenticateJWT(req, res, next) {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1]; // Bearer <Token>

    if (!token) {
        return res.status(401).send({ status: 'error', message: 'Access token missing' });
    }

    jwt.verify(token, SECRET_KEY, async (err, decoded) => {
        if (err) {
            return res.status(401).send({ status: 'error', message: 'Invalid token' });
        }

        const userId = decoded.id;

        // 检查用户是否存在
        try {
            const user = await User.findById(userId);

            if (!user) {
                return res.status(401).send({ status: 'error', message: 'User not found' });
            }

            // 将用户的信息附加到 req.user 中
            req.user = user;

            next();
        } catch (error) {
            res.status(500).send({ status: 'error', message: 'Server Error' });
        }
    });
}

module.exports = authenticateJWT;
