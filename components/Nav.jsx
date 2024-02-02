'use client';
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
const {signOut, signIn, useSession, getProviders} = require('next-auth/react');

const Nav = () => {
  const {data: session} = useSession();
  const [providers, setProviders] = useState(null);

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
  const [toggleDropdown, setToggleDropdown] = useState(false)

  const handleProviders = async () => {
    const providers = await getProviders();
    setProviders(providers);
  }

  useEffect(() => {
    handleProviders()
  }, [])

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className='flex gap-2 pt-3'>
        <Image 
          width={35} 
          height={35} 
          src="./assets/images/logo.svg" 
          alt="logo" 
          className="object-contain"
        />
      </Link>
      {/* desktop nav */}
      <div className="sm:flex hidden">
        {isUserLoggedIn ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-post" >Create Post</Link>
            <Link href="/profile" className="nav-link">
              <Image 
                width={37} 
                height={37} 
                src="./assets/images/logo.svg" 
                alt="profile" 
                className="rounded-full"
              />
            </Link>
            <button className="outline_btn" onClick={()=> console.log('signed out')}>
              Sign Out
            </button>
          </div>
        ) : (
          <div className="flex gap-3 md:gap-5">
            {providers && Object.values(providers).map(provider => (
              <button key={provider.name} className="black_btn" onClick={()=>signIn(provider.id)}>
                Sign In with {provider.name}
              </button>
              ))
            }
          </div>
        )}
      </div>
      {/* mobile nav */}
      <div className="sm:hidden flex relative">
          {isUserLoggedIn ? (
            <div className="flex cursor-pointer">
              <Image 
                width={37} 
                height={37} 
                src="./assets/images/logo.svg" 
                alt="profile" 
                className="rounded-full"
                onClick={()=>setToggleDropdown(prev => !prev)}
              />
              {toggleDropdown && (
                <div className="dropdown">
                  <Link href="/profile" className="dropdown_link" onClick={()=>setToggleDropdown(false)}>
                    My Profile
                  </Link>
                  <Link href="/create-post" className="dropdown_link" onClick={()=>setToggleDropdown(false)}>
                    Create Post
                  </Link>
                  <button type="button" className="black_btn w-full text-center mt-5" onClick={()=> {console.log('signed out'), setToggleDropdown(false)}}>
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button className="black_btn" type="button" onClick={()=>console.log('sign in')}>
              Sign In with Google
            </button>
          )}
      </div>
    </nav>
  )
};

export default Nav;
