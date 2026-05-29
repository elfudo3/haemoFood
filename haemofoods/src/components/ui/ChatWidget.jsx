// floating chat widget — fixed to bottom-right of every page
import { useState, useEffect, useRef } from 'react'

//system prompt — defines the bot's personality and boundaries
const SYSTEM_PROMPT = `You are HaemoBot, a dietary assistant for haemochromatosis patients.

Rules:
- If the answer is covered by the IHA guidelines below, answer from those guidelines directly with no disclaimer
- If the answer requires general nutritional or medical knowledge beyond the guidelines, you may use it — but always end with: "This is general information — always check with your doctor or dietitian."
- If asked anything completely off-topic, politely redirect: "I can only help with haemochromatosis and dietary questions."
- Never speculate on personal health outcomes
- Never diagnose or prescribe — you are a guide, not a doctor
- Keep answers short — 2 to 3 sentences max
- Do not use markdown formatting — no bold, no bullet points, no asterisks, plain text only

IHA GUIDELINES: Diet & Haemochromatosis (Irish Haemochromatosis Association)

Why Diet Matters:
People with haemochromatosis absorb more iron from food and drink than normal. Diet cannot treat haemochromatosis, but changes can help limit iron absorption between phlebotomy treatments.

Iron Types:
Haem iron is found in meat, poultry and fish — the body absorbs it easily.
Non-haem iron is found in eggs, plants, and fortified foods — harder for the body to absorb.

Haem Iron Foods (body absorbs MORE): red meat, chicken, turkey, fish, shellfish, offal (liver, kidney).
Non-Haem Iron Foods (body absorbs LESS): eggs, beans, lentils, nuts, seeds, fortified cereals, wholemeal bread, leafy greens, dark chocolate, dried fruit.

Iron Content in Common Foods:
100g calf's liver: 12.2mg. 2 slices black pudding (60g): 7.1mg. 85g lamb's liver: 6.5mg. 50g chicken liver pâté: 3.0mg. 100g beef: 2.7mg. 120g sardines drained: 2.5mg. 1 chicken leg: 1.4mg. 100g tuna drained: 1.1mg. 80g mackerel: 1.0mg. 100g turkey breast: 0.6mg. 120g chicken fillet: 0.5mg. 100g salmon: 0.4mg.
400g tin kidney beans drained: 4.8mg. 40g fortified cereal: 4.0mg. 400g tin chickpeas drained: 3.5mg. 100g green lentils: 3.5mg. 100g red lentils: 2.4mg. 50g almonds: 1.7mg. 1 tbsp pumpkin seeds: 1.2mg. 1 boiled egg: 1.0mg.

Enhancers (increase iron absorption — limit with meals):
Vitamin C supplements: avoid, or take 1 hour before or after eating. Fruit juices (fructose): limit to 150ml/day, have 1 hour before or after meals. Alcohol: limit. Whole fruit and vegetables with vitamin C are fine — no need to avoid.

Inhibitors (reduce iron absorption — helpful to eat with meals):
Tea and coffee with or just after meals. Calcium-rich foods like milk and yoghurt with meals. High-fibre foods: wholegrain bread, bran cereals, fruits, vegetables. Phytates in nuts, seeds, beans, lentils, wholegrains. Oxalates in spinach, almonds, beetroot, berries, soy, rhubarb.

Alcohol:
Limit alcohol — it increases iron absorption and stresses the liver. If liver damage is present, avoid completely. Irish guidelines (no medical conditions): max 11 standard drinks/week for women, 17 for men.
Iron in drinks: 500ml cider 2.5mg. 125ml rosé wine 1.3mg. 125ml red wine 1.1mg. 1 pint stout 1.1mg. 125ml white wine 0.63mg. 1 pint lager 0.01mg. Spirits 0mg.

Raw Shellfish:
Avoid raw shellfish. Vibrio vulnificus bacteria thrives on iron and causes serious infection in people with iron overload. Cooking at high temperature destroys it.

Pregnancy:
Stop phlebotomy during pregnancy on doctor's advice. Limit high-iron foods, avoid iron supplements unless directed, check pregnancy supplements contain no iron.

Balanced Eating:
Fruit and vegetables: 5–7 servings per day, at least one-third of every meal. Carbohydrates: choose wholegrain — porridge, brown rice, brown pasta, wholegrain bread, jacket potatoes. Limit iron-fortified cereals. Dairy: 3 servings of calcium-rich foods per day — milk, yoghurt, hard cheese. Protein: favour beans, lentils, chicken, fish over red meat. Fats: olive oil or rapeseed oil for cooking, oily fish at least once per week for omega-3.`

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

      {isOpen && (
        <div className="mb-4 w-80 h-96 bg-white rounded-2xl shadow-xl border border-stone-200 flex flex-col overflow-hidden">

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
        className="w-14 h-14 bg-red-300 hover:bg-red-800 text-white rounded-full shadow-lg flex items-center justify-center text-2xl transition-colors"
      >
        {isOpen
          ? '✕'
          : <img src="/images/HaemoBot_v1.png" alt="HaemoBot" className="w-full h-full object=cover" />
        }
      </button>

    </div>
  )
}