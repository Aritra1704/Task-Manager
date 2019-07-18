const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    const body = {
        to: email,
        from: 'aritra1704@gmail.com',
        subject: 'Thanks for joining',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`,
        html: `<strong>Welcome to the app, ${name}. Let me know how you get along with the app.</strong>`,
    }

    sgMail.send(body)
}

const sendCancellationEmail = (email, name) => {
    const body = {
        to: email,
        from: 'aritra1704@gmail.com',
        subject: 'Sorry to see you leave',
        text: `Good bye  ${name}, sorry for not being up to your expectation. Let me know how we can improve.`,
        html: `<strong>Good bye  ${name}, sorry for not being up to your expectation. Let me know how we can improve.</strong>`,
    }

    sgMail.send(body)
}

module.exports = {
    sendWelcomeEmail,
    sendCancellationEmail
}
// const msg = {
//     to: 'aritrarpal@gmail.com',
//     from: 'aritra1704@gmail.com',
//     subject: 'First try',
//     text: 'Let\'s see if it reaches you.',
//     html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// }

// sgMail.send(msg)
