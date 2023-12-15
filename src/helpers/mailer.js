import { CourierClient } from "@trycourier/courier";
import { generateToken }  from "./auth.js"

const domain = process.env.DOMAIN
const appEmail = process.env.APP_EMAIL

const sendEmailMessage = async (recipientEmail, data, template ) => {

    let isMessageSent = false
  
      try {
  
        const courier = CourierClient({ authorizationToken: process.env.COURIER_AUTH_TOKEN });
  
        const { requestId } = await courier.send({
          message: {
            to: {
              email: recipientEmail,
            },
            template: template,
            data: data,
          },
        });
  
        if(requestId){
          isMessageSent = true
        }
  
      } catch (error) {
        console.log(error)
      }   
      return { isMessageSent }
        
  }

export const identityVerificationEmailRequest = async (user, form, identityId) => {
    let isRequestSent;
      try {
          const token = await generateToken({user: user, tokenType: "identity_verification"})
          const data = {
            email: appEmail,
            approveLink: `${domain}/api/users/identity_verification/feedback/$}/${token}/?feedback=${"approve"}`,
            rejectLink: `${domain}/api/users/identity_verification/feedback/${identityId}/${token}/?feedback=${"reject"}`,
            imageLink: form.identityVerificationIdCard,
            videoLink: form.identityVerificationVideo,
            userName: `${user.firstName} ${user.lastName}`,
            userEmail: user.email,
          }
          const template = "1CYES1RYN5M5SVKT5E9S323G04VZ"
          const { isMessageSent } = await sendEmailMessage (appEmail, data, template )
          isRequestSent = isMessageSent
  
      } catch (error) {
          console.log(error)
          isRequestSent = false
      }
      return { isMessageSent: isRequestSent }
}

export const identityVerificationApprove = async (user) => {
    let isRequestSent;
      try {
          const data = {
            email: user.email,
            userName: `${user.firstName}`,
            btnLink: `${frontend_url}/add_listing`
          }
          const template = "W149287RQ0M2Q4QA2MTB7EKGM023"
          const { isMessageSent } = await sendEmailMessage(user.email, data, template )
          isRequestSent = isMessageSent
  
      } catch (error) {
          console.log(error)
          isRequestSent = false
      }
      return { isMessageSent: isRequestSent }
}

export const identityVerificationReject = async (user) => {
  let isRequestSent;
    try {
        const data = {
          email: user.email,
          userName: `${user.firstName}`,
          btnLink: `${frontend_url}/identity_verification`
        }
        const template = "EPJA3FJ9RTMP6XQH3ZYZRZEFP1DZ"
        const { isMessageSent } = await sendEmailMessage (user.email, data, template )
        isRequestSent = isMessageSent

    } catch (error) {
        console.log(error)
        isRequestSent = false
    }
    return { isMessageSent: isRequestSent }
}

export const sendConfirmationEmail = async (email, name) => {
      let isRequestSent;
      try {
          const user = {
            _id: "user._id",
            email: "emakuneyi2016@gmail.com",
            role:  "user.role",
        }

        const token = generateToken(user, "1d")
          const data = {
            email: appEmail,
            approveLink: `${domain}/api/users/identity_verification/feedback/${token}/?feedback=${"approve"}`,
            rejectLink: `${domain}/api/users/identity_verification/feedback/${token}/?feedback=${"reject"}`,
            imageLink: "ddd",
            videoLink: "ddd",
            userName: `${name} ${name}`,
            userEmail: email,
          }
          const template = "1CYES1RYN5M5SVKT5E9S323G04VZ"
          const { isMessageSent } = await sendEmailMessage (appEmail, data, template )
          isRequestSent = isMessageSent
  
      } catch (error) {
          console.log(error)
          isRequestSent = false
      }
      console.log({ isMessageSent: isRequestSent })
      return { isMessageSent: isRequestSent }
}
  
  export const sendPasswordResetEmail = async (email,name, confirmationCode) => {
    let isPasswordMessageSent;
      try {
        const subject = "SURPLUSWAP: Reset your password"
          const body = "It is very common for users to forget their passwords. Click on the button below to reset your password"
          const btnLink = `${frontend_url}user/confirm/token/${confirmationCode}/?type=password_reset`
          const btnText = "Reset Password"
          const { isMessageSent } = await sendEmailMessage (email, subject, body, name, btnLink, btnText )
  
          isPasswordMessageSent = isMessageSent
      } catch (error) {
          console.log(error)
          isPasswordMessageSent = false
      }
      return { isMessageSent: isPasswordMessageSent }
    }