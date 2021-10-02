import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import UserVehicleItem from './UserVehicleItem'
import ManageVehicle from './manageVehicle'

import Modal from 'react-modal'
Modal.setAppElement('#__next')

import { ME } from '../../gql/query'

const UserVehicle = () => {
  const { data, loading, error } = useQuery(ME)
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
      <div className=" z-10 flex items-baseline justify-between pt-10 pb-6 border-b border-black">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">รายการรถตู้</h1>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-30"
          onClick={() => setModalOpen(true)}>เพิ่มรถ
        </button>
      </div>

      <div
        className="grid grid-cols-4 gap-4 bg-gray-400 rounded-md p-4 mt-5 text-center text-2xl text-white"
      >
        <h3 className="col-span-1 ">รุ่นรถ</h3>
        <h3 className="col-span-1 ">รูปภาพรถ</h3>
        <h3 className="col-span-1 ">ราคา</h3>
        <h3 className="col-span-1 "></h3>

      </div>

      {data &&
        data.user &&
        data.user.vehicles.length > 0 &&
        data.user.vehicles.map(vehicle => (
          <UserVehicleItem key={vehicle.id} vehicle={vehicle} />
        ))}

      <Modal
        isOpen={modalOpen}
      >
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-30"
          style={{

            margin: "1vh",
            alignSelf: "flex-start",
          }}
          onClick={() => setModalOpen(false)}>X
        </button>
        <ManageVehicle />
      </Modal>
    </main>
  )
}

export default UserVehicle