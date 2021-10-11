import React, { useState } from 'react'
import Modal from 'react-modal'
import TestItem from './testItem'
import { waiting, accept, reject, startTrip, reviewAndPayment, finish } from '../../DataState/status'
Modal.setAppElement('#__next')

function ReguestItem({ request }) {

    const [Request, useRequest] = useState(request)
    const [modalOpen, setModalOpen] = useState(false)
    const modalIsOpen = () => {
        setModalOpen(!modalOpen)
    }
    var StimeFormat = (request.startDate).split('|').slice(0, 2)
    var EtimeFormat = (request.stopDate).split('|').slice(0, 2)
    return (
        <tr>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                    <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                            {request.user.name}
                        </div>
                        <div className="text-sm text-gray-500">
                        {request.user.phoneNumber}
                    </div>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                {
                    request.status === waiting ?
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-600">
                            {request.status}
                        </span>
                        : request.status === accept ?
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                {request.status}
                            </span>
                            : request.status === reject ?
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                    {request.status}
                                </span>
                                : request.status === reviewAndPayment ?
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                        {request.status}
                                    </span> : <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                        {request.status}
                                    </span>
                }

            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-xs leading-5 font-semibold rounded-full">วัน : {StimeFormat[0]}</div>
                <div className="text-xs leading-5 font-semibold rounded-full">เวลา : {StimeFormat[1]}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-xs leading-5 font-semibold rounded-full">วัน : {EtimeFormat[0]}</div>
                <div className="text-xs leading-5 font-semibold rounded-full">เวลา : {EtimeFormat[1]}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                    {request.cost} บาท
                </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                    onClick={modalIsOpen}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    รายละเอียด
                </button>
            </td>
            <Modal
                isOpen={modalOpen}
            >
                <div className="flex flex-column min-h-screen min-w-screen text-white bg-gray-100 contain-center">
                    <button
                        className="btn btn-danger"
                        style={{

                            margin: "1vh",
                            alignSelf: "flex-start",
                        }}
                        onClick={modalIsOpen}>X
                    </button>
                    <TestItem key={Request.id} request={request} />
                </div>
            </Modal>
        </tr>
    )
}

export default ReguestItem
