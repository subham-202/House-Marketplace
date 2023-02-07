import React from 'react'
import { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import {getAuth,createUserWithEmailAndPassword,updateProfile} from 'firebase/auth'
import {db} from '../firebase.config'
import {toast} from 'react-toastify'
import { setDoc, doc, serverTimestamp } from 'firebase/firestore'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import vissibilityIcon from '../assets/svg/visibilityIcon.svg'
function SignUp() {
  const [showPassword,setShowPassword]=useState(false)
  const [formData,setFormData]=useState({
    name:'',
    email:'',
    password:''
  })
  const {name,email,password}=formData;
  const navigate=useNavigate();
  const onChange=(e)=>{
    setFormData((prevState)=>({
      ...prevState,
      [e.target.id ]:e.target.value
    }))
  }
  const onSubmit= async (e)=>{
    e.preventDefault();
    try{
      const auth =getAuth()
      const userCredentials= await createUserWithEmailAndPassword
      (auth,email,password);
      const user=userCredentials.user;
      updateProfile(auth.currentUser, {
        displayName:name,
      })
      const formDataCopy={...formData}
      delete formDataCopy.password
      formDataCopy.timestamp=serverTimestamp()

      await setDoc(doc(db,'users',user.uid),formDataCopy)

      navigate('/')
    }catch(error){
      toast.error('Something Went Wrong With Registration')
    }
  }
  return (
    <>
    <div className="pageContainer">
      <header>
      <p className="pageHeader">
        WelcomeBack!
      </p>
      </header>
        <form onSubmit={onSubmit}>
          <input type="text" className='nameInput' 
          placeholder='Name' id='name' value={name} onChange={onChange}
          />
          <input type="text" className='emailInput' 
          placeholder='email' id='email' value={email} onChange={onChange}
          />
          <div className="passwordInputDiv">
            <input type={showPassword?"text":'password'}
            className='passwordInput' placeholder='Password' id='password'
            value={password} onChange={onChange}
            />
            <img src={vissibilityIcon} alt="show Password" className='showPassword'onClick={() => setShowPassword((prevState) => !prevState)} />
          </div>
          <Link to='/forgot-password' className='forgotPasswrdLink'>
            ForgotPassword
          </Link>
          <div className='signUpBar'>
            <p className='signUpText'>Sign UP</p>
          <button className='signUpButton'>
            <ArrowRightIcon fill='white' width='34px' height='34px'/>
          </button>
          </div>
        </form>
        {/* Google OAuth */}
        <Link to='/sign-in' className='registerLink'>
          Sign In Instead
        </Link>
    </div>
    </>
  )
}

export default SignUp
