import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Menubar = () => {
    return (
        <menubar className="absolute top-5 w-[400px] max-sm:w-[280px] py-1 max-sm:py-1.5 bg-white rounded-3xl flex items-center justify-between text-base font-semibold">
            <Image
                className="ml-4 max-sm:mx-2 h-12 w-12 max-sm:h-10 max-sm:w-10 cursor-pointer"
                src="/logo.png"
                href="/"
                width={48}
                height={48}
                alt='more'
            />
            <div className="mr-6">
                <Link href="/" className="text-center ml-3 mb-[3px] cursor-pointer">Home</Link>
                <Link href="https://github.com/snehilgamit" className="text-center ml-3 mb-[3px] cursor-pointer">Github</Link>
            </div>
        </menubar>
    )
}

export default Menubar