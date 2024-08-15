import { BsCardImage } from "react-icons/bs";
import { toast } from 'react-toastify';
import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { db, storage } from '../../firebase/config';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import React, { useState } from "react";
import Loader from "../Loader";




const Form = ({ user }) => {
    const [isLoading,setIsLoading]=useState(false)

    const tweetsCol = collection(db, "tweets")

    const uploadImage = async (file) => {
        
        if ( !file || !file?.type.startsWith('image')) return null;
        const imageRef = ref(storage, v4() + file.name)
        try {
            await uploadBytes(imageRef, file)
           return await getDownloadURL(imageRef)
        } catch(err){
            toast.error("Resmi yüklerken sorun oluştu");
            return null
        }

    }

    const handleSumbit = async (e) => {
        e.preventDefault();

        const text = e.target[0].value.trim();
        const file = e.target[1].files[0]

        
        if (!text && !file)
            return toast.info("Lütfen içerik giriniz", { position: "bottom-right" })

        setIsLoading(true)

        try{
        const url = await uploadImage(file);

        await addDoc(tweetsCol, {
            textContent: text,
            imageContent: url,
            createdAt: serverTimestamp(),
            likes: [],
            isEdited: false,
            user: {
                id: user.uid,
                name: user.displayName,
                photo: user.photoURL,
            }
        })}catch(err){
    
            toast.error("Tweet'i gönderirken bir hata oluştu")
        }
        

        setIsLoading(false)

        e.target.reset();

    }



    return (
        <form onSubmit={handleSumbit} className='flex border-b border-zinc-600 p-4 gap-3'>
            <img className='rounded-full h-[35px] md:h-[45px] mt-1' src={user?.photoURL} alt="" />

            <div className='w-full'>
                <input type="text" className='w-full mb-2 mt-1 bg-transparent outline-none md:text-lg' placeholder='neler oluyor?' />

                <div className='flex justify-between items-center'>
                    <label className='text-lg transition p-4 cursor-pointer rounded-full hover:bg-gray-800' htmlFor="icon">
                        <BsCardImage />
                        <input className='hidden' id='icon' type="file" />
                    </label>

                    <button className='bg-blue-600 flex items-center justify-center px-4 py-2  min-w-[85px] min-h-[40px] rounded-full transition hover:bg-blue-800'>
                        {isLoading ?<Loader/> : "Tweetle"}
                    </button>
                </div>
            </div>
        </form>
    )
}

export default React.memo(Form)
