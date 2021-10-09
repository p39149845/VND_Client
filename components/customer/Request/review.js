import React, { useState } from 'react'
import { useMutation } from "@apollo/react-hooks"
import { CREATE_REVIEW } from "../../gql/mutation"
import { Rating } from 'react-simple-star-rating'

function Review({ request }) {
    console.log("ForReview", request)

    const [status, setstatus] = useState(false)
    const [statusV, setstatusV] = useState(false)

    const [review, setReview] = useState({
        star: '',
        review: '',
        reviewOp: ''
    })
    const [reviewVehicles, setReviewVehicles] = useState({
        starVehicle: "",
        reviewVehicle: "",
        reviewVehicleOp: ""
    })
    var reviewInput = ""
    var reviewInputV = ""

    if (status) {
        reviewInput = review.reviewOp
    } else reviewInput = review.review
    if (statusV) {
        reviewInputV = reviewVehicles.reviewVehicleOp
    } else reviewInputV = reviewVehicles.reviewVehicle

    const handleRating = (star) => {
        setReview({ ...star, star: star })
    }
    const handleRatingVehicle = (starVehicle) => {
        setReviewVehicles({ ...starVehicle, starVehicle: starVehicle })
    }
    console.log(review)
    const [createReview] = useMutation(CREATE_REVIEW, {

    })
    const handleChange = e => { setReview({ ...review, [e.target.name]: e.target.value }) }
    const handleChangeVehicle = e => { setReviewVehicles({ ...reviewVehicles, [e.target.name]: e.target.value }) }

    const handleReview = async () => {
        try {
            const result = await createReview({
                variables: {
                    id: request.targetUser.id,
                    vehicleId: request.targetVehicle.id,
                    star: parseInt(review.star),
                    starVehicle: parseInt(reviewVehicles.starVehicle),
                    review: reviewInput,
                    reviewVehicle: reviewInputV
                }
            })
            console.log(result)
        } catch (error) {
            console.log(error)
        }
    }
    console.log(reviewInput, reviewInputV)
    return (
        <div>
            <form className="bg-gray-100 px-3 p-5">
                <div className="flex items-center  font-semibold text-gray-900 leading-8">
                    <span clas="text-green-500">
                        <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </span>
                    <span className="tracking-wide">ให้คะแนนคนขับรถ</span>

                </div>
                <div className="flex items-center  font-semibold text-gray-900 leading-8">
                    <Rating onClick={handleRating} ratingValue={review.star} />
                    <button
                        type="button"
                        onClick={() => setstatus(!status)}
                        className="bg-green-500 hover:bg-green-700 p-1 rounded text-sm text-white  mx-2"
                    > เพิ่มความคิดเห็น
                    </button>
                </div>
                <div className="mb-3">

                    {
                        status == true ?
                            <input
                                type="text"
                                name="reviewOp"
                                placeholder="ความคิดเห็นอื่นๆ"
                                value={review.reviewOp}
                                onChange={handleChange}
                                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white text-black rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                            : <select
                                name="review"
                                value={review.reivew}
                                onChange={handleChange}
                                className="mt-1 block w-full py-2 px-3 border text-black border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                <option value="ไม่มี" >รีวิว</option>
                                <option value="สุภาพเรียบร้อย" >สุภาพเรียบร้อย</option>
                                <option value="ตรงเวลา">ตรงเวลา</option>
                                <option value="้เอาใจใส่ผู้โดยสาร">เอาใจใส่ผู้โดยสาร</option>
                            </select>
                    }
                </div>

                <div className="flex items-center  font-semibold text-gray-900 leading-8">
                    <span clas="text-green-500">
                        <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </span>
                    <span className="tracking-wide">ให้คะแนนรถ</span>

                </div>
                <div className="flex items-center  font-semibold text-gray-900 leading-8">
                    <Rating onClick={handleRatingVehicle} ratingValue={reviewVehicles.starVehicle} />
                    <button
                        type="button"
                        onClick={() => setstatusV(!statusV)}
                        className="bg-green-500 hover:bg-green-700 p-1 rounded text-sm text-white mx-2"
                    > เพิ่มความคิดเห็น
                    </button>
                </div>
                <div className="mb-3">

                    {
                        statusV == true ?
                            <input
                                type="text"
                                name="reviewVehicleOp"
                                placeholder="ความคิดเห็นอื่นๆ"
                                value={reviewVehicles.reviewVehicleOp}
                                onChange={handleChangeVehicle}
                                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white text-black rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                            : <select
                                name="reviewVehicle"
                                value={reviewVehicles.reviewVehicle}
                                onChange={handleChangeVehicle}
                                className="mt-1 block w-full py-2 px-3 border border-gray-300 text-black bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                <option value="ไม่มี" >รีวิว</option>
                                <option value="สะอาดเรียบร้อย" >สะอาดเรียบร้อย</option>
                                <option value="สภาพรถดี">สภาพรถดี</option>
                                <option value="บรรยากาศภายในรถดี">บรรยากาศดี</option>
                            </select>
                    }
                </div>
                <button type="button" className="btn btn-primary" onClick={() => handleReview()}>ส่งรีวิว</button>
            </form>
        </div>
    )
}

export default Review
