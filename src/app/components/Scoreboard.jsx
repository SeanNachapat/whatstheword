'use client'
import { useEffect, useState } from 'react'
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { MdLocalFireDepartment } from "react-icons/md";

const RankingCard = ({ rank = 0, name = "", correct = 0, wrong = 0 , streak = 0}) => {
      return (
            <div className="grid grid-cols-4 p-2 border border-black items-center">
                  <div className="text-lg font-light">
                        #{rank} {name}
                  </div>
                  <div className="text-lg font-light text-green-700 text-center">
                        {correct}
                  </div>
                  <div className="text-lg font-light text-red-700 text-center">
                        {wrong}
                  </div>
                  <div className="text-lg font-light text-orange-700 text-center">
                        {streak}
                  </div>
            </div>
      )
}

const ScoreBoard = () => {
      const [users, setUsers] = useState([])

      useEffect(() => {
            const raw = localStorage.getItem("users")
            if (raw) {
                  try {
                        const parsed = JSON.parse(raw).map(u =>
                              typeof u === "string" ? JSON.parse(u) : u
                        )
                        setUsers(parsed)
                  } catch (e) {
                        console.error("Bad users data in localStorage", e)
                        setUsers([])
                  }
            }
      }, [])

      return (
            <div className="top-0 right-0 min-h-96 bg-white p-3 m-3 text-4xl">

                  <div className="grid grid-cols-4 p-2 items-center">
                        <div className="text-lg font-light">Name</div>
                        <div className="flex justify-center items-center">
                              <FaCheck className='text-green-600 text-2xl'/>
                        </div>
                        <div className="flex justify-center items-center">
                              <ImCross className='text-red-600 text-xl'/>
                        </div>
                        <div className="flex justify-center items-center">
                              <MdLocalFireDepartment className='text-orange-600 text-3xl'/>
                        </div>
                  </div>
                  <hr className="w-full border-black border-1" />

                  <div className="flex gap-2 flex-col mt-3 overflow-y-auto h-full">
                        {users.length > 0
                              ? users.map((item, idx) => (
                                    <RankingCard
                                          key={idx}
                                          name={item.name}
                                          rank={idx + 1}
                                          correct={item.correct}
                                          wrong={item.wrong}
                                          streak={item.streak}
                                    />
                              ))
                              : <div className="text-lg font-light text-gray-500 p-2">No users yet</div>}
                  </div>
            </div>
      )
}

export default ScoreBoard
