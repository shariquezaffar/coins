import { success, notFound } from '../../services/response/'
// import { sendMail } from '../../services/sendgrid'
import { PasswordReset } from '.'
import { User } from '../user'

const nodemailer = require('nodemailer')

export const create = ({ bodymen: { body: { email, link } } }, res, next) =>
  User.findOne({ email })
    .then(notFound(res))
    .then((user) => user ? PasswordReset.create({ user }) : null)
    .then((reset) => {
      if (!reset) return null
      const { user, token } = reset
      link = `${link.replace(/\/$/, '')}/${token}`
      const content = `
        Hey, ${user.name}.<br><br>
        You requested a new password for your task account.<br>
        Please use the following link to set a new password. It will expire in 1 hour.<br><br>
        <a href="${link}">${link}</a><br><br>
        If you didn't make this request then you can safely ignore this email. :)<br><br>
        &mdash; task Team
      `
      let transporter = nodemailer.createTransport({
        service : 'Gmail',
        auth : {
          user : 'akhtarafroz03@gmail.com',
          pass : 'gandhi123'
        }
      })
      

      let mailOptions = {
        to : user.email ,
        subject : 'password reset',
        html : `${content}`
      }
      
      // link = http://localhost:9000/api/password-resets/
      // return sendMail(mailOptions)
      transporter.sendMail(mailOptions, (error, info)=>{
        if (error) {
             console.log(error)
             return 

        }
        // return res.send('success')       
    });
    })
    .then((user) => res.send('email verify'))
    // .then((response) => response ? res.status(response.statusCode).end() : null)
    .catch(next)

export const show = ({ params: { token } }, res, next) =>
  PasswordReset.findOne({ token })
    .populate('user')
    .then(notFound(res))
    .then((reset) => reset ? reset.view(true) : null)
    .then(success(res))
    .catch(next)

export const update = ({ params: { token }, bodymen: { body: { password } } }, res, next) => {
  return PasswordReset.findOne({ token })
    .populate('user')
    .then(notFound(res))
    .then((reset) => {
      if (!reset) return null
      const { user } = reset
      return user.set({ password }).save()
        .then(() => PasswordReset.remove({ user }))
        .then(() => user.view(true))
    })
    .then(success(res))
    .catch(next)
}

