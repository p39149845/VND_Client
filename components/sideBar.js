import React from 'react'
import Link from 'next/link'

function SideBar() {
    return (
        <div className="bg-white mb-10">
        <nav className="flex flex-col sm:flex-row">
          <button className="text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none text-blue-500 border-b-2 font-medium border-blue-500">
            <Link href='/requestList/history' >
            รายการทั้งหมด
          </Link>
          </button>
          <button className="text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none text-blue-500 border-b-2 font-medium border-blue-500">
            <Link  href='/requestList'>
            รอการตอบรับ
          </Link>
          </button>
          <button className="text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none text-blue-500 border-b-2 font-medium border-blue-500">
            <Link href='/requestList/requestStage1' >
            ระหว่างเดินทาง
          </Link>
          </button>
          <button className="text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none text-blue-500 border-b-2 font-medium border-blue-500">
            <Link  href='/requestList/requestStage2'>
            ให้คะแนนความพึงพอใจ
          </Link>
          </button>
        </nav>
      </div>
    )
}

export default SideBar
