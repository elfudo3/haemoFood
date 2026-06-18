// floating chat widget — fixed to bottom-right of every page
// on mobile: opens as fullscreen overlay using visualViewport API
// on desktop: stays as floating box in bottom-right corner
import { useState, useEffect, useRef } from 'react'
import { SYSTEM_PROMPT } from '../../constants/haemoBotPrompt'


//separate component for mobile chat — uses visualViewport API
//to stay pinned to the actual visible screen area even when keyboard opens
function MobileChat({ messages, input, setInput, isLoading, handleSend, setIsOpen, bottomRef }) {
  const containerRef = useRef(null)

  //listen to visualViewport resize/scroll events and adjust container
  //to match the actual visible area — keyboard-proof
  useEffect(() => {
    const viewport = window.visualViewport
    if (!viewport || !containerRef.current) return

    function handleResize() {
      const container = containerRef.current
      if (!container) return
      //set height to exactly what's visible (excludes keyboard)
      container.style.height = `${viewport.height}px`
      //offset from top in case browser chrome scrolls the viewport
      container.style.top = `${viewport.offsetTop}px`
    }

    //run once immediately to set initial size
    handleResize()

    viewport.addEventListener('resize', handleResize)
    viewport.addEventListener('scroll', handleResize)

    return () => {
      viewport.removeEventListener('resize', handleResize)
      viewport.removeEventListener('scroll', handleResize)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed left-0 right-0 z-50 flex flex-col bg-white md:hidden dark:bg-stone-900"
    >
      {/* header */}
      <div className="bg-red-100 px-4 py-3 flex items-center justify-between shrink-0 dark:bg-red-950/60">
        <div className="flex items-center gap-2">
          <img
            src="/images/HaemoBot_v1.png"
            alt="HaemoBot"
            className="w-8 h-8 rounded-full object-cover"
          />
          <div>
            <p className="font-logo text-stone-800 font-bold text-sm dark:text-stone-100">HaemoBot</p>
            <p className="text-black-500 text-xs dark:text-stone-300">Haemochromatosis dietary assistant</p>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="bg-red-100 hover:text-stone-500 text-lg leading-none dark:bg-red-950/60 dark:text-stone-200 dark:hover:text-stone-400"
        >
          ✕
        </button>
      </div>

      {/* message list — flex-1 takes all remaining space, scrolls independently */}
      <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-2">
        <div className="mt-auto" />
        {messages.map((message, index) => (
          <div
            key={index}
            className={`text-sm rounded-2xl px-3 py-2 max-w-[80%]
              ${message.role === 'user'
                ? 'bg-red-700 text-white self-end rounded-br-sm dark:bg-red-600'
                : 'bg-stone-100 text-stone-800 self-start rounded-bl-sm dark:bg-stone-800 dark:text-stone-200'
              }`}
          >
            {message.content}
          </div>
        ))}
        {isLoading && (
          <div className="self-start px-1 py-1">
            <div className="haemobot-loader" />
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* input bar — shrink-0 keeps it pinned at bottom, never squashed */}
      <div className="p-2 border-t border-stone-200 flex gap-2 shrink-0 dark:border-stone-800">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask about haemochromatosis..."
          className="flex-1 text-base bg-stone-100 rounded-full px-3 py-2 outline-none focus:ring-2 focus:ring-red-300 dark:bg-stone-800 dark:text-stone-100 dark:placeholder-stone-500 dark:focus:ring-red-500"
        />
        <button
          onClick={handleSend}
          className="w-8 h-8 bg-gradient-to-br from-pink-500 to-orange-400 text-white rounded-full flex items-center justify-center text-sm shrink-0"
        >
          ↑
        </button>
      </div>
    </div>
  )
}


export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)

  //tracks whether user has opened the chat at least once — hides notification dot
  const [hasOpened, setHasOpened] = useState(false)

  //true while waiting for HaemoBot's API response
  const [isLoading, setIsLoading] = useState(false)

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

  //lock body scroll when chat is open on mobile — prevents page jumping behind overlay
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])


  //sends messages to OpenRouter API and returns the bot's reply
  async function getBotReply(conversationHistory) {
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
    if (!input.trim()) return

    const userMessage = { role: 'user', content: input.trim() }
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInput('')
    setIsLoading(true)

    try {
      const reply = await getBotReply(updatedMessages)
      setMessages(prev => [...prev, { role: 'assistant', content: reply }])
    } catch (err) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I couldn\'t connect. Please try again in a moment.'
      }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* ========== MOBILE FULLSCREEN OVERLAY ========== */}
      {isOpen && (
        <MobileChat
          messages={messages}
          input={input}
          setInput={setInput}
          isLoading={isLoading}
          handleSend={handleSend}
          setIsOpen={setIsOpen}
          bottomRef={bottomRef}
        />
      )}

      {/* ========== DESKTOP FLOATING CHAT ========== */}
      <div className="hidden md:flex fixed bottom-6 right-6 z-50 flex-col items-end pointer-events-none">
        {/* chat panel — gradient border wrapper */}
        <div className={`mb-4 p-0.5 rounded-2xl bg-gradient-to-br from-pink-500 to-orange-400 shadow-xl transition-all duration-300 origin-bottom-right
          ${isOpen
            ? 'scale-100 opacity-100 pointer-events-auto'
            : 'scale-0 opacity-0 pointer-events-none'
          }`}
        >
          <div className="w-80 h-96 bg-white rounded-2xl flex flex-col overflow-hidden dark:bg-stone-900">
            {/* header */}
            <div className="bg-red-100 px-4 py-3 flex items-center justify-between dark:bg-red-950/60">
              <div className="flex items-center gap-2">
                <img
                  src="/images/HaemoBot_v1.png"
                  alt="HaemoBot"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <p className="font-logo text-stone-800 text-sm dark:text-stone-100">HaemoBot</p>
                  <p className="text-black-500 text-xs dark:text-stone-300">Haemochromatosis dietary assistant</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="bg-red-100 hover:text-white text-lg leading-none dark:bg-red-950/60 dark:text-stone-200"
              >
                ✕
              </button>
            </div>

            {/* message list */}
            <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-2">
              <div className="mt-auto" />
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`text-sm rounded-2xl px-3 py-2 max-w-xs
                    ${message.role === 'user'
                      ? 'bg-red-700 text-white self-end rounded-br-sm dark:bg-red-600'
                      : 'bg-stone-100 text-stone-800 self-start rounded-bl-sm dark:bg-stone-800 dark:text-stone-200'
                    }`}
                >
                  {message.content}
                </div>
              ))}
              {isLoading && (
                <div className="self-start px-1 py-1">
                  <div className="haemobot-loader" />
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* input bar */}
            <div className="p-2 border-t border-stone-200 flex gap-2 dark:border-stone-800">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about haemochromatosis..."
                className="flex-1 text-base bg-stone-100 rounded-full px-3 py-2 outline-none focus:ring-2 focus:ring-red-300 dark:bg-stone-800 dark:text-stone-100 dark:placeholder-stone-500 dark:focus:ring-red-500"
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

        {/* floating button — desktop only */}
        <button
          onClick={() => {
            setIsOpen(!isOpen)
            setHasOpened(true)
          }}
          className="relative p-0.5 rounded-full bg-gradient-to-br from-pink-500 to-orange-400 shadow-lg pointer-events-auto transition-all duration-200 hover:scale-[1.01] hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.98] cursor-pointer"
        >
          <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-2xl overflow-hidden dark:bg-stone-900 dark:text-stone-100">
            {isOpen
              ? '✕'
              : <img src="/images/HaemoBot_v1.png" alt="HaemoBot" className="w-full h-full object-cover" />
            }
          </div>
          {!isOpen && !hasOpened && (
            <span className="absolute -top-1 -left-1 w-3.5 h-3.5 bg-blue-500 rounded-full animate-ping ring-2 ring-white" />
          )}
        </button>
      </div>

      {/* ========== FLOATING BUTTON — MOBILE ONLY ========== */}
      {!isOpen && (
        <button
          onClick={() => {
            setIsOpen(true)
            setHasOpened(true)
          }}
          className="fixed bottom-6 right-6 z-50 p-0.5 rounded-full bg-gradient-to-br from-pink-500 to-orange-400 shadow-lg md:hidden"
        >
          <div className="relative w-14 h-14 bg-white rounded-full flex items-center justify-center text-2xl overflow-hidden dark:bg-stone-900">
            <img src="/images/HaemoBot_v1.png" alt="HaemoBot" className="w-full h-full object-cover" />
          </div>
          {!hasOpened && (
            <span className="absolute -top-1 -left-1 w-3.5 h-3.5 bg-blue-500 rounded-full animate-ping ring-2 ring-white" />
          )}
        </button>
      )}
    </>
  )
}