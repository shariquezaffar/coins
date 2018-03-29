import { User } from '../../api/user'
const twoAuth = require('node-2fa')

export const twoFactor = (email) => {
    var newSecret = twoAuth.generateSecret({
        name : 'authen',
        account : email
    })
}

export const twoFactorAuth = (req,res,next)=>{
    const id = req.params.id
    User.findById(id)
    .then(notFound(res))
    .then((User)=>{
        const secretTest = user.twoFactor.secret
        if(twoAuth.generateToken(secretTest).token === req.headers['otp']){
            next()
        } else {
            res.send('OTP is not valid')
        }
    })
    .then(success(res))
    .catch(next)
}