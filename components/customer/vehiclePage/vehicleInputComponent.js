import React, { useState } from 'react'
import Router from 'next/router'
import DatePicker, { registerLocale } from "react-datepicker";

import { province_th } from '../../DataState/ThaiCountry'

import th from "date-fns/locale/th"; // the locale you want
registerLocale("th", th); // register it with the name you want

function VehicleInputComponent() {
    const [startDate, setStartDate] = useState(new Date());
    const [stopDate, setStopDate] = useState(new Date());

    const [startTime, setStartTime] = useState(new Date());
    const [stopTime, setStopTime] = useState(new Date());

    let diff = stopDate.getTime() - startDate.getTime()
    let msInDate = 1000 * 3600 * 24
    var hourResult = Math.ceil(diff / msInDate)
    var diffTime = ((stopTime * 1) - (startTime * 1)) / 3600000

    Date.prototype.addDays = function (days) {
        var dat = new Date(this.valueOf())
        dat.setDate(dat.getDate() + days);
        return dat
    }

    function getDates(startDate, stopDate) {
        var dateArray = new Array();
        var currentDate = startDate;
        while (currentDate <= stopDate) {
            dateArray.push(currentDate)
            currentDate = currentDate.addDays(1);
        }
        return dateArray;
    }

    var dateArr = new Array
    var dateArray = getDates(startDate, (startDate).addDays(hourResult));
    for (var i = 0; i < dateArray.length; i++) {
        var startFormat = (dateArray[i].toString()).split(' ').slice(1, 4)
        var thaiYear = (parseInt(startFormat[2]) + 543).toString()

        switch (startFormat[0]) {
            case 'Jan':
                startFormat[0] = "1";
                break;
            case 'Feb':
                startFormat[0] = '2';
                break;
            case 'Mar':
                startFormat[0] = "3";
                break;
            case 'Apr':
                startFormat[0] = "4";
                break;
            case 'May':
                startFormat[0] = "5";
                break;
            case 'Jun':
                startFormat[0] = "6";
                break;
            case 'Jul':
                startFormat[0] = "7";
                break;
            case 'Aug':
                startFormat[0] = '8';
                break;
            case 'Sep':
                startFormat[0] = "9";
                break;
            case 'Oct':
                startFormat[0] = "10";
                break;
            case 'Nov':
                startFormat[0] = "11";
                break;
            case 'Dec':
                startFormat[0] = "12";
        }

        var formatS = (startFormat[1] + "/" + startFormat[0] + "/" + thaiYear)
        dateArr[i] = formatS
    }

    var stimeFormat = (startTime.toString()).split(' ').slice(4, 5)
    var etimeFormat = (stopTime.toString()).split(' ').slice(4, 5)

    const [useForm, setUseForm] = useState({
        id: '',
        country: '',
        startDate: '',
        stopDate: '',
        startLocation: '',
        locationDescription: '',
        numberPeople: '',
        cost: '',
        startTime: '',
        stopTime: '',
        vehicleId: '',
        additional: '',
        destination:""
    })
  
    const handleChange = e => { setUseForm({ ...useForm, [e.target.name]: e.target.value }) }
    var numPeople = parseInt(useForm.numberPeople)
    const calHour = () => {
        if (numPeople > 0 && numPeople <= 15) {
            if (diffTime < 3 && hourResult < 1) {
                alert('You have booked a car less than 3 hours.')
            } else {
                console.log(useForm)
                Router.push({
                    pathname: '/form/filter',
                    query: {
                        id: useForm.id,
                        vehicleId: useForm.vehicleId,
                        country: useForm.country,
                        startDate: dateArr[0].toString(),
                        stopDate: dateArr[hourResult].toString(),
                        startLocation: useForm.startLocation,
                        startTime: stimeFormat.toString(),
                        stopTime: etimeFormat.toString(),
                        locationDescription: useForm.locationDescription,
                        numberPeople: useForm.numberPeople,
                        cost: useForm.cost,
                        destination:useForm.destination,
                        additional: useForm.additional,
                        hourResult: hourResult,
                        dateRange: dateArr,
                        diffTime: diffTime
                    },
                })
            }
        } else alert('จำนวนผู้โดยสารเยอะเกินไป')
    }
    return (
        <div className="bg-gray-100">
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
                <div className=" z-10 flex items-baseline justify-between pt-10 pb-6 border-b border-black">
                    <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">รายการรถตู้</h1>
                </div>
                <div className="mt-5">

                    <div className="md:grid md:grid-cols-5 ">

                        <div className="md:col-span-1">
                        </div>

                        <div className="mt-5 md:mt-0 md:col-span-3 ">

                            <form action="#" method="POST">
                                <div className="shadow overflow-hidden sm:rounded-md">
                                    <div className="px-4 py-5 bg-white sm:p-6">
                                        <div className="grid grid-cols-6 gap-6">
                                            <div className="col-span-6 sm:col-span-3">
                                                <label className="block text-lg mx-3 font-medium text-gray-700">จังหวัดที่ให้บริการ</label>
                                                <select
                                                    name="country"
                                                    value={useForm.country}
                                                    onChange={handleChange}
                                                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                                    <option value="">เลือกจังหวัดที่จะใช้บริการ</option>
                                                    {
                                                        province_th.map(
                                                            function (data) {
                                                                return <option key={data}>{data}</option>
                                                            }
                                                        )
                                                    }
                                                </select>
                                            </div>

                                            <div className="col-span-6 sm:col-span-3">
                                                <label className="block text-lg mx-3 font-medium text-gray-700">สถานที่รับ</label>
                                                <input
                                                    type="text"
                                                    name="startLocation"
                                                    value={useForm.startLocation}
                                                    onChange={handleChange}
                                                    placeholder="ตัวอย่าง บ้าน ต.รอบเวียง อ.เมือง จ.เชียงราย xxx/xxx"
                                                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
                                            </div>

                                            <div className="col-span-6 sm:col-span-3">
                                                <label className="block text-lg mx-3 font-medium text-gray-700">จุดหมายปลายทาง</label>
                                                <input
                                                    type="text"
                                                    name="destination"
                                                    value={useForm.destination}
                                                    onChange={handleChange}
                                                    placeholder="ตัวอย่าง จังหวัดเชียงใหม่ ม.เชียงใหม่ คณะวิศวกรรมศาสตร์"
                                                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
                                            </div>

                                            <div className="col-span-6 sm:col-span-3">
                                                <label className="block text-lg mx-3 font-medium text-gray-700">รายละเอียดการเดินทาง</label>
                                                <input
                                                    type="text"
                                                    name="locationDescription"
                                                    value={useForm.locationDescription}
                                                    placeholder="ตัวอย่าง เช่น ต้องการที่นั่งพิเศษ"
                                                    onChange={handleChange}
                                                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                            </div>

                                            <div className="col-span-6 sm:col-span-3">
                                                <label className="block text-lg mx-3 font-medium text-gray-700">วันและเวลาเริ่มเดินทาง</label>
                                                <DatePicker
                                                    selected={startDate}
                                                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                    onChange={(date) => setStartDate(date)}
                                                    startDate={startDate}
                                                    endDate={stopDate}
                                                    dateFormat="dd/MM/yyyy"
                                                    locale="th"
                                                />
                                            </div>
                                            <div className="col-span-6 sm:col-span-3">
                                                <label className="block text-lg mx-3 font-medium text-gray-700">เวลา</label>
                                                <DatePicker
                                                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                    selected={startTime}
                                                    onChange={(date) => setStartTime(date)}
                                                    showTimeSelect
                                                    showTimeSelectOnly
                                                    timeIntervals={60}
                                                    timeCaption="Time"
                                                    dateFormat="h:mm aa"
                                                />
                                            </div>

                                            <div className="col-span-6 sm:col-span-3">
                                                <label className="block text-lg mx-3 font-medium text-gray-700">วันและเวลาจบการเดินทาง</label>
                                                <DatePicker

                                                    selected={stopDate}
                                                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                    onChange={(date) => setStopDate(date)}
                                                    startDate={startDate}
                                                    endDate={stopDate}
                                                    dateFormat="dd/MM/yyyy"
                                                    locale="th"
                                                />
                                            </div>
                                            <div className="col-span-6 sm:col-span-3">
                                                <label className="block text-lg mx-3 font-medium text-gray-700">เวลา</label>
                                                <DatePicker
                                                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                    selected={stopTime}
                                                    onChange={(date) => setStopTime(date)}
                                                    showTimeSelect
                                                    showTimeSelectOnly
                                                    timeIntervals={60}
                                                    timeCaption="Time"
                                                    dateFormat="h:mm aa"
                                                />
                                            </div>

                                            <div className="col-span-6 sm:col-span-3">
                                                <label className="block text-lg mx-3 font-medium text-gray-700">จำนวนผู้โดยสาร</label>
                                                <input
                                                    type="number"
                                                    name="numberPeople"
                                                    placeholder="จำนวนผู้โดยสารไม่เกิน15คน "
                                                    value={useForm.numberPeople}
                                                    onChange={handleChange}
                                                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                            </div>
                                            <div className="col-span-6 sm:col-span-3">
                                                <label className="block text-lg mx-3 font-medium text-gray-700">
                                                    บริการเสริม
                                                </label>
                                                <select
                                                    name="additional"
                                                    value={useForm.additional}
                                                    onChange={handleChange}
                                                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                                    <option value="ไม่มี" >เลือกบริการเสริมที่ต้องการ</option>
                                                    <option value="นำเที่ยวภายในจังหวัด" >นำเที่ยวภายในจังหวัด</option>
                                                    <option value="ดูแลผู้สูงอายุ">ดูแลผู้สูงอายุ</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                        <button
                                            type="button"
                                            onClick={calHour}
                                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            disabled={
                                                !useForm.country ||
                                                !useForm.numberPeople ||
                                                !useForm.locationDescription ||
                                                !useForm.startLocation
                                            }>
                                            ค้นหารถ
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default VehicleInputComponent
