'use client';
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
const {signOut, signIn, useSession, getProviders} = require('next-auth/react');

const Nav = () => {
  const {data: session} = useSession();
  const [providers, setProviders] = useState(null);

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
      <Link href="/" className='flex gap-2 flex-center'>
        <Image 
          width={35} 
          height={35} 
          src="./assets/images/logo.svg" 
          alt="logo" 
          className="object-contain"
        />
        <p className="logo_text">PromptHub</p>
      </Link>
      {/* desktop nav */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">Create Prompt</Link>
            <button className="outline_btn" onClick={()=> signOut()}>
              Sign Out
            </button>
            <Link href="/profile" className="nav-link">
              <Image 
                width={37} 
                height={37} 
                src={session?.user?.image}
                alt="profile" 
                className="rounded-full"
              />
            </Link>
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
          {session?.user ? (
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
                  <button type="button" className="black_btn w-full text-center mt-5" onClick={()=> signOut()}>
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
