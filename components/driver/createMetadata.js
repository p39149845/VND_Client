import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import fetch from 'isomorphic-unfetch'
import Router from 'next/router'
import { AgeFromDateString } from 'age-calculator'

import { QUERY_ALLMETADATA, ME } from '../gql/query'
import { CREATE_METADATA } from '../gql/mutation'

function CreateMetadata() {

    const [File, setFile] = useState(null)
    const [LoadImage, setLoadImage] = useState(false)
    const [Chk, setChk] = useState(false)

    const [metadataInfo, setMetadata] = useState({
        image: '',
        gender: '',
        dateOfBirth: '',
        idCard: '',
        driverlicense: '',
        idCardIm: '',
        driverlicenseIm: '',
        userName: '',
        surName: '',
    })

    const ChkDigitPid = (p_iPID) => {
        var total = 0;
        var iPID;
        var Chk;
        var ValidChk;
        iPID = p_iPID.toString().replace(/-/g, "");
        ValidChk = iPID.toString().substr(12, 1);
        var j = 0;
        var pidcut;
        for (var n = 0; n < 12; n++) {
            pidcut = parseInt(iPID.toString().substr(j, 1));
            total = (total + ((pidcut) * (13 - n)));
            j++;
        }
        Chk = 11 - (total % 11);
        if (Chk == 10) {
            Chk = 0;
        } else if (Chk == 11) {
            Chk = 1;
        }
        if (Chk == ValidChk) {
            setChk(true)
        } else {
            setChk(false)
        }
    }

    const [createDriverMetadata, { loading, error }] = useMutation(CREATE_METADATA, {
        refetchQueries: [{ query: QUERY_ALLMETADATA }, { query: ME }]
    })

    const handleChange = (e, p_iPID) => {
        setMetadata({ ...metadataInfo, [e.target.name]: e.target.value })
    }
    const selectFile = e => {
        const files = e.target.files
        setFile(files[0])
    }

    const uploadFile = async () => {
        const data = new FormData()
        data.append('file', File)
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

    const uploadProfile = async (e) => {
        e.preventDefault
        metadataInfo.image = await uploadFile()
        setLoadImage(false)
        console.log(metadataInfo.image)
    }

    const uploadIdCard = async () => {
        metadataInfo.idCardIm = await uploadFile()
        setLoadImage(false)
    }

    const uploadDriverLi = async () => {
        metadataInfo.driverlicenseIm = await uploadFile()
        setLoadImage(false)
    }

    let ageFromString = new AgeFromDateString(metadataInfo.dateOfBirth).age;

    console.log(metadataInfo)

    const handleSubmit = async e => {
        try {
            e.preventDefault()
            const result = await createDriverMetadata({
                variables: {
                    ...metadataInfo,
                    userName: metadataInfo.userName + ' ' + metadataInfo.surName
                }
            })
            console.log(result)
            Router.push("/profile")
        } catch (error) {
            console.log(error)
        }
    }
    console.log(LoadImage)
    return (
        <div className="bg-gray-100 min-h-screen">
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className=" z-10 flex items-baseline justify-between pt-10 pb-6 border-b border-black">
                    <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">เพิ่มข้อมูลส่วนตัว</h1>
                </div>
                <div className="mt-10 sm:mt-0">
                    <div className="md:grid md:grid-cols-4 md:gap-6">
                        <div className="md:col-span-1">
                        </div>
                        <div className="mt-5 md:mt-0 md:col-span-2">
                            <form action="#" method="POST" onSubmit={handleSubmit}>
                                <div className="shadow overflow-hidden sm:rounded-md">
                                    <div className="px-4 py-5 bg-white sm:p-6">
                                        <div className="grid grid-cols-6 gap-6">

                                            <div className="col-span-6 sm:col-span-3">
                                                <label className="block text-sm font-medium text-gray-700">ชื่อ</label>
                                                <input
                                                    type="text"
                                                    name="userName"
                                                    placeholder="สมชาย"
                                                    value={metadataInfo.userName}
                                                    onChange={handleChange}
                                                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                            </div>

                                            <div className="col-span-6 sm:col-span-3">
                                                <label className="block text-sm font-medium text-gray-700">นามสกุล</label>
                                                <input
                                                    type="text"
                                                    name="surName"
                                                    placeholder="ยอดรัก"
                                                    value={metadataInfo.surName}
                                                    onChange={handleChange}
                                                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                            </div>

                                            <div className="col-span-6 sm:col-span-2">
                                                <label className="block text-sm font-medium text-gray-700">เพศ</label>
                                                <select
                                                    type="text"
                                                    name="gender"
                                                    value={metadataInfo.gender}
                                                    onChange={handleChange}
                                                    placeholder="เพศ"
                                                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                                    <option value="">เพศ</option>
                                                    <option value="ชาย">ชาย</option>
                                                    <option value="หญิง">หญิง</option>
                                                </select>
                                            </div>

                                            <div className="col-span-6 sm:col-span-4">
                                                <label className="block text-sm font-medium text-gray-700">วัน/เดือน/ปีเกิด</label>

                                                {ageFromString < 22 ?
                                                    <input
                                                        type="date"
                                                        name="dateOfBirth"
                                                        value={metadataInfo.dateOfBirth}
                                                        onChange={handleChange}
                                                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-red-100 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                                    :
                                                    <input
                                                        type="date"
                                                        name="dateOfBirth"
                                                        value={metadataInfo.dateOfBirth}
                                                        onChange={handleChange}
                                                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-green-100 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                                }
                                            </div>

                                            <div className="col-span-6 sm:col-span-6">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    รูปถ่ายบุคคล
                                                </label>
                                                <input className="form-control" type="file" name='image'
                                                    onChange={selectFile} />
                                                <button
                                                    type='button'
                                                    className="btn btn-success"
                                                    onClick={uploadProfile}
                                                >
                                                    อัพโหลดรูปภาพ
                                                </button>

                                                {LoadImage ?
                                                    <div className="mt-1 flex justify-center px-3 pt-3 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                                        <div className="space-y-1 text-center">
                                                            <h3>Loading . . .</h3>
                                                        </div>
                                                    </div> :
                                                    <div className="mt-1 flex justify-center px-3 pt-3 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                                        <div className="space-y-1 text-center">
                                                            <img src={metadataInfo.image} width="150px" alt='Person Image' />
                                                        </div>
                                                    </div>
                                                }

                                            </div>

                                            <div className="col-span-6 sm:col-span-6">

                                                <label className="block text-sm font-medium text-gray-700">
                                                    รหัสประชาชน
                                                </label>

                                                {Chk ?
                                                    <input
                                                        type="number"
                                                        name="idCard"
                                                        value={metadataInfo.idCard}
                                                        onChange={handleChange}
                                                        onBlur={() => ChkDigitPid(metadataInfo.idCard)}
                                                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-green-100 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />

                                                    :
                                                    <input
                                                        type="number"
                                                        name="idCard"
                                                        placeholder="เช่น 1-5799-xxxxx-xx-x"
                                                        value={metadataInfo.idCard}
                                                        onChange={handleChange}
                                                        onBlur={() => ChkDigitPid(metadataInfo.idCard)}
                                                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-red-100 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />

                                                }

                                                <div className="mb-3">
                                                    <input className="form-control" type="file" name='idCardIm'
                                                        onChange={selectFile} />
                                                    <button
                                                        type="button"
                                                        className="btn btn-success"
                                                        onClick={uploadIdCard}
                                                    >
                                                        อัพโหลดรูปภาพ
                                                    </button>

                                                    {LoadImage ?
                                                        <div className="mt-1 flex justify-center px-3 pt-3 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                                            <div className="space-y-1 text-center">
                                                                <h3>Loading . . .</h3>
                                                            </div>
                                                        </div> :
                                                        <div className="mt-1 flex justify-center px-3 pt-3 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                                            <div className="space-y-1 text-center">
                                                                <img src={metadataInfo.idCardIm} width="150px" alt="idCard" />
                                                            </div>
                                                        </div>
                                                    }
                                                </div>
                                            </div>

                                            <div className="col-span-6 sm:col-span-6">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    ใบขับขี่
                                                </label>
                                                <input
                                                    type="number"
                                                    name="driverlicense"
                                                    placeholder="เช่น 6300-xxxxx"
                                                    value={metadataInfo.driverlicense}
                                                    onChange={handleChange}
                                                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />

                                                <input className="form-control" type="file" name='driverlicenseIm'
                                                    onChange={selectFile} />
                                                <button
                                                    type="button"
                                                    className="btn btn-success"
                                                    onClick={uploadDriverLi}
                                                >
                                                    อัพโหลดรูปภาพ
                                                </button>

                                                {LoadImage ? <
                                                    div className="mt-1 flex justify-center px-3 pt-3 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                                    <div className="space-y-1 text-center">
                                                        <h3>Loading . . .</h3>
                                                    </div>
                                                </div> :
                                                    <div className="mt-1 flex justify-center px-3 pt-3 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                                        <div className="space-y-1 text-center">
                                                            <img src={metadataInfo.driverlicenseIm} width="150px" alt='driverLicense' />
                                                        </div>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                        <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                            บันทึกข้อมูล
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
            </main>
        </div >
    )
}

export default CreateMetadata
