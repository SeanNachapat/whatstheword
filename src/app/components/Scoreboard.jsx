'use client'
import { useEffect, useState } from 'react'

const RankingCard = ({
      rank=0,
      name="",
      correct=0,
      wrong=0
}) => {
      return (
            <>
                  <div className="p-2 border border-black flex justify-between items-center">
                        <div className="text-lg font-light">
                              #{rank} {name}
                        </div>
                        <div className="text-lg font-light text-green-700">
                              {correct}
                        </div>
                        <div className="text-lg font-light text-red-700">
                              {wrong}
                        </div>
                  </div>
            </>
      )
}

const ScoreBoard = () => {

      const getUser = localStorage.getItem("users")

      const [users, setUsers] = useState(undefined);

      useEffect(() => {
            setUsers(JSON.parse(getUser))
      }, [getUser])

      return (
            <>
                  <div className="absolute top-0 right-0 w-96 min-h-96 bg-white shadow-md p-6 m-6 text-4xl">
                        <div className="p-2 flex justify-between items-center">
                              <div className="text-lg font-light">
                                    Name
                              </div>
                              <div className="text-lg font-light">
                                    Correct
                              </div>
                              <div className="text-lg font-light">
                                    Wrong
                              </div>
                        </div>
                        <hr className="w-full border-black border-1" />

                        <div className="flex gap-2 flex-col mt-3 overflow-y-auto h-full">
                              {
                                    ((users) ? users.map((item, idx) => {
                                          return (
                                                <RankingCard name={item.name} rank={idx} correct={item.correct} wrong={item.wrong} />
                                          )
                                    }) : null)
                              }
                        </div>
                  </div>
            </>
      )
}

export default ScoreBoard;