import React, { useContext, useState } from 'react'
import { AuthContext } from "../../appState/AuthProvider"
import { useQuery } from '@apollo/react-hooks'
import { ME } from '../gql/query'

function TimeTable() {
    const { user } = useContext(AuthContext)

    var head = new Array
    var thaiformat = new Array
    const workDays = new Array()
    const toDay = new Date
    toDay.setHours(0, 0, 0, 0);

    const [state] = useState({
        day1: false,
        day2: false,
        day3: false,
        day4: false,
        day5: false,
        day6: false,
        day7: false,
    })

   if(user){
    for (var i = 0; i < user.workDay.length; i++) {
        workDays.push(user.workDay[i])
    }
   }

    if (workDays.length > 0) {
        for (var i = 0; i < workDays.length; i++) {
            const DayFormat = (workDays[i].date).split("/")
            workDays[i] = DayFormat[2] + " " + DayFormat[1] + " " + DayFormat[0]
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
            state.day1 = true
            break
        } else state.day1 = false
    }

    for (var i = 0; i < dateArray.length; i++) {
        if (dateArray[1] - DateSorting[i] == 0) {
            state.day2 = true
            break
        } else state.day2 = false
    }

    for (var i = 0; i < dateArray.length; i++) {
        if (dateArray[2] - DateSorting[i] == 0) {
            state.day3 = true
            break
        } else state.day3 = false
    }

    for (var i = 0; i < dateArray.length; i++) {
        if (dateArray[3] - DateSorting[i] == 0) {
            state.day4 = true
            break
        } else state.day4 = false
    }

    for (var i = 0; i < dateArray.length; i++) {
        if (dateArray[4] - DateSorting[i] == 0) {
            state.day5 = true
            break
        } else state.day5 = false
    }

    for (var i = 0; i < dateArray.length; i++) {
        if (dateArray[5] - DateSorting[i] == 0) {
            state.day6 = true
            break
        } else state.day6 = false
    }

    for (var i = 0; i < dateArray.length; i++) {
        if (dateArray[6] - DateSorting[i] == 0) {
            state.day7 = true
            break
        } else state.day7 = false
    }

    return (
        <div className="w-2/3 mx-auto">
            <div className="bg-white shadow-md rounded my-6">
                <table className="text-left w-full border-collapse">
                    <thead>
                        <tr>
                            <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">อาทิตย์</th>
                            <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">วันที่</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="hover:bg-grey-lighter">
                            <td className="py-4 px-6 border-b border-grey-light">{head[0]}</td>

                            {state.day1 === true ?
                                <td className="py-4 px-6 border-b border-grey-light bg-red-200">
                                    <p className="text-grey-lighter font-bold py-1 px-3 rounded text-xs bg-red">{thaiformat[0]}</p>
                                </td>
                                :
                                <td className="py-4 px-6 border-b border-grey-light bg-white">
                                    <p className="text-grey-lighter font-bold py-1 px-3 rounded text-xs bg-red">{thaiformat[0]}</p>
                                </td>
                            }

                        </tr>
                        <tr className="hover:bg-grey-lighter">
                            <td className="py-4 px-6 border-b border-grey-light">{head[1]}</td>

                            {state.day2 === true ?
                                <td className="py-4 px-6 border-b border-grey-light bg-red-200">
                                    <p className="text-grey-lighter font-bold py-1 px-3 rounded text-xs bg-red">{thaiformat[1]}</p>
                                </td>
                                :
                                <td className="py-4 px-6 border-b border-grey-light bg-white">
                                    <p className="text-grey-lighter font-bold py-1 px-3 rounded text-xs bg-red">{thaiformat[1]}</p>
                                </td>
                            }

                        </tr>
                        <tr className="hover:bg-grey-lighter">
                            <td className="py-4 px-6 border-b border-grey-light">{head[2]}</td>

                            {state.day3 === true ?
                                <td className="py-4 px-6 border-b border-grey-light bg-red-200">
                                    <p className="text-grey-lighter font-bold py-1 px-3 rounded text-xs bg-red">{thaiformat[2]}</p>
                                </td>
                                :
                                <td className="py-4 px-6 border-b border-grey-light bg-white">
                                    <p className="text-grey-lighter font-bold py-1 px-3 rounded text-xs bg-red">{thaiformat[2]}</p>
                                </td>
                            }

                        </tr>
                        <tr className="hover:bg-grey-lighter">
                            <td className="py-4 px-6 border-b border-grey-light">{head[3]}</td>

                            {state.day4 === true ?
                                <td className="py-4 px-6 border-b border-grey-light bg-red-200">
                                    <p className="text-grey-lighter font-bold py-1 px-3 rounded text-xs bg-red">{thaiformat[3]}</p>
                                </td>
                                :
                                <td className="py-4 px-6 border-b border-grey-light bg-white">
                                    <p className="text-grey-lighter font-bold py-1 px-3 rounded text-xs bg-red">{thaiformat[3]}</p>
                                </td>
                            }

                        </tr>
                        <tr className="hover:bg-grey-lighter">
                            <td className="py-4 px-6 border-b border-grey-light">{head[4]}</td>
                            {state.day5 === true ?
                                <td className="py-4 px-6 border-b border-grey-light bg-red-200">
                                    <p className="text-grey-lighter font-bold py-1 px-3 rounded text-xs bg-red">{thaiformat[4]}</p>
                                </td>
                                :
                                <td className="py-4 px-6 border-b border-grey-light bg-white">
                                    <p className="text-grey-lighter font-bold py-1 px-3 rounded text-xs bg-red">{thaiformat[4]}</p>
                                </td>
                            }

                        </tr>
                        <tr className="hover:bg-grey-lighter">
                            <td className="py-4 px-6 border-b border-grey-light">{head[5]}</td>

                            {state.day6 === true ?
                                <td className="py-4 px-6 border-b border-grey-light bg-red-200">
                                    <p className="text-grey-lighter font-bold py-1 px-3 rounded text-xs bg-red">{thaiformat[5]}</p>
                                </td>
                                :
                                <td className="py-4 px-6 border-b border-grey-light bg-white">
                                    <p className="text-grey-lighter font-bold py-1 px-3 rounded text-xs bg-red">{thaiformat[5]}</p>
                                </td>
                            }

                        </tr>
                        <tr className="hover:bg-grey-lighter">
                            <td className="py-4 px-6 border-b border-grey-light">{head[6]}</td>

                            {state.day7 === true ?
                                <td className="py-4 px-6 border-b border-grey-light bg-red-200">
                                    <p className="text-grey-lighter font-bold py-1 px-3 rounded text-xs bg-red">{thaiformat[6]}</p>
                                </td>
                                :
                                <td className="py-4 px-6 border-b border-grey-light bg-white">
                                    <p className="text-grey-lighter font-bold py-1 px-3 rounded text-xs bg-red">{thaiformat[6]}</p>
                                </td>
                            }

                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TimeTable
