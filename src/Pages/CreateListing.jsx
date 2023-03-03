import { useState,useEffect,useRef } from "react"
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import Spinner from '../Components/Spinner';
import { useNavigate } from "react-router-dom";
function CreateListsing() {
  const [geolocationEnabled,setGeolocationEnabled]=useState(false);
  const[loading,setLoading]=useState(false);
  const [formData,setformData]=useState({
    type: 'rent',
    name: '',
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    furnished: false,
    address: '',
    offer: false,
    regularPrice: 0,
    discountedPrice: 0,
    images: {},
    latitude: 0,
    longitude: 0,
  })
  const auth =getAuth();
  const navigate =useNavigate();
  const isMounted=useRef(true);
  useEffect(()=>{
    if(isMounted){
      onAuthStateChanged(auth,(user)=>{
        if(user){
        setformData({...formData,useRef:user.uid})
      }
      else{
        navigate('/sign-in')
      }
      })
    }
    return()=>{
      isMounted.current = false;
    }
  },[isMounted])
   if(loading){
    return(
      <Spinner/>
    )
   }

  return (
    <div>
        Create
    </div>
  )
}

export default CreateListsing
