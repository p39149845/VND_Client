import React from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import ReguestItem from './reguestItem'
import { ME } from '../../gql/query'
import { waiting } from '../../DataState/status'
import SideBar from '../../DsideBar'


function RequestList() {

  const { data, loading, error } = useQuery(ME)


  return (
    <div className="bg-gray-100 min-h-screen">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className=" z-10 flex items-baseline justify-between pt-10 pb-6 border-b border-black">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">รายการจองรถ <br/>ทั้งหมด</h1>
          </div>

          <section aria-labelledby="products-heading" className="pt-6 pb-24 ">
            <div className="grid grid-cols-1 lg:grid-cols-10 gap-x-8 gap-y-10 min-w-screen">
              <div className="lg:col-span-1"></div>
              <div className="lg:col-span-8"><SideBar />
                <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 lg:h-full">
                  <div className="flex flex-col">
                    <div className="flex flex-row md:grid md:grid-cols-12 rounded-md bg-blue-500 text-white overflow-x-scroll">
                      <div className="px-6 py-4 whitespace-nowrap md:col-span-2">
                      คนขับรถ
                      </div>
                      <div className="px-6 py-4 whitespace-nowrap md:col-span-2">
                        สถานะ
                      </div>
                      <div className="px-6 py-4 whitespace-nowrap md:col-span-2">
                        วันที่เริ่มเดินทาง
                      </div>
                      <div className="px-6 py-4 whitespace-nowrap md:col-span-2">
                        วันที่จบการเดินทาง
                      </div>
                      <div className="px-6 py-4 whitespace-nowrap md:col-span-2">
                        ราคา
                      </div>
                      <div className="px-6 py-4 whitespace-nowrap md:col-span-2">

                      </div>
                    </div>

                  {data &&
                    data.user &&
                    data.user.requests &&
                    data.user.requests
                      .filter(
                        function (requests) {
                          if (requests.status === waiting) {
                            return requests
                          }
                        }
                      )
                      .map(request => (
                        <ReguestItem request={request} key={request.id} />
                      ))}

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

export default RequestList
