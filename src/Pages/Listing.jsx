import { useState,useEffect } from "react"
import {Link,useNavigate,useParams} from 'react-router-dom'
import { getDoc } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import { db } from "../firebase.config"
import Spinner from "../Components/Spinner"
import shareIcon from '../assets/svg/shareIcon.svg'
function Listing() {
  return (
    <div>
      Listing
    </div>
  )
}

export default Listing
