import { FaSearch } from "react-icons/fa";
import { Link } from 'react-router-dom'
import './Header.css'

export default function Header() {
  return (
    <header className="bg-red-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
          <img class="w-16 md:w-32 lg:w-48" src="../../src/assets/lasgonzalez_tienda.png" className="logo"></img>
        </h1>
        <form className="bg-slate-100 p-3 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <FaSearch className="text-slade-600" />
        </form>
        <ul className='flex gap-4'>
          <Link to='/'>
          <li className='hidden sm:inline text-slate-700 hover:underline'>Home</li>
          </Link>
          <Link to='/products'>
          <li className='hidden sm:inline text-slate-700 hover:underline'>Products</li>
          </Link>
          <Link to='signin'>
          <li className='text-slate-700 hover:underline'>SignIn</li>
          </Link>
          <Link to='register'>
          <li className='text-slate-700 hover:underline'>Register</li>
          </Link>
         
          
        </ul>
      </div>
    </header>
  );
}
