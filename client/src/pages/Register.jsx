import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Register() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/signin');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

        <input type="text" placeholder="name" className="border p-3 rounded-lg" id="name" onChange={handleChange} />
        <input type="text" placeholder="lastname" className="border p-3 rounded-lg" id="lastname" onChange={handleChange} />
        <input type="number" placeholder="age" className="border p-3 rounded-lg" id="age" onChange={handleChange} />
        <input type="email" placeholder="email" className="border p-3 rounded-lg" id="email" onChange={handleChange} />
        <input type="text" placeholder="password" className="border p-3 rounded-lg" id="password" onChange={handleChange} />
        <input type="text" placeholder="role" className="border p-3 rounded-lg" id="role" onChange={handleChange}/>
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase">Register</button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-700">Sign in</span>
        </Link>
      </div>
    </div>
  );
}
