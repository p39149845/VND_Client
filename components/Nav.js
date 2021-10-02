import React, { useContext } from 'react'
import { AuthContext } from "../appState/AuthProvider"
import Link from 'next/link';
import { useState } from 'react';

function DriverNav() {
    const { user, signout } = useContext(AuthContext)
    console.log(user)
    const [active, setActive] = useState(false);
    const handleClick = () => {
        setActive(!active);
    };
    return (
        <nav className='flex items-center flex-wrap bg-red-500 p-2 '>
            <Link href='/'>
                <a className='inline-flex items-center p-2 mr-4 '>
                    <svg
                        viewBox='0 0 24 24'
                        xmlns='http://www.w3.org/2000/svg'
                        className='fill-current text-white h-8 w-8 mr-2'
                    >
                        <path d='M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z' />
                    </svg>
                    <span className='text-xl text-white font-bold uppercase tracking-wide'>
                        VND
                    </span>

                </a>
            </Link>
            <span className='text-base text-white px-10 uppercase tracking-wide'>
                สถานะ : คนขับรถ
            </span>
            <button
                className=' inline-flex p-3 hover:bg-green-600 rounded lg:hidden text-white ml-auto hover:text-white outline-none'
                onClick={handleClick}
            >
                <svg
                    className='w-6 h-6'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M4 6h16M4 12h16M4 18h16'
                    />
                </svg>
            </button>

            <div
                className={`${active ? '' : 'hidden'
                    }   w-full lg:inline-flex lg:flex-grow lg:w-auto`}
            >
                <div className='lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start  flex flex-col lg:h-auto'>
                    {!user && <>
                        <Link href='/signIn'>
                            <a className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-green-600 hover:text-white'>
                                เข้าสู่ระบบ
                            </a>
                        </Link>


                        <Link href='/signUp'>
                            <a className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-green-600 hover:text-white'>
                                ลงทะเบียน
                            </a>
                        </Link>
                    </>}

                    {user && <>
                        {user && user.metadata.length !== 0 && user.metadata[0].status === true && <>
                            <Link href='/DtimeTable'>
                                <a className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-green-600 hover:text-white'>
                                    ตารางงาน
                                </a>
                            </Link>
                            <Link href='/DrequestList/history'>
                                <a className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-green-600 hover:text-white'>
                                    รายการจองรถ
                                </a>
                            </Link>
                            <Link href='/DmanageVehicle'>
                                <a className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-green-600 hover:text-white'>
                                    จัดการรถ
                                </a>
                            </Link>
                        </>}
                        <div className="border-2 rounded-md">
                            {user && user.metadata &&
                                user.metadata.length === 1 &&
                                <>
                                    <Link href='/profile'>
                                        <a className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-green-600 hover:text-white'>
                                            บัญชี #
                                            {user.metadata[0].userName}
                                        </a>
                                    </Link>
                                </>}
                            {user && user.metadata &&
                                user.metadata.length === 0 &&
                                <>
                                    <Link href='/DcreateMetadata'>
                                        <a className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-green-600 hover:text-white'>
                                            ยืนยันตัวตน
                                        </a>
                                    </Link>
                                </>}
                            <button onClick={signout}>
                                <a className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-green-600 hover:text-white'>
                                    ออกจากระบบ
                                </a>
                            </button>
                        </div>
                    </>}
                </div>
            </div>
        </nav>
    )
}

export default DriverNav
