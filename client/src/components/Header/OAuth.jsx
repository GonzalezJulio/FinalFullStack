import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
import { app } from '../../firebase';
import { signInSuccess } from '../../redux/user/userSlice';
import { useDispatch } from 'react-redux';


export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSuccess = async () => {
    try{
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider)
      const res = await fetch('http://localhost:5173/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      console.log('could not sign in with google', error);
    }
  }
  const handleOAuth = () => {
    window.open('http://localhost:5173/api/auth/github', '_self');
  }
  return (
    <div>
      <button onClick={handleOAuth} type='button' className='bg-red-200 text-white p-3 rounded-lg uppercase'>
      Continue with Github
    </button>
    <button onClick={handleSuccess} type='button' className='bg-red-200 text-white p-3 rounded-lg uppercase'>
      Continue with Google
    </button>
    </div>
    

    
  );
}