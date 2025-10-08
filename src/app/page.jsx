'use client'

import { useState, useRef, useEffect } from 'react';
import Allwords from './word';
import ScoreBoard from './components/Scoreboard';
import Progress from './components/Progress';
import { HiOutlineBars3 } from "react-icons/hi2";

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
            definition: '',
            partOfSpeech: '',
            level: ''
      })
      const inputRef = useRef([]);
      const [shake, setShake] = useState(false);
      const [isCorrect, setIsCorrect] = useState(false);

      const [tryWord, setTryWord] = useState(0)

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
      }, [])

      const RandomWord = () => {
            const Rand = Math.floor(Math.random() * Allwords.length)
            const newWord = Allwords[Rand].word.split("")

            setWord({
                  word: newWord,
                  translation: Allwords[Rand].translation,
                  definition: Allwords[Rand].definition,
                  partOfSpeech: Allwords[Rand].partOfSpeech,
                  level: Allwords[Rand].level
            })
            setWordInput(Array(newWord.length).fill(""))
            setIsCorrect(false);
            setTryWord(0);
            inputRef.current = []
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
                        setTryWord(prev => prev + 1);
                  }
            }
      }

      const handleCheckWord = () => {
            const wordip_str = wordInput.toString()
            const withOutComm = wordip_str.replace(/,/g, "")
            const wordorg_str = (word.word).toString()
            const withOutCommOrg = wordorg_str.replace(/,/g, "")

            if (withOutCommOrg == withOutComm) {
                  setIsCorrect(true)
                  inputRef.current[0].focus()
                  setTryWord(0);
                  setUserInLocal({
                        isCorrect: true
                  })
                  setTimeout(() => {
                        RandomWord()
                  }, 300);
            } else {
                  triggerShake()
                  setTryWord(prev => prev + 1);
            }
      }

      const SeeAnswer = () => {
            for (let index = 0; index < (word.word).length; index++) {
                  setWordInput([...word.word])
                  setTryWord(0);
                  setUserInLocal({
                        isCorrect: false
                  })
                  setTimeout(() => {
                        RandomWord()
                  }, 1300);
            }
      }
      const setUserInLocal = ({ isCorrect = false }) => {
            let users = JSON.parse(localStorage.getItem("users")) || [];
            users = users.map(u => (typeof u === "string" ? JSON.parse(u) : u));

            const name = localStorage.getItem("name");
            let user = users.find(d => d.name === name);

            if (user) {
                  if (isCorrect) {
                        user.correct = (user.correct || 0) + 1;
                        user.streak = (user.streak || 0) + 1;
                  } else {
                        user.wrong = (user.wrong || 0) + 1;
                        user.streak = 0;
                  }
            } else {
                  const enteredName = window.prompt("Name rai i nong ?");
                  if (enteredName && enteredName.trim() !== "") {
                        user = {
                              name: enteredName,
                              correct: isCorrect ? 1 : 0,
                              wrong: isCorrect ? 0 : 1,
                              streak: isCorrect ? 1 : 0,
                        };
                        users.push(user);
                        localStorage.setItem("name", enteredName);
                  }
            }

            localStorage.setItem("users", JSON.stringify(users));
      };

      function countVocabularyByLevel(data) {
            const counts = { A1: 0, A2: 0, B1: 0, B2: 0, C1: 0, C2: 0 };
            
            Allwords.forEach(word => {
                  if (counts.hasOwnProperty(word.level)) {
                  counts[word.level]++;
                  }
            });
            
            return counts;
      }

      // Get counts
      const levelCounts = countVocabularyByLevel(Allwords);
      const totalWords = Object.values(levelCounts).reduce((sum, count) => sum + count, 0);



      return (
            <>
                  {/* <Progress timer={0} /> */}
                  {/* <button
                  className='text-2xl text-black absolute flex top-0 right-0 p-2 m-5 outline outline-1 rounded-lg hover:scale-105 transition-all'>
                        <HiOutlineBars3 />
                  </button> */}
                  <ScoreBoard/>
                  <div className="w-screen h-screen flex justify-center items-center flex-col gap-8">
                        <div className="text-2xl md:text-5xl text-black/70 font-bold">
                              ช่วยทายหน่อยคำนี้แปลว่าอะไร ?
                        </div>

                        <div className="flex flex-col gap-6 items-center">
                              <div className="text-2xl md:text-4xl text-black font-bold underline">
                                    {word.translation == "" ? '...' : word.translation}
                              </div>
                              <div className="text-md md:text-2xl text-black/50 font-bold flex gap-6">
                                    <div className='flex gap-2'>ระดับคำศัพท์​ : <div className="underline">{word.level == "" ? '...' : word.level}</div></div>
                                    <div className='flex gap-2'>ประเภทของคำ : <div className="underline italic">{word.partOfSpeech == "" ? '...' : word.partOfSpeech}</div></div>

                              </div>
                        </div>

                        <div className={`flex flex-row gap-3 justify-center items-center ${shake && !isCorrect ? 'animate-shake text-red-600' : ((isCorrect) ? 'text-green-700' : "")}`}>
                              {
                                    ((!word.word || word.word.length !== 0) ? word.word.map((it, idx) => {
                                          return (
                                                <>
                                                      <input
                                                            type="text"
                                                            value={wordInput[idx]}
                                                            className="border-b border-black/40 focus:outline-none focus:border-black transition w-6 md:w-12 text-center text-2xl md:text-5xl"
                                                            maxLength="1"
                                                            ref={(el) => inputRef.current[idx] = el}
                                                            onChange={(e) => onChangeText(e, idx)}
                                                            onKeyDown={(e) => onBackSpace(e, idx)}
                                                      />
                                                </>
                                          )
                                    }) : "")
                              }
                              <div className="text-2xl md:text-5xl">
                                    x {tryWord}
                              </div>
                        </div>

                        <div className="flex items-center gap-3">
                              <div className="text-xl">
                                    จำนวนตัวอักษร :
                              </div>
                              <div className="text-3xl underline font-bold">
                                    {word.word.length}
                              </div>
                              <div className="text-xl">
                                    ตัว
                              </div>
                        </div>
                        <div className="flex items-center gap-3 text-lg text-black/50">
                              <div className="">
                                    คำอธิบายภาษาอังกฤษ :
                              </div>
                              <div className=" underline italic font-light">
                                    {word.definition}
                              </div>
                        </div>

                        <div className="flex gap-2 items-center flex-wrap justify-center">
                              <ButtonComponents onClick={() => RandomWord()} text="สุ่มคำศัพท์" />
                              <ButtonComponents onClick={() => handleCheckWord()} text="ยืนยันคำศัพท์" />
                              {
                                    ((tryWord >= 3) ? <ButtonComponents onClick={() => SeeAnswer()} text="เฉลย" /> : null)
                              }
                        </div>
                        <div className="flex gap-5 text-sm text-gray-400">
                              <div className="flex gap-2"> 
                                    <div className="">
                                          A1 - A2 :
                                    </div>
                                    <div className=" underline italic font-light">
                                          {levelCounts.A1 + levelCounts.A2}
                                    </div>
                              </div>
                              <div className="flex gap-2"> 
                                    <div className="">
                                          B1 - B2 :
                                    </div>
                                    <div className=" underline italic font-light">
                                          {levelCounts.B1 + levelCounts.B2}
                                    </div>
                              </div>
                              <div className="flex gap-2"> 
                                    <div className="">
                                          C1 - C2 :
                                    </div>
                                    <div className=" underline italic font-light">
                                          {levelCounts.C1 + levelCounts.C2}
                                    </div>
                              </div>
                              
                        </div>
                  </div>
            </>
      )
}

export default App;