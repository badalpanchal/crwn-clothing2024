// import { useEffect } from 'react';
// import {getRedirectResult} from 'firebase/auth'

import SignupForm from '../../components/sign-up-form/sign-up-form.component.jsx';
import {signInWithGooglePopup, auth ,signInWithGoogleRedirect, createUserDocFromAuth} from '../../utils/firebase/firebase.utils.js'

const SignIn = () => {

    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // useEffect(async ()=>{
    //     const response = await getRedirectResult(auth);
    //     if(response){
    //         const userDocRef = await createUserDocFromAuth(response.user);
    //     }
    // },[])

    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocFromAuth(user);
    }

    // const logGoogleRedirectUser = async () => {
    //     const {user} = await signInWithGoogleRedirect();
    //     console.log({user});
    //     //const userDocRef = await createUserDocFromAuth(user);
    // }

    return (
        <div>
            <h1> Sign In Page</h1>
            <button onClick={logGoogleUser}>Sign In with Google Redirect</button>
            <SignupForm/>
        </div>
    )
}

export default SignIn;