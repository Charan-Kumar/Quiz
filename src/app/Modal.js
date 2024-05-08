import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, useEffect } from 'react'

export default function Modal({ isOpen, setIsOpen, question, round, data, setData}) {

  const [ showAnswer, setShowAnswer] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  useEffect(() => {
    setShowAnswer(false)
  }, [question])
  

  const onSubmit = () => {

    let newData;
    let newRoundData = data.find((obj) => obj.roundTitle === round)

    if(newRoundData){
      let newRoundQuestions = newRoundData.questions.map((q) => {
        if(q.id === question.id){
          return { ...q, is_answered: true }
        }else{
          return q
        }
      })

      newRoundData.questions = newRoundQuestions


      newData = data.map((r) => {
        if(r.roundTitle === round){
          return newRoundData
        }else{
          return r
        }
      })
    }

    console.log(newData)

    setData(newData)
    setIsOpen(false)

  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
    <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        >
        <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
            >
            <Dialog.Panel className="w-full min-h-2 transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                as="h3"
                className="text-3xl font-medium leading-6 text-gray-800 text-center"
                >
                Question {question?.id}
                </Dialog.Title>
                <div className="mt-2 text-center">
                    <p className="text-4xl font-bold text-gray-900">
                    {question?.question}
                    </p>
                </div>
                <div className='mt-4'>
                  { showAnswer && <p className='text-center text-3xl text-gray-900'>Answer: {question.answer}</p>}
                </div>

            
                <div className="mt-4 flex justify-end gap-4">
                <button
                    type="button"
                    className="rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={() => setShowAnswer(true)}
                >
                    Show
                </button>
                <button
                    type="button"
                    className="rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={onSubmit}
                >
                    Done
                </button>
                </div>
            </Dialog.Panel>
            </Transition.Child>
        </div>
        </div>
    </Dialog>
    </Transition>
  )
}
