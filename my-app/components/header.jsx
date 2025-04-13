import React from 'react'
import Image from "next/image";
import Link from "next/link";
const Header = () => {
  return (
    <div className="bg-gray-950">

    <nav className='container mx-auto px-4 py-4 flex items-center justify-between '>
        <Link href={"/"}>
        <Image src={"/logo.png"}
        alt="Bookwise logo"
        width={100}
        height={75}/>
        </Link>
    </nav>
        </div>
  )
}

export default Header;