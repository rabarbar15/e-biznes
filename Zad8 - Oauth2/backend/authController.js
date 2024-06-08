const { User } = require('./model')
const jwt = require('jsonwebtoken')
// const bcrypt = require('bcrypt')

const handleErrors = (err) => {
    let errors = {  email: '', password: '' }

    if (err.message.includes('Validation error')) {
        Object.values(err.errors).forEach(error => {
            errors[error.path] = error.message
            console.log(errors);
        })
    }

    if (err.message.includes('Incorrect password')) {
        errors.password = 'Incorrect password'
    }

    if (err.message.includes('User not found')) {
        errors.email = 'User not found'
    }

    return errors
}

const maxAge = 3 * 24 * 60 * 60

const createToken = (id) => {
    return jwt.sign({ id }, 'my big secret', { 
        expiresIn: maxAge
    })
}

exports.signup = async (req, res) => {

    try {
        const { email, password } = req.body;

        if ( !email || !password) {
            return res.status(400).json({ error: 'Wszystkie pola są wymagane' });
        }

        console.log(email, password);

        const user = await User.create({
            email: email,
            password: password
        })
        // console.log(user.id);
        const token = createToken(user.id)
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000})

        res.status(201).json({ user: user.id })

    } catch (error) {
        console.log(error);
        const errors = handleErrors(error)
        console.error("Błąd przy rejestracji uzytkownika", errors)
        res.status(400).json({errors})
    }
}   


exports.signin = async (req, res) => {

    try {
        const { email, password} = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Wszystkie pola są wymagane' });
        }

        try {
            const user = await User.login(email, password)
            console.log(user)

            const token = createToken(user.id)
            res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000})

            res.status(201).json({ user: user.id })
        } catch (error) {
            console.log(error);
            const errors = handleErrors(error)
            res.status(400).json({errors})
        }

    } catch (error) {
        const errors = handleErrors(error)
        console.error("Błąd przy logowaniu uzytkownika", errors)
        res.status(400).json({errors})
    }
}

exports.authConfirm = (req, res) => {
    res.status(201).json({ auth: 'Signed in' })
}

exports.getUser = (req, res) => {

    const token = req.cookies.jwt

    if (token) {
        jwt.verify(token, 'my big secret', async (err, decodedToken) => {
            if (err) {
                res.status(401).json({ message: 'Unauthorized' });
   
            } else {
                let user = await User.findByPk(decodedToken.id)
                console.log('user id:', user.id)
                res.send(user)
            }
        })
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
}

exports.logout = (req, res) => {
    // replace jwt with a blank cookie
    res.cookie('jwt', '', { maxAge: 1 })
    res.send('Logged out')
}