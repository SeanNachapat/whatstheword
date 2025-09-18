'use client'
import { useEffect, useState } from 'react'

const RankingCard = ({ rank = 0, name = "", correct = 0, wrong = 0 }) => {
      return (
            <div className="grid grid-cols-3 p-2 border border-black items-center">
                  <div className="text-lg font-light">
                        #{rank} {name}
                  </div>
                  <div className="text-lg font-light text-green-700 text-center">
                        {correct}
                  </div>
                  <div className="text-lg font-light text-red-700 text-center">
                        {wrong}
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
            <div className="absolute top-0 right-0 w-96 min-h-96 bg-white p-6 m-6 text-4xl">

                  <div className="grid grid-cols-3 p-2 items-center">
                        <div className="text-lg font-light">Name</div>
                        <div className="text-lg font-light text-center">Correct</div>
                        <div className="text-lg font-light text-center">Wrong</div>
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
                                    />
                              ))
                              : <div className="text-lg font-light text-gray-500 p-2">No users yet</div>}
                  </div>
            </div>
      )
}

export default ScoreBoard
