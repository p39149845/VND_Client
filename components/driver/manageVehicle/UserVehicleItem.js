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

const customStyles = {
    content: {
        width: '40%',
        left: "30%",
        right: "30%",
    },
};

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

    return (
        <div
            className="grid grid-cols-4 gap-4 border-3 p-1 text-center content-between text-xl"
        >
            <div className="col-span-1 pt-5 font-bold">
               
                    <h5>{vehicleData.description}</h5>
               
            </div>
            <div className="col-span-1 ">
                <img
                    src={vehicleData.imageUrl[0]}
                    alt={vehicleData.description}
                    className="object-contain h-20 w-full"
                />
                <button
                    className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded"
                    onClick={openImg}
                >
                    รูปภาพเพิ่มเติม
                </button>
            </div>
            <div className="col-span-1 pt-5">
               
                    <h5>{vehicleData.price} บาท/วัน</h5>
              
            </div>
            <div
                className="col-span-1 pt-5"
            >

                <button
                   className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded"
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
                style={customStyles}
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