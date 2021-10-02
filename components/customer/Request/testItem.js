import React from 'react'
import { reviewAndPayment } from '../../DataState/status'
import Review from './review'

function TestItem({ request }) {

    const metadata = request && request.targetUser && request.targetUser.metadata.map(
        function (meta) {
            return meta
        }
    )

    return (
        <div className="container mx-auto p-1">
            <div className="md:flex no-wrap md:-mx-2 ">
                <div className="w-full md:w-3/12 md:mx-2">

                    <div className="bg-white p-3 border-t-4 border-green-400">
                        <div className="image overflow-hidden">
                            <img className="h-auto w-full mx-auto "
                                src={metadata[0].image} alt='Person image'
                            />
                        </div>
                        <h1 className="text-gray-900 font-bold text-xl leading-8 my-1"></h1>
                    </div>
                    <div className="my-4"></div>
                </div>

                <div className="w-full md:w-9/12 mx-2">
                    <div className="bg-white p-3 shadow-sm rounded-sm">
                        <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                            <span clas="text-green-500">
                                <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </span>
                            <span className="tracking-wide">About</span>
                        </div>
                        <div className="text-gray-700">
                            <div className="grid md:grid-cols-2 text-sm">

                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">ชื่อ-สกุล คนขับรถ :</div>
                                    <div className="px-4 py-2">{metadata[0].userName}</div>
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">จังหวัด</div>
                                    <div className="px-4 py-2">
                                        {request.country}
                                    </div>
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">จำนวนผู้โดยสาร</div>
                                    <div className="px-4 py-2">{request.numberPeople}</div>
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">สถานที่รับผู้โดยสาร</div>
                                    <div className="px-4 py-2">{request.startLocation}</div>
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">วันที่เริ่มเดินทาง</div>
                                    <div className="px-4 py-2">{request.startDate}</div>
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">วันที่จบการเดินทาง</div>
                                    <div className="px-4 py-2">{request.stopDate}</div>
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">รายละเอียดเพิ่มเติม</div>
                                    <div className="px-4 py-2">{request.locationDescription}</div>
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">ราคา</div>
                                    <div className="px-4 py-2">{request.cost} บาท</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default TestItem
