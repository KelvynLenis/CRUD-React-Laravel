import { Link } from 'react-router-dom';
import { useState, createRef } from 'react';
import axiosClient from '../axios-client';
import { useStateContext } from '../contexts/ContextProvider';

export default function Signup() {

  const nameRef = createRef();
  const emailRef = createRef();
  const passwordRef = createRef();
  const passwordConfirmationRef = createRef();

  const [errors, setErrors] = useState(null);

  const { setUser, setToken } = useStateContext()

  const onSubmit = (e) => {
    e.preventDefault();

    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    }

    console.log(payload);
    axiosClient.post('/signup', payload)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
      })
      .catch(err => {
        console.log(err)
        const response = err.response;
        if(response && response.status === 422) {
          setErrors(response.data.errors);
        }
      })
  }

  return (
    
    <form onSubmit={onSubmit}>
      <h1 className="title">Signup for free</h1>

      { errors && <div className='alert'>
          {Object.keys(errors).map(key => (
            <p key={key}>{errors[key][0]}</p>
          ))}
        </div>
      }
      <input ref={nameRef} type="text" placeholder='Full Name' />
      <input ref={emailRef} type="email" placeholder='Email' />
      <input ref={passwordRef} type="password" placeholder='Password' />
      <input ref={passwordConfirmationRef} type="password" placeholder='Repeat Password' />
      <button className='btn btn-block'>Signup</button>
      <p className="message">
        Already have an account? <Link to='/login'>Sign in</Link>
      </p>
    </form>
  )
}
