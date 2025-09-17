'use client'

import { useState, useRef, useEffect } from 'react';
import Allwords from './word';

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

      const [wordInput, setWordInput] = useState([]);
      const [word, setWord] = useState({
            word : [],
            translation : '',
            level : ''
      })
      const inputRef = useRef([]);

      useEffect(() => {
            console.log(Allwords)
            // initial
            if (word.word.length == 0) {
                  RandomWord();
            }
      })

      const RandomWord = () => {
            const Rand = Math.floor(Math.random() * Allwords.length)
            setWord({
                  word : Allwords[Rand].word.split(""),
                  translation: Allwords[Rand].translation,
                  level : Allwords[Rand].level
            })

            return 0;
      }

      const onChangeText = (e, idx) => {
            const value = e.target.value;

            if (value.length > 1) {
                  e.traget.value = value.charAt(0)
            }

            if (value.length === 1 && idx < inputRef.current.length - 1) {
                  inputRef.current[idx + 1].focus()
            }

            setWordInput((prev) => {
                  const newArr = [...prev]
                  newArr[idx] = value

                  return newArr;
            })
      }

      const onBackSpace = (e, idx) => {
            if (e.key == "Backspace" && idx > 0 && !e.target.value) {
                  inputRef.current[idx - 1].focus();
                  setWordInput((prev) => {
                        const newArr = [...prev]
                        newArr[idx] = ""

                        return newArr;
                  })
            }

            if (e.key == "Enter") {
                  if (idx + 1 == word.word.length) {
                        console.log("Send")
                  } else {
                        // Shake
                        console.log("Shake")
                  }
            }
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
                        <div className="text-5xl text-black/70 font-bold">
                              ช่วยทายหน่อยคำนี้แปลว่าอะไร ?
                        </div>

                        <div className="text-4xl text-black font-bold underline">
                              {word.translation == "" ? '...' : word.translation}
                        </div>

                        <div className="flex flex-row gap-3 justify-center">
                              {
                                    ((!word.word || word.word.length !== 0) ? word.word.map((it, idx) => {
                                          return (
                                                <>
                                                      <input
                                                            type="text"
                                                            className="border-b border-black/20 focus:outline-none focus:border-black transition w-12 text-center text-5xl"
                                                            maxLength="1"
                                                            ref={(el) => inputRef.current[idx] = el}
                                                            onChange={(e) => onChangeText(e, idx)}
                                                            onKeyDown={(e) => onBackSpace(e, idx)}
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