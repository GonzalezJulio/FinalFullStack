


import { useNavigate } from 'react-router-dom';

export default function OAuth() {
  const navigate = useNavigate();
  const handleOAuth = () => {
    window.open('http://localhost:5173/api/auth/github', '_self');
  }
  return (
    <button
      onClick={handleOAuth}
      type='button'
      className='bg-red-200 text-white p-3 rounded-lg uppercase hover:opacity-95'
    >
      Continue with Github
    </button>
  );
}