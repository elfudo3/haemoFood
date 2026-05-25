// floating chat widget — fixed to bottom-right of every page
import { useState } from 'react'

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">

      {/* chat window — only visible when open */}
      {isOpen && (
        <div className="mb-4 w-80 h-96 bg-white rounded-2xl shadow-xl border border-stone-200 flex flex-col overflow-hidden">
          
          {/* header */}
          <div className="bg-red-700 px-4 py-3 flex items-center justify-between">
            <div>
              <p className="text-white font-bold text-sm">HaemoBot</p>
              <p className="text-red-200 text-xs">Haemochromatosis dietary assistant</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-red-200 hover:text-white text-lg leading-none"
            >
              ✕
            </button>
          </div>

          {/* body — messages will go here in part 2 */}
          <div className="flex-1 bg-stone-50" />

          {/* footer — input will go here in part 3 */}
          <div className="h-12 bg-white border-t border-stone-200" />

        </div>
      )}

      {/* floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-red-700 hover:bg-red-800 text-white rounded-full shadow-lg flex items-center justify-center text-2xl transition-colors"
      >
        {isOpen ? '✕' : '💬'}
      </button>

    </div>
  )
}