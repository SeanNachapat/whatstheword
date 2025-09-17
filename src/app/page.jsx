'use client'

import { useState, useRef } from 'react';

const ButtonComponents = ({
      text=""
}) => {
      return (
            <div className="border border-black/20 py-2 px-5 rounded flex justify-center items-center hover:bg-black/10 transition-all hover:border-black/50 cursor-pointer">
                  <div className="text-xl">
                        {text}
                  </div>
            </div>
      )
}

const App = () => {

      const [wordInput, setWordInput] = useState("");
      const [word, setWord] = useState(['a', 'b', 'c','a', 'b', 'c','a', 'b', 'c','a', 'b', 'c'])
      const inputRef = useRef([]);

      const ChangeWord = () => {

      }
      
      return (
            <>

                  <div className="absolute h-full top-0 left-0 p-5 flex flex-col gap-5 justify-center items-center">
                        {
                              ['m','o','c','k'].map((item, index) => {
                                    return (
                                          <>
                                                <span className="text-6xl opacity-25">
                                                      {item}
                                                </span>
                                          </>
                                    )
                              })
                        }
                  </div>
                  <div className="w-screen h-screen flex justify-center items-center flex-col gap-8">
                        <div className="text-5xl text-black font-bold">
                              ช่วยทายหน่อยคำนี้แปลว่าอะไร ?
                        </div>

                        <div className="flex flex-row gap-3 justify-center">
                              {
                                    ((!word || word.length !== 0) ? word.map((it, idx) => {
                                          return (
                                                <>
                                                      <input
                                                            type="text"
                                                            className="border-b border-black/20 focus:outline-none focus:border-black transition w-12 text-center text-5xl"
                                                            maxLength="1"
                                                            ref={(el) => inputRef.current[idx] = el}
                                                            
                                                      />
                                                </>
                                          )
                                    }) : "")
                              }
                        </div>

                        <div className="flex gap-2 items-center">
                              <ButtonComponents text="สุ่มคำศัพท์" />
                              <ButtonComponents text="ยืนยันคำศัพท์" />
                        </div>

                        <div className="flex items-center">
                              <div className="text-sm">
                                    คำแนะนำ :
                              </div>
                              <div className="text-md">
                                    ทายให้ถูกนะแจ๊ะ
                              </div>
                        </div>
                  </div>
            </>
      )
}

export default App;