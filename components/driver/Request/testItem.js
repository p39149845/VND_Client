import { waiting, accept, reject, startTrip, reviewAndPayment, finish } from '../../DataState/status'
import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { UPDATE_REQUEST, CREATE_WORKDAY } from '../../gql/mutation'
import { ME } from '../../gql/query'

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

function TestItem({ request }) {

    const metadata = request && request.targetUser && request.targetUser.metadata.map(
        function (meta) {
            return meta
        }
    )

    var SrangeDate = (request.startDate.toString()).split("|").slice(0, 1)
    var ErangeDate = (request.stopDate.toString()).split("|").slice(0, 1)

    var SrangeTime = (request.startDate.toString()).split("|").slice(1, 2)
    var ErangeTime = (request.stopDate.toString()).split("|").slice(1, 2)


    var Srange = (SrangeDate.toString()).split("/").slice(0, 3)
    var Erange = (ErangeDate.toString()).split("/").slice(0, 3)

    var calRange = (Erange[0] - Srange[0])

    var StartdateFormat = new Date(Srange[2], Srange[1], Srange[0])

    Date.prototype.addDays = function (days) {
        var dat = new Date(this.valueOf())
        dat.setDate(dat.getDate() + days);
        return dat
    }

    function getDates(startDate, stopDate) {
        var dateArray = new Array();
        var currentDate = startDate;
        while (currentDate <= stopDate) {
            dateArray.push(currentDate)
            currentDate = currentDate.addDays(1);
        }
        return dateArray;
    }

    var dateArr = new Array
    var dateArray = getDates(StartdateFormat, (StartdateFormat).addDays(calRange));
    for (var i = 0; i < dateArray.length; i++) {
        var startFormat = (dateArray[i].toString()).split(' ').slice(1, 4)

        switch (startFormat[0]) {
            case 'Jan':
                startFormat[0] = "0";
                break;
            case 'Feb':
                startFormat[0] = '1';
                break;
            case 'Mar':
                startFormat[0] = "2";
                break;
            case 'Apr':
                startFormat[0] = "3";
                break;
            case 'May':
                startFormat[0] = "4";
                break;
            case 'Jun':
                startFormat[0] = "5";
                break;
            case 'Jul':
                startFormat[0] = "6";
                break;
            case 'Aug':
                startFormat[0] = '7';
                break;
            case 'Sep':
                startFormat[0] = "8";
                break;
            case 'Oct':
                startFormat[0] = "9";
                break;
            case 'Nov':
                startFormat[0] = "10";
                break;
            case 'Dec':
                startFormat[0] = "11";
        }

        var formatS = (startFormat[1] + "/" + startFormat[0] + "/" + startFormat[2])
        dateArr[i] = formatS
    }
    console.log("dateArr", dateArr)

    const [updateRequest] = useMutation(UPDATE_REQUEST, {
        onCompleted: data => {
            console.log(data)
        },
        refetchQueries: [{ query: ME }]
    })

    const [createWorkDay] = useMutation(CREATE_WORKDAY, {
        onCompleted: data => {
            console.log(data)
        },
        refetchQueries: [{ query: ME }]
    })

    const StatusAccept = async (id) => {
        await updateRequest({
            variables: {
                id: id,
                status: accept,
            }
        })
        for (var i = 0; i < (calRange + 1); i++) {
            await createWorkDay({
                variables: {
                    date: dateArr[i]
                }
            })
        }
    }
    const StatusReject = async (id) => {
        await updateRequest({
            variables: {
                id: id,
                status: reject,
            }
        })
    }

    const StatusStartTrip = async (id) => {
        await updateRequest({
            variables: {
                id: id,
                status: startTrip,
            }
        })
    }

    const StatusReview = async (id) => {
        await updateRequest({
            variables: {
                id: id,
                status: reviewAndPayment,
            }
        })
    }

    const StatusFinish = async (id) => {
        await updateRequest({
            variables: {
                id: id,
                status: finish,
            }
        })
    }

    return (
        <div>
            <div className="container">
                <div className=" z-10 flex items-baseline justify-between pb-6 border-b border-black">
                    <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">รายละเอียด</h1>
                </div>
                <div className="md:flex no-wrap md:-mx-2">
                    <div className="w-full md:w-3/12 md:mx-2">

                        <div className="bg-white p-3 border-t-4 border-green-400">
                            <div className="image overflow-hidden">
                                <Carousel width="100%" showArrows emulateTouch useKeyboardArrows>
                                    {request &&
                                        request.targetVehicle.imageUrl
                                            .map(img => (
                                                <div key={img}>
                                                    <img src={img}
                                                        alt="Vehicle Image" />
                                                </div>
                                            ))}
                                </Carousel>
                            </div>
                            <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">{request.targetVehicle.description}</h1>
                        </div>
                        <div className="my-4"></div>
                    </div>

                    <div className="w-full md:w-9/12">

                        <div className="bg-white p-3 shadow-sm rounded-sm sm:flex-col">
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
                                        <div className="px-4 py-2 font-semibold">ชื่อ-สกุล ผู้โดยสาร:</div>
                                        <div className="px-4 py-2">{request.user.name}</div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold">เบอร์โทร:</div>
                                        <div className="px-4 py-2">{request.user.phoneNumber}</div>
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
                                        <div className="px-4 py-2">{SrangeDate}</div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold">เวลา</div>
                                        <div className="px-4 py-2">{SrangeTime}</div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold">วันที่จบการเดินทาง</div>
                                        <div className="px-4 py-2">{ErangeDate}</div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold">เวลา</div>
                                        <div className="px-4 py-2">{ErangeTime}</div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold">เวลาเดินทาง</div>
                                        <div className="px-4 py-2">{dateArr.length} วัน</div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold">รายละเอียดเพิ่มเติม</div>
                                        <div className="px-4 py-2">{request.locationDescription}</div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold">ราคา</div>
                                        <div className="px-4 py-2">{request.cost}</div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold">บริการพิเศษ</div>
                                        <div className="px-4 py-2">{request.targetVehicle.additional[0]}</div>
                                    </div>
                                </div>
                            </div>


                            {
                                request.status == waiting ? <div>
                                    <button
                                        className="btn btn-outline-success"
                                        onClick={() => StatusAccept(request.id)}
                                        style={{
                                            alignSelf: "flex-end",
                                            margin: "1%"
                                        }}
                                    >
                                        ยืนยันคำขอ
                                    </button>
                                    <button
                                        className="btn btn-outline-warning"
                                        onClick={() => StatusReject(request.id)}
                                        style={{
                                            alignSelf: "flex-end",
                                            margin: "1%"
                                        }}
                                    >
                                        ปฏิเสธคำขอ
                                    </button>
                                </div>
                                    : request.status == accept ?
                                        <button
                                            className="btn btn-outline-success"
                                            onClick={() => StatusStartTrip(request.id)}
                                            style={{
                                                alignSelf: "flex-end",
                                                margin: "1%"
                                            }}
                                        >
                                            เริ่มเดินทาง
                                        </button>
                                        : request.status == startTrip ?
                                            <button
                                                className="btn btn-outline-success"
                                                onClick={() => StatusReview(request.id)}
                                                style={{
                                                    alignSelf: "flex-end",
                                                    margin: "1%"
                                                }}
                                            >
                                                จบการเดินทาง
                                            </button>
                                            : request.status == reviewAndPayment ?
                                                <button
                                                    className="btn btn-outline-success"
                                                    onClick={() => StatusFinish(request.id)}
                                                    style={{
                                                        alignSelf: "flex-end",
                                                        margin: "1%"
                                                    }}
                                                >
                                                    เสร็จสิ้น
                                                </button> : null
                            }



                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default TestItem
