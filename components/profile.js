import React, { useContext } from 'react'
import { AuthContext } from "../appState/AuthProvider"
import { useQuery } from '@apollo/react-hooks'
import { AgeFromDateString } from 'age-calculator'
import TimeTable from './driver/TimeTable'
import { ME } from '../components/gql/query'

function Profile() {
    const { user } = useContext(AuthContext)
    const { data, loading, error } = useQuery(ME)

    let ageFromString = new AgeFromDateString(user.metadata[0].dateOfBirth).age;
    return (
        <div className="min-w-screen bg-gray-100">
            <div className="container mx-auto pt-5">
                <div className=" z-10 flex items-baseline justify-between p-6 border-b border-black">
                    <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">ข้อมูลส่วนตัว</h1>
                </div>
                {data &&
                    data.user.metadata &&
                    data.user.metadata
                        .map(metadataSet =>
                        (
                            <div key={metadataSet.id} className="md:flex no-wrap md:-mx-2 " >
                                <div className="w-full md:w-3/12 md:mx-2 pt-5">
                                    <div className="bg-white p-3 border-t-4 border-green-400">
                                        <div className="image overflow-hidden">
                                            <img className="h-auto w-full mx-auto " layout='fill'
                                                src={metadataSet.image} alt="Person Image"
                                            />
                                        </div>
                                        <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">{metadataSet.userName}</h1>
                                    </div>
                                    <div className="my-4"></div>
                                </div>

                                <div className="w-full md:w-9/12 mx-2 h-64 pt-5">

                                    <div className="bg-white p-3 shadow-sm rounded-sm">
                                        <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                                            <span className="text-green-500">
                                                <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                            </span>
                                            <span className="tracking-wide">About</span>
                                        </div>
                                        <div className="text-gray-700">
                                            <div className="grid md:grid-cols-2 text-sm">

                                                <div className="grid grid-cols-2">
                                                    <div className="px-4 py-2 font-semibold">ชื่อ-สกุล</div>
                                                    <div className="px-4 py-2">{metadataSet.userName}</div>
                                                </div>
                                                <div className="grid grid-cols-2">
                                                    <div className="px-4 py-2 font-semibold">Email.</div>
                                                    <div className="px-4 py-2">
                                                        <a className="text-blue-800" href="mailto:jane@example.com">{metadataSet.user.email}</a>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2">
                                                    <div className="px-4 py-2 font-semibold">เพศ</div>
                                                    <div className="px-4 py-2">{metadataSet.gender}</div>
                                                </div>
                                                <div className="grid grid-cols-2">
                                                    <div className="px-4 py-2 font-semibold">รหัสประชาชน</div>
                                                    <div className="px-4 py-2">{metadataSet.idCard}</div>
                                                </div>
                                                <div className="grid grid-cols-2">
                                                    <div className="px-4 py-2 font-semibold">วันเกิด</div>
                                                    <div className="px-4 py-2">{metadataSet.dateOfBirth}</div>
                                                </div>
                                                <div className="grid grid-cols-2">
                                                    <div className="px-4 py-2 font-semibold">รหัสใบขับขี่</div>
                                                    <div className="px-4 py-2">{metadataSet.driverlicense}</div>
                                                </div>
                                                <div className="grid grid-cols-2">
                                                    <div className="px-4 py-2 font-semibold">อายุ</div>
                                                    <div className="px-4 py-2">{ageFromString}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="my-4"></div>



                                </div>
                            </div>
                        ))}
            </div>
            {
                user && user.metadata[0].status === true ?
                    <div className="container p-5 bg-gray-100">
                        <div className=" z-10 flex items-baseline justify-between pt-10 pb-6 border-b border-black ">
                            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">ตารางงาน</h1>
                        </div>
                        <TimeTable />
                    </div>
                    : null
            }
        </div>
    )
}

export default Profile
