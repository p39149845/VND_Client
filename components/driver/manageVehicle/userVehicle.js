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


    <div className="bg-gray-100 min-h-screen overflow-x-scroll">

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
        <div className=" z-10 flex items-baseline justify-between pt-10 pb-6 border-b border-black">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">จัดการรถตู้</h1>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-green-500 hover:bg-green-700 py-2 px-4 rounded"
          >เพิ่มรถ
          </button>
        </div>

        <section aria-labelledby="products-heading" className="pt-6 pb-24 ">
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-x-8 gap-y-10 min-w-screen">
            <div className="lg:col-span-1"></div>
            <div className="lg:col-span-8">
              <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 lg:h-full">
                <div className="flex flex-col">

                  {data &&
                    data.user &&
                    data.user.vehicles.length > 0 &&
                    data.user.vehicles.map(vehicle => (
                      <UserVehicleItem key={vehicle.id} vehicle={vehicle} />
                    ))}

                </div>
                <Modal
                  isOpen={modalOpen}
                >
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded w-30"
                    style={{

                      margin: "1vh",
                      alignSelf: "flex-start",
                    }}
                    onClick={() => setModalOpen(false)}>X
                  </button>
                  <ManageVehicle />
                </Modal>
              </div>
            </div>
            <div className="lg:col-span-1"></div>
          </div>

        </section>
      </main>
    </div>

  )
}

export default UserVehicle



