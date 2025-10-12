import React from 'react'
import { MessageSquarePlus, UserSearch } from 'lucide-react'
import { useChatStore } from '../store/useChatStore'


const NoChatHistoryPlaceHolder = ({name}) => {
    const {setActiveTab} = useChatStore()
  return (
       <div className="flex flex-col items-center justify-center h-full text-center px-6 py-10 text-slate-400">
      {/* Icon */}
      <div className="bg-slate-800/50 p-5 rounded-2xl mb-6 shadow-inner">
        <MessageSquarePlus className="size-10 text-cyan-400" />
      </div>

      {/* Title */}
      <h2 className="text-lg font-semibold text-slate-200 mb-2">
        No Chat History Yet with <h1 className='text-blue-300 text-xl underline'>{name}</h1>
      </h2>

      {/* Description */}
      <p className="text-sm text-slate-400 max-w-sm mb-6">
        Start a new conversation 
      </p>

      {/* Button */}
      <button
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white transition-colors" onClick={()=>setActiveTab("contacts")}
      >
        <UserSearch className="size-4" />
        Find Contacts
      </button>
    </div>
  )
}

export default NoChatHistoryPlaceHolder