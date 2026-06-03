// floating chat widget — fixed to bottom-right of every page
import { useState, useEffect, useRef } from 'react'
import { SYSTEM_PROMPT } from '../../constants/haemoBotPrompt'


export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(true)

  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hi, I am HaemoBot 👋 Ask me about haemochromatosis, diet, and iron — I use Irish Haemochromatosis Association guidelines and general nutritional knowledge. I cannot give medical advice.'
    }
  ])

  const [input, setInput] = useState('')

  //ref attached to the bottom of the message list - used to scroll into view
  const bottomRef = useRef(null)

  //scrolls to the bottom every time messages updates
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])


  //sends messages to OpenRouter API and returns the bot's reply
  async function getBotReply(conversationHistory) {
    //only send the last 5 messages for context (plus the system prompt)
    const recentMessages = conversationHistory.slice(-5)

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model: '~anthropic/claude-haiku-latest',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...recentMessages,
        ],
      }),
    })

    const data = await response.json()
    return data.choices[0].message.content
  }

  async function handleSend() {
    //do nothing if the input is empty or just whitespace
    if (!input.trim()) return

    //add the user's message to the list
    const userMessage = { role: 'user', content: input.trim() }
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)

    //clear the input field
    setInput('')

    //call the API and add the bot's reply
    try {
      const reply = await getBotReply(updatedMessages)
      setMessages(prev => [...prev, { role: 'assistant', content: reply }])
    } catch (err) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I couldn\'t connect. Please try again in a moment.'
      }])
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">

      <div className={`mb-4 p-0.5 rounded-2xl bg-gradient-to-br from-pink-500 to-orange-400 shadow-xl transition-all duration-300 origin-bottom-right ${isOpen
        ? 'scale-100 opacity-100'
        : 'scale-0 opacity-0 pointer-events-none'
        }`}>
        <div className="w-80 h-96 bg-white rounded-2xl flex flex-col overflow-hidden">

          {/* header */}
          <div className="bg-red-100 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img
                src="/images/HaemoBot_v1.png"
                alt="HaemoBot"
                className="w-8 h-8 rounded-full object-cover"
              />
              <div>
                <p className="text-stone-800 font-bold text-sm">HaemoBot</p>
                <p className="text-black-500 text-xs">Haemochromatosis dietary assistant</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="bg-red-100 hover:text-white text-lg leading-none"
            >
              ✕
            </button>
          </div>

          {/* message list */}
          <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-2">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`text-sm rounded-2xl px-3 py-2 max-w-xs
              ${message.role === 'user'
                    ? 'bg-red-700 text-white self-end rounded-br-sm'
                    : 'bg-stone-100 text-stone-800 self-start rounded-bl-sm'
                  }`}
              >
                {message.content}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* input bar */}
          <div className="p-2 border-t border-stone-200 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about haemochromatosis..."
              className="flex-1 text-sm bg-stone-100 rounded-full px-3 py-2 outline-none focus:ring-2 focus:ring-red-300"
            />
            <button
              onClick={handleSend}
              className="w-8 h-8 bg-gradient-to-br from-pink-500 to-orange-400 text-white rounded-full flex items-center justify-center text-sm transition-all duration-200 hover:scale-[1.05] hover:shadow-md hover:shadow-pink-500/20 active:scale-[0.95]"
            >
              ↑
            </button>
          </div>

        </div>
      </div>
      

      {/* floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-0.5 rounded-full bg-gradient-to-br from-pink-500 to-orange-400 shadow-lg"
      >
        <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-2xl overflow-hidden">
          {isOpen
            ? '✕'
            : <img src="/images/HaemoBot_v1.png" alt="HaemoBot" className="w-full h-full object=cover" />
          }
        </div>
      </button>

    </div>

  )
}