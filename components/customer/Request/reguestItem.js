import React, { useState } from 'react'
import Modal from 'react-modal'
import UserItem from './UserItem'
import VehicleItem from './vehicleItem'
import Review from './review'
import { reviewAndPayment } from '../../DataState/status'

Modal.setAppElement('#__next')

function ReguestItem({ request }) {
    const [Request] = useState(request)
    const [ModalOpen, setModalOpen] = useState(false)
    const modalIsOpen = () => {
        setModalOpen(!ModalOpen)
    }

    var StimeFormat = (request.startDate).split('|').slice(0, 2)
    var EtimeFormat = (request.stopDate).split('|').slice(0, 2)

    return (
        <tr>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                    <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                            {request.targetUser.metadata[0].userName}
                        </div>
                        {/* <div className="text-sm text-gray-500">
                            {request.status}
                        </div> */}
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {request.status}
                </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">วัน : {StimeFormat[0]}</div>
                <div className="text-sm text-gray-900">เวลา : {StimeFormat[1]}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">วัน : {EtimeFormat[0]}</div>
                <div className="text-sm text-gray-900">เวลา : {EtimeFormat[1]}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                    {request.cost}
                </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                {
                    request.status === reviewAndPayment ?
                        <button
                            onClick={modalIsOpen}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            ให้คะแนน
                        </button>
                        : <button
                            onClick={modalIsOpen}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            รายละเอียด
                        </button>
                }
            </td>
            <Modal
                isOpen={ModalOpen}
            >
                <div className="flex flex-column min-h-screen min-w-screen text-white bg-gray-100 contain-center" key={request.id}>
                    <button
                        className="btn btn-danger"
                        style={{

                            margin: "1vh",
                            alignSelf: "flex-start",
                        }}
                        onClick={modalIsOpen}>X
                    </button>
                    <div className="flex flex-column min-w-screen text-white bg-gray-100 contain-center">
                        <div className=" z-10 flex items-baseline justify-between my-3 mx-5 pt-5 pb-6 border-b border-black">
                            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">รายละเอียด</h1>
                        </div>
                        <UserItem key={Request.id} request={request} />
                        <VehicleItem key={Request.id} request={request} />
                        {
                            request.status === reviewAndPayment ?
                                <div>
                                    <div className=" z-10 flex items-baseline justify-between my-3 mx-5 pt-5 pb-6 border-b border-black">
                                        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">รีวิว</h1>
                                    </div>
                                    <Review key={Request.id} request={request} />
                                </div> : null
                        }
                    </div>
                </div>
            </Modal>
        </tr>
    )
}

export default ReguestItem
