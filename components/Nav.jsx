import Image from "next/image";
import Link from "next/link";

const Nav = () => {
  const isUserLogedIn = true;

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className='flex gap-2 pt-3'>
        <Image width={30} height={30} src="./assets/images/logo.svg" alt="logo" className="object-contain"/>
      </Link>
    </nav>
  )
};

export default Nav;
