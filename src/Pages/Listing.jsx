import { useState,useEffect } from "react"
import {Link,useNavigate,useParams} from 'react-router-dom'
import { getDoc,doc } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import { db } from "../firebase.config"
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'
import Spinner from "../Components/Spinner"
import shareIcon from '../assets/svg/shareIcon.svg'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y,Pagination]);
function Listing() {
    const [listing,setListing]=useState(null);
    const [loading,setLoading]=useState(false)
    const [sharedLinkCopied,setSharedLinkCopied]=useState(false);

    const navigate =useNavigate ();
    const params=useParams();
    const auth=getAuth()
    useEffect(() => {
    const fetchListing = async () => { 
      const docRef = doc(db, 'listings', params?.listingId)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        setListing(docSnap.data())
        setLoading(false)
      }
    }

    fetchListing()
  }, [navigate, params?.listingId])
  
  if (loading) {
    return <Spinner />
  }

    if(loading){
      return <Spinner/>
    }
    console.log(listing?.latitude,"ll");
    console.log(listing?.longitude,"ll");
  return (
    <main>
      {/* <Swiper slidesPerView={1} pagination={{ clickable: true }}>
        {listing?.imgUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <div
              style={{
                background: `url(${listing?.imgUrls[index]}) center no-repeat`,
                backgroundSize: 'cover',
              }}
              className='swiperSlideDiv'
            ></div>
          </SwiperSlide>
        ))}
      </Swiper> */}
      
     <div className="shareIconDiv"
      onClick={()=>{
      navigator.clipboard.writeText(window.location.href)
      setSharedLinkCopied(true);
      setTimeout(()=>{
      setSharedLinkCopied(false);
      },2000)
     }}
     >
      <img src={shareIcon} alt="" />
     </div>
     {sharedLinkCopied &&<p className="linkCopied">Link Copied!</p>}
     <div className="listingDetails">
      <p className="listingName">
        {listing?.name} - $
        {
        listing?.offer?
        listing.discountedPrice
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        :listing?.regularPrice
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        }
      </p>
      <p className="listingLocation">{listing?.location}</p> 
        <p className="listingType">
          For {listing?.type=='rent'?'Rent':'Sale'}
        </p>
        {listing?.offer && (
          <p className='discountPrice'>
            ${listing?.regularPrice - listing?.discountedPrice} discount
          </p>
        )}
        <ul className='listingDetailsList'>
          <li>
            {listing?.bedrooms > 1
              ? `${listing?.bedrooms} Bedrooms`
              : '1 Bedroom'}
          </li>
          <li>
            {listing?.bathrooms > 1
              ? `${listing?.bathrooms} Bathrooms`
              : '1 Bathroom'}
          </li>
          <li>{listing?.parking && 'Parking Spot'}</li>
          <li>{listing?.furnished && 'Furnished'}</li>
        </ul>
        <p className='listingLocationTitle'>Location</p>
         
         {<div className='leafletContainer'>
          <MapContainer
            style={{ height: '100%', width: '100%' }}
            center={listing ? [listing.longitude, listing.latitude] : [0, 0]}
            zoom={13}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url='https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png'
            />

          {listing && listing.latitude && listing.longitude && (
            <Marker position={[listing.latitude, listing.longitude]}>
              <Popup>{listing.location}</Popup>
            </Marker>
          )}
          </MapContainer>
        </div> }
        
        {auth.currentUser?.uid !== listing?.userRef && (
          <Link
            to={`/contact/${listing?.userRef}?listingName=${listing?.name}`}
            className='primaryButton'
          >
            Contact Landlord
          </Link>
        )}
     </div>
    </main>
  )
}

export default Listing

// https://stackoverflow.com/questions/67552020/how-to-fix-error-failed-to-compile-node-modules-react-leaflet-core-esm-pat