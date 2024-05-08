"use client"
import { useEffect, useState } from "react";
import { QUESTIONS_DATA } from "./data";
import Modal from "./Modal";


export default function Home() {
  const [data, setData] = useState(QUESTIONS_DATA)
  const [questions, setQuestions] = useState([])
  const [question, setQuestion] = useState(null)
  const [rounds, setRounds] = useState(data.map((question) => question.roundTitle))
  const [round, setRound] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const questionClick = (question) => {
    setQuestion(question)
    setIsOpen(true)
  }

  const handleRound = (event) => {
    const roundName = event.target.value
    setRound(roundName)
    const roundData = data.find((obj) => obj.roundTitle === roundName)

    setQuestions(roundData ? roundData.questions : [])

  }

  useEffect(() => {
    if(round !== ''){
      const roundData = data.find((obj) => obj.roundTitle === round)
      setQuestions(roundData ? roundData.questions : [])
    }
  }, [question, data])


  return (
    <main className="flex min-h-screen flex-col items-center p-24 space-y-4">
      <p className="text-3xl fond-bold">Quiz</p>
      <form class="max-w-sm mx-auto">
        <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
        <select value={round} onChange={(e) => handleRound(e)} id="rounds" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option selected>Choose Round</option>
          {rounds.map((round) => <option value={round}>{round}</option>)}
        </select>
      </form>

      <div className=" w-[40%] flex gap-4 flex-wrap">
        {questions.map((question) => (
          <div className={`w-24 h-24 cursor-pointer ${question.is_answered ? 'bg-orange-800' : 'bg-orange-400'}  text-white text-xl font-bold flex items-center justify-center`} onClick={() => questionClick(question)}>
            {question.id}
          </div>
        ))}
      </div>
      {round !== '' &&
        <div className="flex gap-4 mt-40">
          <p>Total Questions: {questions.length}</p>
          <p>Answered: {questions.filter((q) => q.is_answered === true).length}</p>
          <p>Remaning: {questions.filter((q) => q.is_answered === true).length}</p>

        </div>
      }

      <Modal isOpen={isOpen} setIsOpen={setIsOpen} question={question} round={round} data={data} setData={setData} />
    </main>
  );
}
