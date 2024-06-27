const jwt = require('jsonwebtoken')
const { User } = require('../model')

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

const checkUser = (req, res, next) => {
    const token = req.cookies.jwt

    if (token) {
        jwt.verify(token, 'my big secret', async (err, decodedToken) => {
            if (err) {
                res.status(401).json({ message: 'Unauthorized' });
                res.locals.user = null;
                next()
            } else {
                // console.log('jwt', decodedToken);
                let user = await User.findByPk(decodedToken.id)
                console.log('user id:', user.id)
                res.locals.user = user;
                next();
            }
        })
    } else {
        res.locals.user = null;
        next();
    }
} 

module.exports = { requireAuth, checkUser }