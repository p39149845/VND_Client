import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import fetch from 'isomorphic-unfetch'
import Notification from '../../notification'
import { QUERY_ALLVEHICLE, ME } from '../../gql/query'
import { CREATE_VEHICLE } from '../../gql/mutation'
import { province_th } from '../../DataState/ThaiCountry'

function CreateMetadata() {

    const [file, setFile] = useState(null)
    const [loadImage, setLoadImage] = useState(false)
    const [vehicleData, setVehicleData] = useState({
        description: '',
        country: '',
        imageUrl: [],
        price: 400.00,
        numberPeople: '',
        foodDrink: false,
        tv: false,
        karaoke: false,
        gps: false,
        regBook: '',
        regBookIm: '',
        additional: '',
    })

    const [notify, setnotify] = useState({ isOpen: false, message: '', type: '' })

    const [createVehicle, { loading, error }] = useMutation(CREATE_VEHICLE, {
        refetchQueries: [{ query: QUERY_ALLVEHICLE }, { query: ME }]
    })

    const handleChange = e =>
        setVehicleData({ ...vehicleData, [e.target.name]: e.target.value })

    const handleTv = (e) => {
        setVehicleData({ ...vehicleData, tv: !vehicleData.tv });
    }
    const handleKaraoke = (e) => {
        setVehicleData({ ...vehicleData, karaoke: !vehicleData.karaoke });
    }
    const handleGps = (e) => {
        setVehicleData({ ...vehicleData, gps: !vehicleData.gps });
    }
    const handleFood = (e) => {
        setVehicleData({ ...vehicleData, foodDrink: !vehicleData.foodDrink });
    }

    const selectFile = e => {
        const files = e.target.files
        setFile(files[0])
    }

    const uploadFile = async () => {
        const data = new FormData()
        data.append('file', file)
        data.append('upload_preset', 'project-492')
        setLoadImage(true)

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

    const upload = async () => {

        const url = await uploadFile()
        vehicleData.imageUrl.push(url)
        setLoadImage(false)
        console.log(vehicleData.imageUrl)

    }

    const uploadReqBook = async () => {

        const url = await uploadFile()
        vehicleData.regBookIm = url
        setLoadImage(false)
        console.log(vehicleData.regBookIm)

    }

    const handleSubmit = async e => {
        console.log(vehicleData)
        try {
            e.preventDefault()

            const result = await createVehicle({
                variables: {
                    ...vehicleData,
                    imageUrl: vehicleData.imageUrl,
                    price: +vehicleData.price,
                    foodDrink: vehicleData.foodDrink,
                    tv: vehicleData.tv,
                    karaoke: vehicleData.karaoke,
                    gps: vehicleData.gps,
                    regBookIm: vehicleData.regBookIm
                }
            })
            console.log(result)
        } catch (error) {
            console.log(error)
        }
        setnotify({
            isOpen: true,
            message: "????????????????????????????????????????????????",
            type: "success"
        })
    }



    return (
        <div className="bg-gray-100 min-h-screen">
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className=" z-10 flex items-baseline justify-between pt-10 pb-6 border-b border-black">
                    <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">???????????????????????????????????????</h1>
                </div>
                <div className="mt-10 sm:mt-0">
                    <div className="md:grid md:grid-cols-4 md:gap-6">
                        <div className="md:col-span-1">
                        </div>
                        <div className="mt-5 md:mt-0 md:col-span-2">
                            <form action="#" method="POST"
                                onSubmit={handleSubmit}
                            >
                                <div className="shadow overflow-hidden sm:rounded-md">
                                    <div className="px-4 py-5 bg-white sm:p-6">
                                        <div className="grid grid-cols-6 gap-6">

                                            <div className="col-span-6 sm:col-span-3">
                                                <label className="block text-sm font-medium text-gray-700">??????????????????</label>
                                                <input
                                                    type="text"
                                                    name="description"
                                                    placeholder="Nissan Urvan"
                                                    value={vehicleData.description}
                                                    onChange={handleChange}
                                                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                            </div>

                                            <div className="col-span-6 sm:col-span-3">
                                                <label className="block text-sm font-medium text-gray-700">?????????????????????????????????????????????????????????</label>
                                                <select
                                                    name="country"
                                                    value={vehicleData.country}
                                                    onChange={handleChange}
                                                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                                    <option value="">????????????????????????????????????</option>
                                                    {
                                                        province_th.map(
                                                            function (data) {
                                                                return <option key={data.id} value={data}>{data}</option>
                                                            }
                                                        )
                                                    }
                                                </select>
                                            </div>

                                            <div className="col-span-6 sm:col-span-4">
                                                <label className="block text-sm font-medium text-gray-700">????????????????????????????????????</label>
                                                <input
                                                    placeholder="????????????????????????????????????"
                                                    name="numberPeople"
                                                    value={vehicleData.numberPeople}
                                                    onChange={handleChange}
                                                    type="number"
                                                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                            </div>

                                            <div className="col-span-6 sm:col-span-2">
                                                <label className="block text-sm font-medium text-gray-700">????????????????????????????????????????????????????????????</label>
                                                <select
                                                    name="additional"
                                                    value={vehicleData.additional}
                                                    onChange={handleChange}
                                                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                                    <option defaultValue>???????????????????????????????????????????????????????????????</option>
                                                    <option value="??????????????????????????????????????????">??????????????????????????????????????????</option>
                                                    <option value="????????????????????????????????????????????????????????????">????????????????????????????????????????????????????????????</option>
                                                </select>
                                            </div>

                                            <div className="col-span-6 sm:col-span-4">
                                                <label className="block text-sm font-medium text-gray-700">????????????????????????????????????</label>
                                                <input
                                                    type="text"
                                                    placeholder="400 ?????????/?????????"
                                                    name="price"
                                                    // value={vehicleData.price}
                                                    onChange={handleChange}
                                                    disabled
                                                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                            </div>
                                            <div className="col-span-6 sm:col-span-4">?????????????????????????????????????????????????????????????????????????????????</div>

                                            <div className="col-span-6 sm:col-span-6">
                                                <div className="grid grid-cols-6 gap-6">
                                                    <div className="col-span-6 sm:col-span-3 inline-flex items-center">
                                                        <input
                                                            className="form-checkbox mr-5 h-5 w-5"
                                                            onClick={handleFood}
                                                            name="foodDrink"
                                                            defaultChecked={vehicleData.foodDrink}
                                                            type="checkbox" />
                                                        <label className="text-lg">
                                                            Food and Drink
                                                        </label>
                                                    </div>


                                                    <div className="col-span-6 sm:col-span-3 inline-flex items-center">
                                                        <input
                                                            className="form-checkbox mr-5 h-5 w-5"
                                                            onClick={handleTv}
                                                            name="tv"
                                                            defaultChecked={vehicleData.tv}
                                                            type="checkbox" />
                                                        <label className="text-lg">
                                                            TV
                                                        </label>
                                                    </div>

                                                    <div className="col-span-6 sm:col-span-3 inline-flex items-center">
                                                        <input
                                                            className="form-checkbox mr-5 h-5 w-5"
                                                            onClick={handleKaraoke}
                                                            name="tv"
                                                            defaultChecked={vehicleData.karaoke}
                                                            type="checkbox" />
                                                        <label className="text-lg">
                                                            Karaoke
                                                        </label>
                                                    </div>

                                                    <div className="col-span-6 sm:col-span-3 inline-flex items-center">
                                                        <input
                                                            className="form-checkbox mr-5 h-5 w-5"
                                                            onClick={handleGps}
                                                            name="tv"
                                                            defaultChecked={vehicleData.Gps}
                                                            type="checkbox" />
                                                        <label className="text-lg">
                                                            GPS
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>



                                            <div className="col-span-6 sm:col-span-6">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    ????????????????????????????????????????????????????????????
                                                </label>
                                                <input
                                                    placeholder="?????????????????????????????????"
                                                    name="regBook"
                                                    value={vehicleData.regBook}
                                                    onChange={handleChange}
                                                    type="number"
                                                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                                <div className="mb-3">
                                                    <input className="form-control"
                                                        type="file"
                                                        name='regBookIm'
                                                        onChange={selectFile}
                                                    />
                                                    <button
                                                        type="button"
                                                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-30"
                                                        onClick={uploadReqBook}
                                                    >
                                                        ???????????????????????????????????????
                                                    </button>

                                                    {loadImage ?
                                                        <div className="mt-1 flex justify-center px-3 pt-3 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                                            <div className="space-y-1 text-center">
                                                                <h3>Loading . . .</h3>
                                                            </div>
                                                        </div> :
                                                        <div className="mt-1 flex justify-center px-3 pt-3 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                                            <div className="space-y-1 text-center">
                                                                <img
                                                                    src={vehicleData.regBookIm}
                                                                    width="150px"
                                                                    alt="regBook" />
                                                            </div>
                                                        </div>
                                                    }
                                                </div>
                                            </div>

                                            <div className="col-span-6 sm:col-span-6">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    ????????????????????????
                                                </label>

                                                <input className="form-control"
                                                    type="file" name='file' onChange={selectFile}
                                                />
                                                <button
                                                    type="button"
                                                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-30"
                                                    onClick={upload}
                                                >
                                                    ???????????????????????????????????????
                                                </button>

                                                {loadImage ?
                                                    <div className="mt-1 flex justify-center px-3 pt-3 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                                        <div className="space-y-1 text-center">
                                                            <h3>Loading . . .</h3>
                                                        </div>
                                                    </div>
                                                    :
                                                    <div className="mt-1 flex  px-3 pt-3 pb-6 border-2 border-gray-300 border-dashed rounded-md flex-wrap">
                                                        <div className="space-x-5 text-center flex flex-row flex-wrap">
                                                            {vehicleData.imageUrl.map(img =>
                                                                <img
                                                                    src={img}
                                                                    width="150px"
                                                                    alt="img"
                                                                    key={img} />
                                                            )
                                                            }

                                                        </div>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                        <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                            ?????????????????????
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="md:col-span-1">
                        </div>
                    </div>
                </div >

                <div className="hidden sm:block" aria-hidden="true">
                    <div className="py-5">
                        <div className="border-t border-gray-200"></div>
                    </div>
                </div>
                <Notification
                    notify={notify}
                    setnotify={setnotify}
                />
            </main>
        </div >
    )
}

export default CreateMetadata
