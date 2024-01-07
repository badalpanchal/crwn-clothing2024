import { async } from "@firebase/util";
//import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { createAuthenticatedUserWithEmailAndPassword, createUserDocFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import '../form-input/form-input.styles.scss';
import './sign-up.styles.scss';
import '../custom-button/custom-button.component';
import Button from "../custom-button/custom-button.component";
 
const defaultFormFields = {
    displayName: '',
    email:'',
    password: '',
    confirmPassword:''
}


const SignupForm = () => {

    const [formFields,setFormFields] = useState(defaultFormFields);

    const {displayName, email, password, confirmPassword} = formFields;

    console.log(formFields);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleChange = (event) => {
        const {name,value } = event.target;

        setFormFields({...formFields,[name]:value});

    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(password !== confirmPassword){
            alert('passwords do not match');
            return;
        }

        try{
            const {user} = await createAuthenticatedUserWithEmailAndPassword(email,password);
            //console.log(response);
            await createUserDocFromAuth(user, { displayName });
            resetFormFields();

        } catch(error){
            if(error.code === 'auth/email-already-in-use'){
                alert('Cannot complete this request, Email is already in use');
            }
            else{
                console.log('User creation failed',error);
            }

            
        }


    }

  return (
    <div className="signup">
      <h2>Don't have an account yet?</h2>    
      <span> Signup with your email & password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='Display Name'
          type='text'
          required
          onChange={handleChange}
          name='displayName'
          value={displayName}
        />
        <FormInput
          label='Email'
          type='email'
          required
          onChange={handleChange}
          name='email'
          value={email}
        />
        <FormInput
          label='Password'
          type='password'
          required
          onChange={handleChange}
          name='password'
          value={password}
        />
        <FormInput
          label='Confirm Password'
          type='password'
          required
          onChange={handleChange}
          name='confirmPassword'
          value={confirmPassword}
        />
        <Button buttonType='google' type='submit'>Sign Up</Button>
      </form>
    </div>
  );
};

export default SignupForm;
