import React, { useState } from 'react'
import { useMutation } from "@apollo/react-hooks"
import { CREATE_REVIEW } from "../../gql/mutation"
import { Rating } from 'react-simple-star-rating'

function Review({ request }) {
    console.log("ForReview", request)

    const [review, setReview] = useState({
        star: '',
        review: '',
    })
    const [reviewVehicles, setReviewVehicles] = useState({
        starVehicle: "",
        reviewVehicle: "",
    })
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
                    review: review.review,
                    reviewVehicle: reviewVehicles.reviewVehicle
                }
            })
            console.log(result)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <form className="bg-white px-3 py-3 my-3 mx-20">
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
                </div>
                <div className="mb-3">
                <select
                        name="review"
                        value={review.reivew}
                        onChange={handleChange}
                        className="form-select">
                        <option value="ไม่มี" >รีวิว</option>
                        <option value="สุภาพเรียบร้อย" >สุภาพเรียบร้อย</option>
                        <option value="ตรงเวลา">ตรงเวลา</option>
                        <option value="้เอาใจใส่ผู้โดยสาร">้เอาใจใส่ผู้โดยสาร</option>
                    </select>
                </div>

                <div className="flex items-center  font-semibold text-gray-900 leading-8">
                    <span clas="text-green-500">
                        <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </span>
                    <span className="tracking-wide">ให้คำแนนรถ</span>
                </div>
                <div className="flex items-center  font-semibold text-gray-900 leading-8">
                    <Rating onClick={handleRatingVehicle} ratingValue={reviewVehicles.starVehicle} />
                </div>
                <div className="mb-3">
                <select
                        name="reviewVehicle"
                        value={reviewVehicles.reviewVehicle}
                        onChange={handleChangeVehicle}
                        className="form-select">
                        <option value="ไม่มี" >รีวิว</option>
                        <option value="สะอาดเรียบร้อย" >สะอาดเรียบร้อย</option>
                        <option value="สภาพรถดี">สภาพรถดี</option>
                        <option value="บรรยากาศภายในรถดี">บรรยากาศดี</option>
                    </select>
                </div>
                <button type="button" className="btn btn-primary" onClick={() => handleReview()}>ส่งรีวิว</button>
            </form>
        </div>
    )
}

export default Review
