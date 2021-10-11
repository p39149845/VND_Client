import React from 'react'
import { RatingView } from 'react-simple-star-rating'

function reviewItem({review}) {

    console.log(review)
    return (
        <tr>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-xs leading-5 font-semibold rounded-full text-black">คะแนนคนขับ :  <RatingView ratingValue={review.star} fillColor='red' /></div>
                <div className="text-xs leading-5 font-semibold rounded-full text-black">คะแนนรถตู้ : <RatingView ratingValue={review.starVehicle} fillColor='red' /></div> 
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-xs leading-5 font-semibold rounded-full text-black">ความคิดเห็น : {review.review}</div>
                <div className="text-xs leading-5 font-semibold rounded-full text-black">ความคิดเห็น : {review.reviewVehicle}</div>
            </td>
        </tr>
    )
}

export default reviewItem
