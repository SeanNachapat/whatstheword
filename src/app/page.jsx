'use client'

import { useState, useRef, useEffect } from 'react';
import Allwords from './word';

const ButtonComponents = ({
      text = "",
      onClick
}) => {
      return (
            <div className="border border-black/20 py-2 px-5 rounded flex justify-center items-center hover:bg-black/10 transition-all hover:border-black/50 cursor-pointer" onClick={onClick}>
                  <div className="text-xl">
                        {text}
                  </div>
            </div>
      )
}

const App = () => {

      const [wordInput, setWordInput] = useState([]);
      const [word, setWord] = useState({
            word: [],
            translation: '',
            level: ''
      })
      const inputRef = useRef([]);
      const [shake, setShake] = useState(false);
      const [isCorrect, setIsCorrect] = useState(false);

      const triggerShake = () => {
            setShake(true);
            setIsCorrect(false)
            setTimeout(() => setShake(false), 500);
      };

      useEffect(() => {
            // initial
            if (word.word.length == 0) {
                  RandomWord();
            }
      })

      const RandomWord = () => {
            const Rand = Math.floor(Math.random() * Allwords.length)
            const newWord = Allwords[Rand].word.split("")

            setWord({
                  word: newWord,
                  translation: Allwords[Rand].translation,
                  level: Allwords[Rand].level
            })
            setWordInput(Array(newWord.length).fill(""))
            setIsCorrect(false);
            inputRef.current[0].focus()
            inputRef.current = [] // reset refs
      }

      const onChangeText = (e, idx) => {
            const value = e.target.value;

            if (value.length > 1) {
                  e.traget.value = value.charAt(0)
            }

            if (value.length === 1 && idx < inputRef.current.length - 1) {
                  if (inputRef.current[idx + 1]) {
                        inputRef.current[idx + 1].focus()
                  }
            }

            setWordInput((prev) => {
                  const newArr = [...prev]
                  newArr[idx] = value.toLowerCase();

                  return newArr;
            })
      }

      const onBackSpace = (e, idx) => {
            if (e.key == "Backspace" && idx > 0 && !e.target.value) {
                  if (inputRef.current[idx - 1]) {
                        inputRef.current[idx - 1].focus()
                  }
                  setWordInput((prev) => {
                        const newArr = [...prev]
                        newArr[idx] = ""

                        return newArr;
                  })
            }

            if (e.key == "Enter") {
                  if (idx + 1 == word.word.length) {
                        handleCheckWord()

                  } else {
                        // Shake
                        triggerShake()
                  }
            }
      }

      const handleCheckWord = () => {
            const wordip_str = wordInput.toString()
            const withOutComm = wordip_str.replace(/,/g, "")
            const wordorg_str = (word.word).toString()
            const withOutCommOrg = wordorg_str.replace(/,/g, "")

            console.log(wordInput)
            if (withOutCommOrg == withOutComm) {
                  console.log("OK")
                  setIsCorrect(true)
                  setTimeout(() => {
                        RandomWord()
                  }, 300);
            } else {
                  console.log("wrong")
                  triggerShake()
            }
      }

      return (
            <>

                  <div className="absolute h-full top-0 left-0 p-5 flex flex-col gap-5 justify-center items-center">
                        {
                              ['m', 'o', 'c', 'k'].map((item, index) => {
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

                        <div className="flex flex-col gap-6 items-center">
                              <div className="text-4xl text-black font-bold underline">
                                    {word.translation == "" ? '...' : word.translation}
                              </div>
                              <div className="text-2xl text-black/50 font-bold flex gap-2">
                                    ระดับคำศัพท์​ : <div className="underline">{word.level == "" ? '...' : word.level}</div>
                              </div>
                        </div>

                        <div className={`flex flex-row gap-3 justify-center ${shake && !isCorrect ? 'animate-shake text-red-600' : ((isCorrect) ? 'text-green-700' : "")}`}>
                              {
                                    ((!word.word || word.word.length !== 0) ? word.word.map((it, idx) => {
                                          return (
                                                <>
                                                      <input
                                                            type="text"
                                                            value={wordInput[idx]}
                                                            className="border-b border-black/40 focus:outline-none focus:border-black transition w-12 text-center text-5xl"
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
                              <ButtonComponents onClick={() => RandomWord()} text="สุ่มคำศัพท์" />
                              <ButtonComponents onClick={() => handleCheckWord()} text="ยืนยันคำศัพท์" />
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