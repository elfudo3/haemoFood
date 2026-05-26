// floating chat widget — fixed to bottom-right of every page
import { useState } from 'react'

//system prompt — defines the bot's personality and boundaries
const SYSTEM_PROMPT = `You are HaemoBot, a dietary assistant for haemochromatosis patients.

Rules:
- ONLY answer questions about haemochromatosis, iron, and diet
- If asked anything off-topic, politely redirect: "I can only help with haemochromatosis and dietary questions."
- Base advice on the Irish Haemochromatosis Association guidelines
- Explain that heme iron (meat) is absorbed 2-3x more than non-heme iron (plants)
- Recommend tea/coffee with meals to reduce iron absorption
- Advise against vitamin C supplements (but whole fruit is fine)
- Advise against alcohol (increases absorption and liver stress)
- Keep answers short — 2 to 3 sentences max
- End any medical question with: "Always consult your dietitian for personalised advice."
- Never diagnose or prescribe — you are a guide, not a doctor`

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)

  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hi! I\'m HaemoBot. I can help you with questions about haemochromatosis and diet - things like which foods to eat or avoid, how iron absorption works, and practical tips for managing the condition. What would you like to know?'
    }
  ])

  const [input, setInput] = useState('')

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

      {isOpen && (
        <div className="mb-4 w-80 h-96 bg-white rounded-2xl shadow-xl border border-stone-200 flex flex-col overflow-hidden">

          {/* header */}
          <div className="bg-red-700 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
              <img
                src="/images/haemobot-avatar.png"
                alt="HaemoBot"
                className="w-8 h-8 rounded-full object-cover"
              />
              <div>
                <p className="text-white font-bold text-sm">HaemoBot</p>
                <p className="text-red-200 text-xs">Haemochromatosis dietary assistant</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-red-200 hover:text-white text-lg leading-none"
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
              className="w-8 h-8 bg-red-700 hover:bg-red-800 text-white rounded-full flex items-center justify-center text-sm transition-colors"
            >
              ↑
            </button>
          </div>

        </div>
      )}

      {/* floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-red-700 hover:bg-red-800 text-white rounded-full shadow-lg flex items-center justify-center text-2xl transition-colors"
      >
        {isOpen ? '✕' : <img src="/images/haemobot-avatar.png" alt="HaemoBot" className="w-full h-full object=cover" />
        }
      </button>

    </div>
  )
}