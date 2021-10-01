import React, { useState, useContext } from 'react'
import { useMutation } from "@apollo/react-hooks"
import Router from 'next/router'
import { RatingView } from 'react-simple-star-rating'

import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import Notification from '../notification'
import ConfirmDialog from '../confirmDialog'

import { CREATE_REQUEST } from "../gql/mutation"
import { ME } from "../gql/query"

import { AuthContext } from '../../appState/AuthProvider'

function TestFilter({ vehicle, useForm }) {

    const [vehicleData, setVehicle] = useState(vehicle)
    const [useFormInput, setUseFormInput] = useState(useForm)
    const [notify, setnotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setconfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    const { user } = useContext(AuthContext)

    console.log("vehicle -->", vehicle)
    console.log("useForm", useFormInput)

    const [createRequest] = useMutation(CREATE_REQUEST, {
        refetchQueries: [{ query: ME }]
    })

    const handleRequest = async () => {
        if (!user) {
            Router.push("/signIn")
        }
        try {
            setconfirmDialog({
                ...confirmDialog,
                isOpen: false
            })
            const result = await createRequest({
                variables: {
                    ...useFormInput
                }
            })

            console.log(result)
        } catch (error) {
            console.log(error)
        }
        setnotify({
            isOpen: true,
            message: "จองรถสำเร็จ",
            type: "success"
        })
        Router.push('/requestList/history')
    }

    const metadata = vehicle && vehicle.user && vehicle.user.metadata.map(function (meta) {
        return meta
    })

    var Star = 0
    var lengthStar = vehicle.user.review.length
    for (var i = 0; i < lengthStar; i++) {
        Star = vehicle.user.review[i].star + Star
    }
    var avgStar = Star / lengthStar

    var StarV = 0
    var lengthStarV = 0
    for (var i = 0; i < lengthStar; i++) {
        if (vehicle.user.review[i].vehicle.id === vehicle.id) {
            StarV = vehicle.user.review[i].starVehicle + StarV
            lengthStarV++
        }
    }
    var avgStarV = StarV / lengthStarV
    console.log(StarV, lengthStarV)
    return (
        <div>

            <section className="text-gray-700 body-font overflow-hidden bg-white">
                <div className="container px-5  mx-auto">
                    <div className="md:grid md:grid-cols-10 py-8">
                        <div className="md:col-span-5 ">
                            <Carousel width="100%" showArrows emulateTouch useKeyboardArrows>
                                {vehicle &&
                                    vehicle.imageUrl
                                        .map(img => (
                                            <div key={img.id}>
                                                <img
                                                    alt="ecommerce"
                                                    className=" w-full object-cover object-center rounded border border-gray-200"
                                                    src={img} alt={vehicleData.description} />
                                            </div>
                                        ))}

                            </Carousel>
                            <div className="md:col-span-5 bg-red-300">
                                {/* /////////////// */}
                            </div>
                        </div>
                        <div className="md:col-span-1 ">
                        </div>
                        <div className="md:col-span-4 ">
                            <h2 className="text-sm title-font text-gray-500 tracking-widest">รายละเอียดรถ</h2>
                            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{vehicleData.description}</h1>
                            <div className="flex mb-2 md:grid md:grid-cols-3">
                                <span className="text-gray-600 ml-3 md:col-span-1">คะแนนคนขับรถ :</span>
                                <span className="flex items-center md:col-span-1">
                                    <RatingView ratingValue={avgStar} fillColor='red' />
                                </span>
                                <span className="text-gray-600 ml-3 md:col-span-1">{lengthStar} รีวิว</span>
                            </div>
                            <div className="flex mb-2 md:grid md:grid-cols-3">
                                <span className="text-gray-600 ml-3 md:col-span-1">คะแนนรถ :</span>
                                <span className="flex items-center md:col-span-1">
                                    <RatingView ratingValue={avgStarV} fillColor='red' />
                                </span>
                                <span className="text-gray-600 ml-3 md:col-span-1">{lengthStarV} รีวิว</span>
                            </div>

                            <div className="flex mt-4 items-center p-3 border-b-2 border-gray-200 mb-5 ">
                                <div>
                                    <p className="leading-relaxed">ชื่อ : {metadata[0].userName}</p>
                                    <p className="leading-relaxed">เพศ : {metadata[0].gender}</p>
                                    <p className="leading-relaxed">จังหวัดที่ให้บริการ : {vehicleData.country}</p>
                                    <p className="leading-relaxed">จำนวนที่นั่ง : {vehicleData.numberPeople}</p>
                                    <div className='border-1 rounded-md mt-2' >
                                        {vehicleData.tv ?
                                            <span >TV : มี </span>
                                            :
                                            null
                                        }
                                        {vehicleData.karaoke ?
                                            <p >คาราโอเกะ : มี</p>
                                            :
                                            null
                                        }
                                        {vehicleData.gps ?
                                            <p >Gps :  มี</p>
                                            :
                                            null
                                        }
                                        {vehicleData.foodDrink ?
                                            <p >อาหารและเครื่องดืม :  มี</p>
                                            :
                                            null
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className="flex">
                                <span className="title-font font-medium text-2xl text-gray-900">{useForm.cost} บาท</span>
                                {/* <button className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">จองรถ</button> */}
                                <button
                                    onClick={() =>
                                        setconfirmDialog({
                                            isOpen: true,
                                            title: "คุณต้องการจองรถตู้คันนี้หรือไม่?",
                                            subTitle: "กรุณาตรวจสอบรายละเอียดให้ครบถ้วน",
                                            onConfirm: () => {
                                                handleRequest()
                                            }
                                        })
                                    }
                                    className="flex ml-auto text-white bg-green-400 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded">จองรถ
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Notification
                notify={notify}
                setnotify={setnotify}
            />
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setconfirmDialog={setconfirmDialog}
            />
        </div>
    )
}

export default TestFilter
