import React, { useState } from 'react'
import UserInfo from './UserInfo'
import Buttons from './Buttons'
import Content from './Content'
import { auth, db } from '../../firebase/config'
import DropDown from './DropDown'
import {doc,deleteDoc,updateDoc,arrayUnion, arrayRemove} from "firebase/firestore"
import { toast } from 'react-toastify'
import EditMode from './EditMode'





const index = ({tweet,i}) => {
const [isEditMode,setIsEditMode]=useState(false)

const handleDelete = ()=>{
 const tweetRef= doc(db,"tweets", tweet.id);
 
 deleteDoc(tweetRef)
 .then(()=>toast.warn("Tweet akıştan kaldırıldı"))
 .cathc(()=>toast.error("Tweet silinirken hata oluştu"))


}
const handleEdit = () =>{
  setIsEditMode(true)
}

 const isLiked= tweet.likes.includes(auth.currentUser.uid)

  const toggleLike = async () =>{
  const tweetRef= doc(db,"tweets", tweet.id);
 await  updateDoc(tweetRef,{
    likes: isLiked 
    ? arrayRemove(auth.currentUser.uid)
    : arrayUnion(auth.currentUser.uid)
  })
  }

  return (
    <div className='flex gap-3 border-b py-6  px-3 border-zinc-600' > 
      <img className='w-12 h-12 rounded-full' src={tweet.user.photo}  />

      <div className='w-full'>
        <div className='flex justify-between items-center '>
        <UserInfo tweet={tweet}/>
        {auth.currentUser.uid === tweet.user.id &&  <DropDown handleDelete={handleDelete} handleEdit={handleEdit}/>   
        }
        </div>

        {isEditMode ?  <EditMode tweet={tweet} close={()=>setIsEditMode(false)} /> : <Content tweet={tweet}/>}

        
        <Buttons isLiked={isLiked} likeCount={tweet.likes.length} toggleLike={toggleLike} />
      </div>
    </div>
  )
}

export default index
