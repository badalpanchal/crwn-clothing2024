import { useState, useContext } from 'react';
import Button from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';
import {
  createAuthenticatedUserWithEmailAndPassword,
  createUserDocFromAuth,
} from '../../utils/firebase/firebase.utils';

import { UserContext } from '../../contexts/user.context';

import './sign-up.styles.scss';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignupForm = () => {
  const [formFields, setFormFields] = useState(
    defaultFormFields,
  );

  const { displayName, email, password, confirmPassword } =
    formFields;

//  const {setCurrentUser} = useContext(UserContext);  
  // console.log('hit');  

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('passwords do not match');
      return;
    }

    try {
      const { user } =
        await createAuthenticatedUserWithEmailAndPassword(
          email,
          password,
        );
      //console.log(response);
      //setCurrentUser(user);
      await createUserDocFromAuth(user, { displayName });
      resetFormFields();
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert(
          'Cannot complete this request, Email is already in use',
        );
      } else {
        console.log('User creation failed', error);
      }
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className='signup-container'>
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
        <Button type='submit'>Sign Up</Button>
      </form>
    </div>
  );
};

export default SignupForm;
