import { useState } from 'react';
import { useNavigate } from 'react-router-dom';



export default function CreateProduct() {
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
      const res = await fetch('/api/products/', {
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
      navigate('/profile');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Create Product</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

        <input type="text" placeholder="title" className="border p-3 rounded-lg" id="title" onChange={handleChange} />
        <input type="text" placeholder="description" className="border p-3 rounded-lg" id="description" onChange={handleChange} />
        <input type="number" placeholder="price" className="border p-3 rounded-lg" id="price" onChange={handleChange} />
        <input type="email" placeholder="thumbnail" className="border p-3 rounded-lg" id="thumbnail" onChange={handleChange} />
        <input type="password" placeholder="code" className="border p-3 rounded-lg" id="code" onChange={handleChange} />
        <input type="text" placeholder="stock" className="border p-3 rounded-lg" id="stock" onChange={handleChange}/>
        <input type="text" placeholder="category" className="border p-3 rounded-lg" id="category" onChange={handleChange}/>
        <input type="text" placeholder="owner" className="border p-3 rounded-lg" id="owner" onChange={handleChange}/>
        <button className="bg-red-200 text-white p-3 rounded-lg uppercase hover: opacity-95 disabled: opacity-80">Create Product</button>
        
      </form>
      
    </div>
  );
};
