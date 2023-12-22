import { GoogleLogin  } from '@react-oauth/google';
import axios from "axios"

// css
// import styles from "./google.module.css"

const OneTapGoogle = props => {
  const {setMessage} = props

  const handleSuccess = async credentialResponse => {
    const credential = {token: credentialResponse.credential, type: "credential"}
    const response = await axios.post("/api/users/auth/google", { credential } );
    setMessage(response.message)
  }

  const handleFailure = error => {
    console.log(error);
    console.log(errorMessage)
  }

  return (
    <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleFailure}
        useOneTap
    />
  )
}

export default OneTapGoogle