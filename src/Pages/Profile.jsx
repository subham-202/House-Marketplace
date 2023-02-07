import { getAuth,updateProfile } from "firebase/auth"
import { useState,useEffect } from "react"
import { useNavigate,Link } from "react-router-dom"
import {updateDoc,doc} from 'firebase/firestore'
import { db } from "../firebase.config"
import { async } from "@firebase/util"
import { toast } from "react-toastify"
function Profile() {
  const auth=getAuth()
  const [changedDetails,setChangedDetails]=useState(false);
  const [formData,setFormData]=useState({
    name:auth.currentUser.displayName,
    email:auth.currentUser.email,
  })
  const { name, email } = formData
  const navigate=useNavigate();
  const onLogout = ()=>{
    auth.signOut();
    navigate('/')
  }
  const onSubmit= async()=>{
    try{
      if(auth.currentUser.displayName!=name){
        await updateProfile(auth.currentUser,{
          displayName:name
        })
        const userRef= doc(db,'users',auth.currentUser.uid)
        await updateDoc(userRef,{
          name
        })
      }
    }catch(error){
      toast.error('Could not update')
    }
  }
  const onChange=(e)=>{
    setFormData((prevState)=>({
      ...prevState,
      [e.target.id]:e.target.value
    }))
  }
  return <div className="profile">
    <header className="profileHeader">
    <p className="pageHeader">MyProfile</p>
    <button type="button" className="logOut" onClick={onLogout}>
      Logout
    </button>
    </header> 
    <main>
      <div className="profileDetailsHeader">
        <p className="profileDetailsText">
          PersonalDetails
        </p>
        <p className="changePersonalDetails" onClick={()=>{
          changedDetails && onSubmit()
          setChangedDetails((prevState)=>!prevState)
        }
        }>
          {changedDetails?'done':'change'}
        </p>
      </div>
      <div className="profileCard">
        <form >
          <input type="text" id="name" className={!changedDetails?'profileName':'profileNameActive'} disabled={!changedDetails} value={name} onChange={onChange}/>
          <input type="text" id="email" className={!changedDetails?'profileEmail':'profileEmailActive'} disabled={!changedDetails} value={email} onChange={onChange}/>
        </form>
      </div>
    </main>
  </div>
}

export default Profile
