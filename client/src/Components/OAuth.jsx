import { Spinner } from 'flowbite-react'
import {app} from '../firebase'
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import {useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { signInFailure, signInStart, signInSuccess } from '../redux/userSlice'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FcGoogle } from 'react-icons/fc'

export default function OAuth() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleGoogle = async ()=>{

       try {        
        
        dispatch(signInStart())

        const provider = new GoogleAuthProvider()
        provider.setCustomParameters({prompt:'select_account'})

        const auth = getAuth(app)
        const result = await signInWithPopup(auth,provider) 


        const res = await fetch('/api/auth/google',{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                username:result.user.displayName,
                email:result.user.email,
            })
        })

        const data = await res.json()

        dispatch(signInSuccess(data))
        navigate('/')
        toast.success('Logged In successfully',{
            theme: "dark",
            autoClose:1000,
          });
       }
       
       catch (error) {
        console.log(error.message);
       }

    }
  return (
    <button  type='button' onClick={handleGoogle}  className=' hover:opacity-85 mt-3 disabled:opacity-80 uppercase' >
        <span className='flex items-center gap-2 justify-center'>
            <div className='flex justify-center items-center border-2 border-gray-800 rounded-full w-10 h-10 cursor-pointer hover:bg-gray-200'>
                <FcGoogle className='w-7 h-7'/>
            </div>
        </span>
    </button>
  )
}