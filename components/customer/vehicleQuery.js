import React, { useState, useContext } from 'react'
import DescriptionVehicle from './descriptionVehicle'
import { AuthContext } from '../../appState/AuthProvider'
import Modal from 'react-modal'
Modal.setAppElement('#__next')

function VehicleQuery({ vehicle, useForm, hourResult, diffTime }) {

    const [vehicleData, setVehicle] = useState(vehicle)
    const [modalOpen, setModalOpen] = useState(false)
    const { user } = useContext(AuthContext)
    console.log(vehicle.price)
    diffTime = Math.ceil(diffTime)
    console.log("diffTime", diffTime)

    const handleClick = (id) => {

        setModalOpen(!modalOpen)
        useForm.id = id
        useForm.startDate = useForm.startDate + "|" + useForm.startTime
        useForm.stopDate = useForm.stopDate + "|" + useForm.stopTime
        useForm.vehicleId = vehicleData.id

        if (hourResult < 1 && diffTime >= 3 && diffTime < 6) {
            useForm.cost = vehicle.price / 4
        } else if (hourResult < 1 && diffTime >= 6 && diffTime < 12) {
            useForm.cost = vehicle.price / 2
        } else {
            useForm.cost = hourResult * vehicle.price
        }

    }

    return (
        <tr>
            {user && user.id !== vehicle.user.id && <>
                <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 h-15 w-20">
                            <img className="h-full w-full"
                                src={vehicleData.imageUrl[0]}
                                alt={vehicleData.description} />
                        </div>
                        <div className="ml-4">
                            <div className="text-sm text-gray-500">
                                {vehicleData.description}
                            </div>
                             <div className="text-sm font-medium text-gray-900">
                                {vehicleData.price} บาท/วัน
                            </div>
                        </div>
                    </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900"> {vehicleData.user.name}</div>
                    <div className="text-sm text-gray-500">{vehicleData.user.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Active
                    </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                        onClick={() => handleClick(vehicleData.user.id)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        รายละเอียดเพิ่มเติม
                    </button>
                </td>
                <Modal
                    isOpen={modalOpen}
                >
                    <div className="w-full">
                        <button
                            className="btn btn-danger"
                            onClick={handleClick}>X
                        </button>
                        <DescriptionVehicle key={vehicleData.id} vehicle={vehicleData} useForm={useForm} modalOpen={modalOpen} />
                    </div>
                </Modal>
            </>}
        </tr>


    )
}

export default VehicleQuery
