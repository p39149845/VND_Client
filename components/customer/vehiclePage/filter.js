import React, { useState, useContext } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from "@apollo/react-hooks"
import { QUERY_ALLVEHICLE } from '../../gql/query'
import VehicleQuery from '../vehicleQuery'
import { AuthContext } from '../../../appState/AuthProvider'

function Filter() {

    const { User } = useContext(AuthContext)
    const router = useRouter()
    const [useForm] = useState(router.query)
    var numPeople = parseInt(useForm.numberPeople)

    const [optional, setOptional] = useState({
        tv: false,
        karaoke: false,
        gps: false,
        foodDrink: false,
        gender: "ชาย",
        additional: ""
    })

    const handleTv = (e) => {
        setOptional({ ...optional, tv: !optional.tv });

    }
    const handleKaraoke = (e) => {
        setOptional({ ...optional, karaoke: !optional.karaoke });

    }
    const handleGps = (e) => {
        setOptional({ ...optional, gps: !optional.gps });

    }
    const handleFood = (e) => {
        setOptional({ ...optional, foodDrink: !optional.foodDrink });
    }
    const handleChange = e => { setOptional({ ...optional, [e.target.name]: e.target.value }) }

    const { data, loading, error } = useQuery(QUERY_ALLVEHICLE)
    if (loading) return <p>Loading...</p>

    return (
        <div className="bg-white ">
            <div>
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className=" z-10 flex items-baseline justify-between pt-10 pb-6 border-b border-black">
                        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">รายการรถตู้</h1>
                    </div>

                    <section aria-labelledby="products-heading" className="pt-6 pb-24">
                        <h2 id="products-heading" className="sr-only">Products</h2>

                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10">

                            <form className=" lg:block">
                                {/* <ul className="text-sm font-medium text-gray-900 space-y-4 border-b border-gray-200">
                                    <li>
                                        <div className="text-black text-lg">
                                            จังหวัด: <span className="font-light text-base">{useForm.country}</span>
                                        </div>
                                    </li>

                                    <li>
                                        <div className="text-black text-lg">
                                            จำนวนผู้โดยสาร: <span className="font-light text-base">  {useForm.numberPeople}  คน</span>
                                        </div>
                                    </li>

                                    <li>
                                        <div className="text-black text-lg">
                                            วันที่เริ่มเดินทาง: <span className="font-light text-base">{useForm.startDate}</span>
                                        </div>
                                    </li>

                                    <li>
                                        <div className="text-black text-lg">
                                            วันที่จบการเดินทาง: <span className="font-light text-base">{useForm.stopDate}</span>
                                        </div>
                                    </li>
                                </ul> */}

                                <div className="border-b border-gray-200 py-4 overflow-x-auto">
                                    <h3 className="-my-3 flow-root py-2">
                                        <span className="font-black text-lg">
                                            จังหวัด: <span className="font-light text-base">{useForm.country}</span>
                                        </span>
                                    </h3>
                                    <h3 className="-my-3 flow-root py-2">
                                        <span className="font-black text-lg">
                                            จำนวนผู้โดยสาร: <span className="font-light text-base">  {useForm.numberPeople}  คน</span>
                                        </span>
                                    </h3>
                                    <h3 className="-my-3 flow-root py-2">
                                        <span className="font-black text-lg">
                                            วันที่เริ่มเดินทาง: <span className="font-light text-base">{useForm.startDate}</span>
                                        </span>
                                    </h3>
                                    <h3 className="-my-3 flow-root py-2">
                                        <span className="font-black text-lg">
                                            วันที่จบการเดินทาง: <span className="font-light text-base">{useForm.stopDate}</span>
                                        </span>
                                    </h3>
                                </div>
                                <div className="border-b border-gray-200 py-6 overflow-x-auto">
                                    <h3 className="-my-3 flow-root">
                                        <span className="font-black text-lg">
                                            อุปกรณ์บนรถตู้
                                        </span>
                                    </h3>

                                    <div className="pt-6" id="filter-section-0">
                                        <div className="space-y-4">
                                            <div className="flex items-center">
                                                <input
                                                    name="tv"
                                                    value={optional.tv}
                                                    onChange={handleTv}
                                                    type="checkbox"
                                                    className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500" />
                                                <label className="ml-3 text-sm text-gray-600">
                                                    ทีวี
                                                </label>
                                            </div>

                                            <div className="flex items-center">
                                                <input
                                                    name="karaoke"
                                                    value={optional.karaoke}
                                                    onChange={handleKaraoke}
                                                    type="checkbox"
                                                    className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500" />
                                                <label className="ml-3 text-sm text-gray-600">
                                                    คาราโอเกะ
                                                </label>
                                            </div>

                                            <div className="flex items-center">
                                                <input
                                                    name="gps"
                                                    value={optional.gps}
                                                    onChange={handleGps}
                                                    type="checkbox"
                                                    className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500" />
                                                <label className="ml-3 text-sm text-gray-600">
                                                    GPS
                                                </label>
                                            </div>

                                            <div className="flex items-center">
                                                <input
                                                    name="foodDrink"
                                                    value={optional.foodDrink}
                                                    onChange={handleFood}
                                                    type="checkbox"
                                                    className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500" />
                                                <label className="ml-3 text-sm text-gray-600">
                                                    อาหารและเครื่องดื่ม
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="border-b border-gray-200 py-6 overflow-x-auto">
                                    <h3 className="-my-3 flow-root">
                                        <span className="font-black text-lg">
                                            ลักษณะของคนขับ
                                        </span>
                                    </h3>
                                    <div className="pt-6">
                                        <div className="space-y-4">
                                            <div className="flex items-start flex flex-col">
                                                <label className="mx-3  text-md text-gray-600">
                                                    เพศ
                                                </label>
                                                <select
                                                    name="gender"
                                                    value={optional.gender}
                                                    onChange={handleChange}
                                                    className="mt-2 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                                    <option value="ชาย" >ชาย</option>
                                                    <option value="หญิง">หญิง</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <div className="lg:col-span-3 ">
                                <div className="flex flex-col">
                                    <div className="my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                        <div className="align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                                <table className="min-w-full divide-y divide-gray-200">
                                                    <thead className="bg-blue-500">
                                                        <tr>
                                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                                                รายละเอียด
                                                            </th>
                                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                                                คนขับรถ
                                                            </th>
                                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                                                สถานะ
                                                            </th>
                                                            <th scope="col" className="relative px-6 py-3">
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="bg-white divide-y divide-gray-200">
                                                        {data.allVehicle.
                                                            filter(
                                                                function (vehicle) {
                                                                    console.log(vehicle)
                                                                    var num = parseInt(vehicle.numberPeople)
                                                                    if (vehicle.user.metadata[0].status === false) {
                                                                        return null
                                                                    }
                                                                    for (var i = 0; i < useForm.dateRange.length; i++) {
                                                                        for (var j = 0; j < vehicle.user.workDay.length; j++) {
                                                                            if (useForm.dateRange[i] === vehicle.user.workDay[j].date) {
                                                                                return null
                                                                            }
                                                                        }
                                                                    }
                                                                    if (optional.tv === true && vehicle.tv === false) {
                                                                    } else
                                                                        if (optional.karaoke === true && vehicle.karaoke === false) {
                                                                        } else
                                                                            if (optional.gps === true && vehicle.gps === false) {
                                                                            } else
                                                                                if (optional.foodDrink === true && vehicle.foodDrink === false) {
                                                                                } else
                                                                                    if (vehicle.user.metadata[0].gender !== optional.gender) {
                                                                                    } else
                                                                                        if (numPeople > num) {
                                                                                        } else
                                                                                            if (useForm.additional === "ไม่มี" || useForm.additional === "") {
                                                                                                return vehicle.country.indexOf(useForm.country) !== -1
                                                                                            } else
                                                                                                return vehicle.country.indexOf(useForm.country) !== -1 && vehicle.additional.indexOf(useForm.additional) !== -1
                                                                }
                                                            ).
                                                            map(
                                                                function (vehicle) {
                                                                    console.log(vehicle)
                                                                    return (
                                                                        <VehicleQuery
                                                                            key={vehicle.id}
                                                                            vehicle={vehicle}
                                                                            useForm={useForm}
                                                                            hourResult={useForm.hourResult}
                                                                            diffTime={useForm.diffTime}
                                                                        />
                                                                    )
                                                                }
                                                            )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    )
}

export default Filter

