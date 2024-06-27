// const { Cart } = require('./model')

exports.createCartItem = async (req, res) => {
    try {
        res.cookie('session_id', '12345')
        res.status(200).json({ msg: 'Cookie' })
    } catch (error) {
        console.error("Błąd przy dodawaniu ksiąki do koszyka", error.message)
        res.status(500).send('Internal Server Error');
    }
}


exports.validateCookie = (req, res, next) => {
    const { cookies } = req;
    if ('session_id' in cookies) {
        console.log('session id exists');
        if (cookies.session_id === '12345') next()
        else res.status(403).send({ msg: 'Not Authenticated' })
        } else {
            res.status(403).send({ msg: 'Not Authenticated' })
        }
    // console.log(cookies);

}