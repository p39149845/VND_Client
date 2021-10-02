import React from 'react'
import Link from 'next/link'

function DsideBar() {
    return (
        <div className="bg-white mb-10">
        <nav className="flex flex-col sm:flex-row justify-around">
          <button className="text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none text-blue-500 font-medium font-bold">
            <Link href='/DrequestList/history' >
            รายการทั้งหมด
          </Link>
          </button>
          <button className="text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none text-blue-500 font-medium font-bold">
            <Link  href='/DrequestList'>
            รอการตอบรับ
          </Link>
          </button>
          <button className="text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none text-blue-500 font-medium font-bold">
            <Link href='/DrequestList/requestStage1' >
            ระหว่างเดินทาง
          </Link>
          </button>
          <button className="text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none text-blue-500 font-medium font-bold">
            <Link  href='/DrequestList/requestStage2'>
            ให้คะแนนความพึงพอใจ
          </Link>
          </button>
        </nav>
      </div>
    )
}

export default DsideBar