import React, { useState } from 'react'
import { createUserWithEmailAndPassword ,sendPasswordResetEmail,signInWithEmailAndPassword, signInWithPopup} from 'firebase/auth'
import {auth,provider} from "../firebase/config"
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const [isSignUp, setIsSignUp] = useState(false)
    const [isError, setIsError] = useState(false)
    const  [email , setEmail] = useState("")
    const  [pass , setPass] = useState("")
    const navigate = useNavigate()


    const handleReset =() =>{
        sendPasswordResetEmail(auth,email)
        .then(()=> 
        toast.info("Şifre sıfırlama e-postası gönderildi. Lütfen Mailinizi kontrol edin"))
        .catch((err) => toast.error("Bir hata oluştu" + err.code))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

         console.log(email,pass)

        if (isSignUp) {
            createUserWithEmailAndPassword(auth , email ,pass)
            .then(()=>{
                toast.success("Hesabınız oluşturuldu");
                navigate("/home");
            })
            .catch((err) => {toast.error('Bir sorun oluştu: ' + err.code)});
        }
        else {
            signInWithEmailAndPassword(auth,email,pass)
            .then(()=>{
                toast.success("Hesaba giriş yapıldı");
                navigate("/home");
            })
            .catch((err) => {toast.error('Bir sorun oluştu: ' + err.code)
                if (err.code === 'auth/invalid-credential') setIsError(true)
            });
           
        }

    }

    const handleGoogle = (e) =>{
        signInWithPopup(auth,provider)
        .then(()=>{
            toast.success("hesaba giriş yapıldı");
            navigate("/home")
        })
        .catch((err) =>toast.error("hata olustu" + err.code))
    }

    return (
        <section className='h-screen grid place-items-center'>
            <div className='bg-black flex flex-col gap-10 py-16 px-32'>
                <div className='flex justify-center'>
                    <img className='h-[60px]' src="/x-logo.webp" alt="" />
                </div>

                <h1 className='text-lg font-bold text-center'>Twittere giris yap</h1>

                <button onClick={handleGoogle} className='bg-white flex items-center py-2 px-10 rounded-full gap-3 transition hover:bg-gray-300  text-black whitespace-nowrap' >
                    <img className='h-[20px]' src="/google-logo.svg" alt="" />
                    Google ile Giriş Yap
                </button>


                <form onSubmit={handleSubmit} className='flex flex-col'>

                    <label >Email</label>
                    <input onChange={(e) => setEmail(e.target.value)} type="text" className='text-black outline-none mt-1 p-2 rounded shadow-lg focus:shadow-[gray]' />


                    <label >Şifre</label>
                    <input onChange={(e) => setPass(e.target.value)} type="text" className='text-black outline-none mt-1 p-2 rounded shadow-lg focus:shadow-[gray]' />


                    <button className="mt-10 bg-white text-black rounded-full p-1 font-bold transition hover:bg-gray-300">
                        {isSignUp ? 'Kaydol' : 'Giriş Yapın'}
                    </button>


                    <p className='mt-5 ' onClick={() => setIsSignUp(!isSignUp)}>
                        <span className='text-gray-500'>
                            {isSignUp ? "Hesabınız varsa " : "Hesabınız yoksa"}
                        </span>
                        <span className='ms-2 text-blue-500 cursor-pointer '>
                            {isSignUp ? "Giriş Yapın" : "Kaydolun"}
                        </span>
                    </p>
                </form>

                {isError && (<p onClick={handleReset}  className='text-red-500 text-center cursor-pointer'> Şifrenizi mi unutdunuz? </p>)}
                
            </div>
        </section>
    )
}

export default Login
