import { Button, InputAdornment, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
const Navbar = () => {
    const navigate = useNavigate()
    const currentUser = useSelector((state) => state.user.userData)

    const [searchTerm, setSearchTerm] = useState('');




    const handleSubmit = (e) => {
      e.preventDefault();
      const urlParams = new URLSearchParams(window.location.search);
      urlParams.set('searchTerm', searchTerm);
      const searchQuery = urlParams.toString();
      navigate(`/search?${searchQuery}`);
    };
  
    useEffect(() => {
      const urlParams = new URLSearchParams(location.search);
      const searchTermFromUrl = urlParams.get('searchTerm');
      if (searchTermFromUrl) {
        setSearchTerm(searchTermFromUrl);
      }
    }, [location.search]);


    return (
        <>


            <header className='bg-slate-200 shadow-md '>

                <div className='flex  justify-between px-4 py-3 lg:px-10 items-center max-w-7xl mx-auto '>
                    <h1 className='font-bold text-sm sm:text-xl flex flex-wrap '>

                        <span className='text-slate-700'>Hamza</span>
                        <span className='text-slate-500'>Estate</span>
                    </h1>
                    <div className='bg-slate-100 rounded-lg'>
                        <form onSubmit={handleSubmit} action="">
                            <TextField
                                type='search'
                                placeholder='search ...'
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <Button type='submit'>
                                            <InputAdornment position='start'>
                                                <FaSearch />
                                            </InputAdornment>
                                        </Button>
                                    ),
                                    sx: {
                                        height: '40px', // Minimize the height
                                        padding: '0 10px', // Adjust padding
                                        fontSize: '14px', // Adjust font size
                                    },
                                }}
                                sx={{
                                    '& .MuiInputBase-root': {
                                        height: '40px', // Set height for the TextField
                                    },
                                    '& .MuiOutlinedInput-input': {
                                        padding: '10px', // Adjust input padding to minimize height
                                    },
                                }}
                            />
                        </form>
                    </div>
                    <ul className='flex justify-around items-center gap-x-5'>
                        <Link to='/'>
                            <li className='hover:underline hover:text-indigo-500 cursor-pointer font-medium'>
                                Home
                            </li>
                        </Link>
                        <Link to='/about'>
                            <li className='hover:underline hover:text-indigo-500 cursor-pointer font-medium'>
                                About
                            </li>
                        </Link>
                        <Link to='/profile'>
                            {

                                currentUser ? (
                                    <img src={currentUser?.avatar} className='h-10 w-10 object-cover rounded-full' alt="profile" />
                                ) : (

                                    <li className='hover:underline hover:text-indigo-500 cursor-pointer font-medium'>
                                        Signin
                                    </li>

                                )
                            }
                        </Link>

                    </ul>
                </div>

            </header>

        </>
    )
}

export default Navbar