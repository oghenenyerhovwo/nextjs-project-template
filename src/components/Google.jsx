import { useGoogleLogin  } from '@react-oauth/google';
import axios from "axios"

// css
// import styles from "./google.module.css"

const Google = props => {
    const {setMessage} = props
    const login = useGoogleLogin({
            onSuccess: async codeResponse => {
            const credential = {token: codeResponse.access_token, type: "access_token"}
            const response = await axios.post("/api/users/auth/google", { credential } );
            setMessage(response.message)
        },
            onError: error => {
            console.log(error);
            console.log(errorMessage)
        },
    })

    return (
        <button onClick={() => login()}>Sign in with Google 🚀</button>
    )
}

export default Google