import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import Notification from '../../notification'
import ConfirmDialog from '../../confirmDialog'
import Modal from 'react-modal'

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

Modal.setAppElement('#__next')

import { ME } from '../../gql/query'
import { DELETE_VEHICLE } from '../../gql/mutation'

const UserVehicleItem = ({ vehicle }) => {
    const [vehicleData, setVehicle] = useState(vehicle)
    const [modalOpen, setModalOpen] = useState(false)

    const [notify, setnotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setconfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })

    const [deleteVehicle] = useMutation(DELETE_VEHICLE, {
        onCompleted: data => {
            console.log(data)
        },
        refetchQueries: [{ query: ME }]
    })
    const openImg = (id) => {
        setModalOpen(!modalOpen)
    }

    const handleDelete = async () => {
        try {
            setconfirmDialog({
                ...confirmDialog,
                isOpen: false
            })
            await deleteVehicle({ variables: { id: vehicle.id } })

        } catch (error) {
            console.log(error)
        }
        setnotify({
            isOpen: true,
            message: "ลบรถตู้สำเร็จ",
            type: "error"
        })
    }
    console.log("vehicleData", vehicleData)
    return (
        <div className="md:flex no-wrap md:-mx-2 " >
            <div className="w-full md:w-3/12 md:mx-2">
                <div className="bg-white p-3">
                    <div className="image overflow-hidden">
                        <img className="h-auto w-full mx-auto "
                            src={vehicleData.imageUrl[0]}
                            alt={vehicleData.description}
                        />
                    </div>
                    <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">{vehicleData.description}</h1>
                </div>
                <div className="my-4"></div>
            </div>

            <div className="w-full md:w-9/12">

                <div className="bg-white shadow-sm rounded-sm">
                    <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                        <span className="text-green-500">
                            <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            >
                                <path
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </span>
                        <span className="tracking-wide">รายละเอียด</span>
                    </div>
                    <div className="text-gray-700">
                        <div className="grid md:grid-cols-2 text-md">
                        <div className="grid grid-cols-2">
                                <div className="px-4 py-2 font-semibold">รุ่นรถ</div>
                                <div className="px-4 py-2">
                                    <div className="text-blue-800"> {vehicleData.description}</div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2">
                                <div className="px-4 py-2 font-semibold">ราคา</div>
                                <div className="px-4 py-2">
                                    <div className="text-blue-800"> {vehicleData.price} บาท/วัน</div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2">
                                <div className="px-4 py-2 font-semibold">จำนวนที่นั่ง</div>
                                <div className="px-4 py-2">
                                    <div className="text-blue-800"> {vehicleData.numberPeople}</div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2">
                                <div className="px-4 py-2 font-semibold">บริการเสริม</div>
                                <div className="px-4 py-2">
                                    <div className="text-blue-800"> {vehicleData.additional}</div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2">
                                <div className="px-4 py-2 font-semibold">อุปกรณ์บนรถ</div>
                                <div className="px-4 py-2">
                                    <div className="text-blue-800">
                                        {
                                            vehicleData.tv ?
                                                <span>TV ,</span> : null
                                        }
                                        {
                                            vehicleData.gps ?
                                                <span>GPS ,</span> : null
                                        }
                                        {
                                            vehicleData.karaoke ?
                                                <span>Karaoke ,</span> : null
                                        }
                                        {
                                            vehicleData.foodDrink ?
                                                <span>FoodDrink ,</span> : null
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-1">
                                <button
                                    className="bg-red-500 hover:bg-red-700 py-2 px-4 rounded text-white max-w-30 text-center"
                                    onClick={() =>
                                        setconfirmDialog({
                                            isOpen: true,
                                            title: "คุณต้องการลบรถตู้คันนี้หรือไม่?",
                                            subTitle: "กรุณาตรวจสอบรายละเอียดให้ครบถ้วน",
                                            onConfirm: () => {
                                                handleDelete()
                                            }
                                        })
                                    }
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="my-4"></div>

            <Notification
                notify={notify}
                setnotify={setnotify}
            />
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setconfirmDialog={setconfirmDialog}
            />
            <Modal
                isOpen={modalOpen}
            >
                <button
                    className="btn btn-danger"
                    style={{

                        margin: "1vh",
                        alignSelf: "flex-start",
                    }}
                    onClick={openImg}>X
                </button>
                <div className="flex flex-col ">
                    <Carousel width="100%" showArrows emulateTouch useKeyboardArrows>
                        {vehicle &&
                            vehicle.imageUrl
                                .map(img => (
                                    <div key={img}>
                                        <img src={img}
                                            alt={vehicleData.description} />
                                    </div>
                                ))}
                    </Carousel>
                </div>
            </Modal>
        </div>
    )
}

export default UserVehicleItem

