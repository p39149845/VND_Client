import React, { useContext, useState } from 'react'
import { AuthContext } from "../../appState/AuthProvider"

function TimeTable() {
    const { user } = useContext(AuthContext)

    var head = new Array
    var thaiformat = new Array
    const workDays = new Array()
    const toDay = new Date
    toDay.setHours(0, 0, 0, 0);

    var state = [false, false, false, false, false, false, false,]

    if (user) {
        for (var i = 0; i < user.workDay.length; i++) {
            workDays.push(user.workDay[i])
        }
    }

    if (workDays.length > 0) {
        for (var i = 0; i < workDays.length; i++) {
            const DayFormat = (workDays[i].date).split("/")
            workDays[i] = parseInt(DayFormat[2]) - 543 + " " + DayFormat[1] + " " + DayFormat[0]
            workDays[i] = new Date(workDays[i])
        }

    }
    const DateSorting = workDays.sort((a, b) => a - b)

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

    var dateArray = getDates(toDay, (toDay).addDays(6));
    for (var i = 0; i < dateArray.length; i++) {
        thaiformat[i] = dateArray[i].toLocaleDateString('th-TH', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long',
        })
        head[i] = (thaiformat[i].toString()).split("ที่").slice(0, 1)
    }


    for (var i = 0; i < dateArray.length; i++) {
        if (dateArray[0] - DateSorting[i] == 0) {
            state[0] = true
            console.log(i)

        }
        if (dateArray[1] - DateSorting[i] == 0) {
            state[1] = true
            console.log(i)

        }
        if (dateArray[2] - DateSorting[i] == 0) {
            state[2] = true
            console.log(i)

        }
        if (dateArray[3] - DateSorting[i] == 0) {
            state[3] = true
            console.log(i)

        }
        if (dateArray[4] - DateSorting[i] == 0) {
            state[4] = true
            console.log(i)

        }
        if (dateArray[5] - DateSorting[i] == 0) {
            state[5] = true
            console.log(i)

        }
        if (dateArray[6] - DateSorting[i] == 0) {
            state[6] = true
            console.log(i)

        }
    }

    console.log(state)
    return (
        <div className="bg-gray-100">
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">

                <div className=" z-10 flex items-baseline justify-between pt-10 pb-6 border-b border-black">
                    <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">ตารางงาน</h1>
                </div>
                <table className="text-left w-full border-collapse bg-white ">
                    <thead className="bg-green-300">
                        <tr>
                            <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">อาทิตย์</th>
                            <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">วันที่</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="hover:bg-grey-lighter">
                            <td className="py-4 px-6 border-b border-grey-light">{head[0]}</td>

                            {state[0] === true ?
                                <td className="py-4 px-6 border-b border-grey-light bg-red-200">
                                    <p className="text-grey-lighter font-bold py-1 px-3 rounded text-xs">{thaiformat[0]}</p>
                                </td>
                                :
                                <td className="py-4 px-6 border-b border-grey-light bg-white">
                                    <p className="text-grey-lighter font-bold py-1 px-3 rounded text-xs">{thaiformat[0]}</p>
                                </td>
                            }

                        </tr>
                        <tr className="hover:bg-grey-lighter">
                            <td className="py-4 px-6 border-b border-grey-light">{head[1]}</td>

                            {state[1] === true ?
                                <td className="py-4 px-6 border-b border-grey-light bg-red-200">
                                    <p className="text-grey-lighter font-bold py-1 px-3 rounded text-xs ">{thaiformat[1]}</p>
                                </td>
                                :
                                <td className="py-4 px-6 border-b border-grey-light bg-white">
                                    <p className="text-grey-lighter font-bold py-1 px-3 rounded text-xs ">{thaiformat[1]}</p>
                                </td>
                            }

                        </tr>
                        <tr className="hover:bg-grey-lighter">
                            <td className="py-4 px-6 border-b border-grey-light">{head[2]}</td>

                            {state[2] === true ?
                                <td className="py-4 px-6 border-b border-grey-light bg-red-200">
                                    <p className="text-grey-lighter font-bold py-1 px-3 rounded text-xs ">{thaiformat[2]}</p>
                                </td>
                                :
                                <td className="py-4 px-6 border-b border-grey-light bg-white">
                                    <p className="text-grey-lighter font-bold py-1 px-3 rounded text-xs ">{thaiformat[2]}</p>
                                </td>
                            }

                        </tr>
                        <tr className="hover:bg-grey-lighter">
                            <td className="py-4 px-6 border-b border-grey-light">{head[3]}</td>

                            {state[3] === true ?
                                <td className="py-4 px-6 border-b border-grey-light bg-red-200">
                                    <p className="text-grey-lighter font-bold py-1 px-3 rounded text-xs ">{thaiformat[3]}</p>
                                </td>
                                :
                                <td className="py-4 px-6 border-b border-grey-light bg-white">
                                    <p className="text-grey-lighter font-bold py-1 px-3 rounded text-xs ">{thaiformat[3]}</p>
                                </td>
                            }

                        </tr>
                        <tr className="hover:bg-grey-lighter">
                            <td className="py-4 px-6 border-b border-grey-light">{head[4]}</td>
                            {state[4] === true ?
                                <td className="py-4 px-6 border-b border-grey-light bg-red-200">
                                    <p className="text-grey-lighter font-bold py-1 px-3 rounded text-xs ">{thaiformat[4]}</p>
                                </td>
                                :
                                <td className="py-4 px-6 border-b border-grey-light bg-white">
                                    <p className="text-grey-lighter font-bold py-1 px-3 rounded text-xs ">{thaiformat[4]}</p>
                                </td>
                            }

                        </tr>
                        <tr className="hover:bg-grey-lighter">
                            <td className="py-4 px-6 border-b border-grey-light">{head[5]}</td>

                            {state[5] === true ?
                                <td className="py-4 px-6 border-b border-grey-light bg-red-200">
                                    <p className="text-grey-lighter font-bold py-1 px-3 rounded text-xs ">{thaiformat[5]}</p>
                                </td>
                                :
                                <td className="py-4 px-6 border-b border-grey-light bg-white">
                                    <p className="text-grey-lighter font-bold py-1 px-3 rounded text-xs ">{thaiformat[5]}</p>
                                </td>
                            }

                        </tr>
                        <tr className="hover:bg-grey-lighter">
                            <td className="py-4 px-6 border-b border-grey-light">{head[6]}</td>

                            {state[6] === true ?
                                <td className="py-4 px-6 border-b border-grey-light bg-red-200">
                                    <p className="text-grey-lighter font-bold py-1 px-3 rounded text-xs">{thaiformat[6]}</p>
                                </td>
                                :
                                <td className="py-4 px-6 border-b border-grey-light bg-white">
                                    <p className="text-grey-lighter font-bold py-1 px-3 rounded text-xs">{thaiformat[6]}</p>
                                </td>
                            }

                        </tr>
                    </tbody>
                </table>
            </main>
        </div>


    )
}

export default TimeTable
