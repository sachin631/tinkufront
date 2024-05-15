import Link from 'next/link'
import React from 'react'

const page = () => {
    return (
        <>
            <div className='text-center flex justify-center items-center h-[90vh]'>
                <div>
                    <div>Payment is Successfully Done 😊</div>
                    <Link href="/">
                    <button className='text-center text-white bg-blue-500 px-2 py-2 rounded-lg mt-8 '>Go Home</button>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default page