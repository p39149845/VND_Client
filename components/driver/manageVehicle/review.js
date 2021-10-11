import React from 'react'
import ReviewItem from './reviewItem'

function review({ vehicle }) {
    console.log(vehicle.user.review, "test")
    return (
        <div className="bg-gray-100 min-h-screen">
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className=" z-10 flex items-baseline justify-between pt-10 pb-6 border-b border-black">
                    <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">ความคิดเห็น</h1>
                </div>

                <section aria-labelledby="products-heading" className="pt-6 pb-24 ">
                    <div className="grid grid-cols-1 lg:grid-cols-10 gap-x-8 gap-y-10 min-w-screen">
                        <div className="lg:col-span-1"></div>
                        <div className="lg:col-span-8">
                            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 lg:h-full">
                                <div className="flex flex-col">

                                    <div className="flex flex-col">
                                        <div className="my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                            <div className=" align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                                    <table className="min-w-full divide-y divide-gray-200">
                                                        <thead className="bg-blue-500">
                                                            <tr>
                                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                                                    คะแนน
                                                                </th>
                                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                                                    ความคิดเห็น
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody className="bg-white divide-y divide-gray-200">
                                                            {vehicle &&
                                                                vehicle.user &&
                                                                vehicle.user.review &&
                                                                vehicle.user.review
                                                                    .map(review => (
                                                                        <ReviewItem review={review} key={review.id} />
                                                                    ))}
                                                        </tbody>

                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-1"></div>
                    </div>

                </section>
            </main>
        </div>
    )
}

export default review
