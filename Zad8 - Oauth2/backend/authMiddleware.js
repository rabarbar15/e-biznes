const jwt = require('jsonwebtoken')
const { User } = require('./model')

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt

    if (token) {
        jwt.verify(token, 'my big secret', (err, decodedToken) => {
            if (err) {

                res.status(401).json({ message: 'Unauthorized' });
            } else {

                next();
            }
        })
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
}


module.exports = { requireAuth }