import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Menubar = () => {
    return (
        <menubar className="absolute top-5 w-[400px] max-sm:w-[280px] py-1 max-sm:py-1.5 bg-white rounded-3xl flex items-center justify-between text-base font-bold shadow-slate-400 shadow-lg hover:scale-[1.03] transition-all duration-700 ease-in-out">
            <Image
                className="ml-4 max-sm:mx-2 h-12 w-12 max-sm:h-10 max-sm:w-10 cursor-pointer"
                src="/logo.png"
                href="/"
                width={100}
                height={100}
                alt='more'
                priority={true}
                quality={100}
            />
            <div className="mr-6">
                <Link href="/" className="text-center ml-3 mb-[3px] cursor-pointer">HOME</Link>
                <Link href="https://github.com/snehilgamit" className="text-center ml-3 mb-[3px] cursor-pointer">GITHUB</Link>
            </div>
        </menubar>
    )
}

export default Menubar