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
    <div style={{ width: '70%', margin: 'auto', marginBottom: '50px' }}>
      {/* Header */}

      <h1
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          marginTop: "5vh",
          marginBottom: "5vh",
        }}>จัดการรถตู้</h1>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '2fr 2fr 1fr 2fr 1fr',
          widht: '100%',
          marginBottom: "3%"
        }}
      >
        <h3 style={{ margin: 'auto' }}>Description</h3>
        <h3 style={{ margin: 'auto' }}>Picture</h3>
        <h3 style={{ margin: 'auto' }}>Price</h3>
        <h3 style={{ margin: 'auto' }}>Actions</h3>
        <button
          className="btn btn-success"
          style={{

            margin: "1vh",
            alignSelf: "flex-start",
          }}
          onClick={() => setModalOpen(true)}>เพิ่มรถ
        </button>
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
          className="btn btn-danger"
          style={{

            margin: "1vh",
            alignSelf: "flex-start",
          }}
          onClick={() => setModalOpen(false)}>X
        </button>
        <ManageVehicle />
      </Modal>
    </div>
  )
}

export default UserVehicle