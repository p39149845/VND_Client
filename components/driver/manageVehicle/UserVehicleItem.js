import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import fetch from 'isomorphic-unfetch'
import Notification from '../../notification'
import ConfirmDialog from '../../confirmDialog'
import Modal from 'react-modal'

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

Modal.setAppElement('#__next')

import { ME } from '../../gql/query'
import { UPDATE_VEHICLE, DELETE_VEHICLE } from '../../gql/mutation'

const customStyles = {
    content: {
        width: '40%',
        left: "30%",
        right: "30%",
    },
};

const UserVehicleItem = ({ vehicle }) => {
    const [edit, setEdit] = useState(false)
    const [file, setFile] = useState(null)
    const [vehicleData, setVehicle] = useState(vehicle)
    const [modalOpen, setModalOpen] = useState(false)

    const [notify, setnotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setconfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })

    const [updateVehicle, { loading, error }] = useMutation(UPDATE_VEHICLE, {
        onCompleted: data => {
            console.log(data)
        },
        refetchQueries: [{ query: ME }]
    })

    const [deleteVehicle] = useMutation(DELETE_VEHICLE, {
        onCompleted: data => {
            console.log(data)
        },
        refetchQueries: [{ query: ME }]
    })
    const openImg = (id) => {
        setModalOpen(!modalOpen)
    }
    const handleChange = e =>
        setVehicle({ ...vehicleData, [e.target.name]: e.target.value })

    const selectFile = e => {
        const files = e.target.files
        setFile(files[0])
    }

    const uploadFile = async () => {
        const data = new FormData()
        data.append('file', file)
        data.append('upload_preset', 'project-492')

        const res = await fetch(
            'https://api.cloudinary.com/v1_1/project-492/image/upload',
            {
                method: 'post',
                body: data
            }
        )
        const result = await res.json()

        return result.secure_url
    }

    const handleSubmit = async () => {
        if (!file && vehicleData === vehicle) {
            setVehicle(vehicle)
            setEdit(false)
            return
        }

        console.log(vehicleData)

        try {
            console.log(file)
            if (file) {
                const url = await uploadFile()
                if (url) {
                    await updateVehicle({
                        variables: {
                            ...vehicleData,
                            imageUrl: url,
                            price: +vehicleData.price
                        }
                    })
                }
            } else {
                await updateVehicle({
                    variables: {
                        ...vehicleData,
                        imageUrl: vehicleData.imageUrl,
                        price: +vehicleData.price
                    }
                })
            }
        } catch (error) {
            console.log(error)
        }
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
            style={{
                display: 'grid',
                gridTemplateColumns: '2fr 2fr 1fr 2fr 1fr',
                width: '100%',
                padding: "10px",
                borderTop: '1px solid #CACACA',
                borderBottom: '1px solid #CACACA'
            }}
        >
            <div style={{ margin: 'auto' }}>
                {!edit ? (
                    <h5>{vehicleData.description}</h5>
                ) : (
                    <input
                        type='text'
                        name='description'
                        value={vehicleData.description}
                        onChange={handleChange}
                    />
                )}
            </div>
            <div style={{ margin: 'auto' }}>
                {!edit ? (
                    <div style={{
                        display: 'flex',
                        flexDirection: "column",
                    }}>
                        <img
                            src={vehicleData.imageUrl[0]}
                            alt={vehicleData.description}
                            width='100vh'
                            
                        />
                        <button
                            className="btn btn-outline-success"
                            onClick={openImg}
                            >
                            รูปภาพเพิ่มเติม
                        </button>
                    </div>
                ) : (
                    <input type='file' name='file' onChange={selectFile} />
                )}
            </div>
            <div style={{ margin: 'auto' }}>
                {!edit ? (
                    <h5>{vehicleData.price} บาท/วัน</h5>
                ) : (
                    <input
                        type='number'
                        name='price'
                        value={vehicleData.price}
                        onChange={handleChange}
                    />
                )}
            </div>
            <div
                style={{
                    margin: 'auto',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                {!edit ? (
                    <>
                        <button
                            style={{
                                padding: '5px 10px',
                                margin: "1vh"
                            }}
                            className="btn btn-outline-warning"
                            onClick={() => setEdit(true)}
                        >
                            Edit
                        </button>
                        <button
                            style={{
                                margin: "1vh",
                                padding: '5px 10px',
                            }}
                            className="btn btn-outline-danger"
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
                            {loading ? 'Delete...' : error ? 'Error' : 'Delete'}
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            style={{
                                padding: '5px 10px',
                                margin: "1vh"
                            }}
                            className="btn btn-outline-warning"
                            onClick={() => {
                                setVehicle(vehicle)
                                setEdit(false)
                            }}
                        >
                            Cancel Edit
                        </button>
                        <button
                            style={{
                                padding: '5px 10px',
                                margin: "1vh"
                            }}
                            className="btn btn-outline-success"
                            onClick={handleSubmit}
                        >
                            {loading ? 'Editing...' : 'Confirm Edit'}
                        </button>
                    </>
                )}
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
                                    <div key={img.id}>
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