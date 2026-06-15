import { useState } from 'react';
import { FOODS, MEALS, SEX_STATS } from '../constants/dietPlanData'

const TABS = [
    { id: 'overview', label: 'Overview' },
    { id: 'foods', label: 'Food Guide' },
    { id: 'meals', label: 'Meal Plans' },
    { id: 'timing', label: 'Timing Guide' },
    { id: 'special', label: 'Special Considerations' }
]

const SEX_OPTIONS = [
    { id: 'male', label: 'Male (18+)' },
    { id: 'female-pre', label: 'Female (pre-menopause)' },
    { id: 'female-post', label: 'Female (post-menopause)' },
    { id: 'under18', label: 'Under 18' },
]

const FOOD_FILTERS = [
    { id: 'all', label: 'All foods' },
    { id: 'go', label: '🟢 Safe' },
    { id: 'caution', label: '🟡 Moderate' },
    { id: 'avoid', label: '🔴 Avoid' },
]

export default function DietPlanPage() {
    //tracks which tab is currently visible
    const [activeTab, setActiveTab] = useState('overview')
    //tracks which sex/age profile is selected for iron targets and meal plans
    const [selectedSex, setSelectedSex] = useState('male')
    //tracks which food category filter is active
    const [filterCat, setFilterCat] = useState('all')

    return (
        <div className='max-w-4xl mx-auto px-4 py-10'>

            {/* page heading — fadeInUp, no delay */}
            <h1 className="text-2xl md:text-3xl text-stone-800 opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards]">
                Dietary Management Plan
            </h1>

            {/* subtitle — fadeInUp, staggered 0.15s */}
            <p className="text-sm text-stone-500 mt-2 mb-6 opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards] [animation-delay:0.15s]">
                Personalised guidance for managing iron intake with haemochromatosis.
            </p>

            {/* tab bar — fadeInUp, staggered 0.3s */}
            <div className='flex gap-2 border-b border-stone-200 pb-4 mb-6 overflow-x-auto opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards] [animation-delay:0.3s]'>
                {TABS.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap flex-shrink-0 hover:scale-[1.01] hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.98]
                        ${activeTab === tab.id
                                ? 'bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white shadow-md'
                                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* ===== OVERVIEW TAB ===== */}
            {activeTab === 'overview' && (
                <div>
                    {/* heading — fadeInUp, staggered 0.4s */}
                    <div className="opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards] [animation-delay:0.05s]">
                        <h2 className="text-lg text-stone-800">Your daily iron targets</h2>
                        <p className="text-sm text-stone-500 mt-1 mb-4">
                            The amount of iron you need depends on your age, sex, and stage of life.
                        </p>
                    </div>

                    {/* sex toggle — fadeInUp, staggered 0.5s */}
                    <div className="flex gap-2 mb-6 overflow-x-auto pb-2 opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards] [animation-delay:0.1s]">
                        {SEX_OPTIONS.map((option) => (
                            <button
                                key={option.id}
                                onClick={() => setSelectedSex(option.id)}
                                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap flex-shrink-0 transition-all duration-200 hover:scale-[1.01] hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.98]
                                    ${selectedSex === option.id
                                        ? 'bg-stone-800 text-white'
                                        : 'bg-stone-100 text-stone-500 hover:bg-stone-200'
                                    }`}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>

                    {/* stat cards or under-18 table — fadeInUp, staggered 0.6s */}
                    <div className="opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards] [animation-delay:0.2s]">
                        {selectedSex !== 'under18' ? (
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
                                <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 text-center">
                                    <div className="text-2xl font-bold text-stone-800">
                                        {SEX_STATS[selectedSex].daily}
                                    </div>
                                    <div className="text-xs text-stone-500 mt-1">Daily iron target</div>
                                </div>
                                <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 text-center">
                                    <div className="text-2xl font-bold text-stone-800">
                                        {SEX_STATS[selectedSex].haem}
                                    </div>
                                    <div className="text-xs text-stone-500 mt-1">Max haem iron servings</div>
                                </div>
                                <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 text-center">
                                    <div className="text-2xl font-bold text-stone-800">
                                        {SEX_STATS[selectedSex].focus}
                                    </div>
                                    <div className="text-xs text-stone-500 mt-1">Key dietary focus</div>
                                </div>
                            </div>
                        ) : (
                            <div className="mb-8">
                                {/* warning notice */}
                                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
                                    <p className="text-sm text-amber-800">
                                        <span className="font-semibold">Important:</span> Children and teenagers
                                        with haemochromatosis should always have their dietary management overseen
                                        by a paediatric dietitian. The targets below are general reference values only.
                                    </p>
                                </div>

                                {/* age table — horizontal scroll on mobile */}
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b border-stone-200">
                                                <th className="text-left py-2 px-3 text-xs font-semibold text-stone-500 uppercase tracking-wide">Age group</th>
                                                <th className="text-left py-2 px-3 text-xs font-semibold text-stone-500 uppercase tracking-wide">Sex</th>
                                                <th className="text-left py-2 px-3 text-xs font-semibold text-stone-500 uppercase tracking-wide">Daily iron</th>
                                                <th className="text-left py-2 px-3 text-xs font-semibold text-stone-500 uppercase tracking-wide">Key note</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {[
                                                ['1–3 years', 'All', '8mg', 'Growth priority — no broad restriction'],
                                                ['4–8 years', 'All', '11mg', 'Brain development — avoid offal only'],
                                                ['9–13 years', 'All', '8mg', 'Monitor ferritin regularly with doctor'],
                                                ['14–18 years', 'Male', '11mg', 'Avoid very high haem iron foods'],
                                                ['14–18 years', 'Female', '15mg', 'Higher target due to menstruation onset'],
                                            ].map((row, i) => (
                                                <tr key={i} className="border-b border-stone-100 hover:bg-stone-50">
                                                    {row.map((cell, j) => (
                                                        <td key={j} className="py-2 px-3 text-stone-700">{cell}</td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* why children need special consideration */}
                                <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 mt-4">
                                    <p className="text-sm text-stone-600">
                                        <span className="font-semibold">Why children need special consideration:</span> Children
                                        with HH are still growing and developing. Iron is essential for cognitive function, energy,
                                        and muscle development. The focus is on avoiding very high haem iron foods and iron
                                        supplements, rather than broad dietary restriction.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* key principles — fadeInUp, staggered 0.7s */}
                    <div className="opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards] [animation-delay:0.3s]">
                        <h3 className="text-base text-stone-800 mb-3">Key principles</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {[
                                { icon: '✅', title: 'Do not cut out iron entirely', text: 'Your body still needs iron for red blood cells, brain function, and energy. The goal is to manage iron, not eliminate it.' },
                                { icon: '⇆', title: 'Choose non-haem over haem iron', text: 'Non-haem iron from plant sources is less easily absorbed than haem iron from meat. Favouring plant sources naturally reduces iron load.' },
                                { icon: '⏳', title: 'Timing matters as much as content', text: 'When you eat certain foods alongside iron-rich foods changes how much iron your body absorbs.' },
                                { icon: '⚖', title: 'Balance is essential', text: 'A restrictive diet creates new problems. Prioritise a varied, balanced diet — fibre, calcium, healthy fats, and protein all matter.' },
                            ].map((item) => (
                                <div key={item.title} className="bg-stone-50 border border-stone-200 rounded-xl p-4 transition-all duration-200 hover:scale-[1.01] hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.98]">
                                    <div className="text-xl mb-2">{item.icon}</div>
                                    <div className="text-sm font-semibold text-stone-800 mb-1">{item.title}</div>
                                    <div className="text-xs text-stone-500 leading-relaxed">{item.text}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* ===== FOOD GUIDE TAB ===== */}
            {activeTab === 'foods' && (
                <div>
                    {/* heading — fadeInUp, staggered 0.4s */}
                    <div className="opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards] [animation-delay:0.05s]">
                        <h2 className="text-lg text-stone-800">Food guide</h2>
                        <p className="text-sm text-stone-500 mt-1 mb-4">
                            Foods categorised by safety for people with haemochromatosis.
                        </p>
                    </div>

                    {/* filter buttons — fadeInUp, staggered 0.5s */}
                    <div className="flex gap-2 mb-6 overflow-x-auto pb-2 opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards] [animation-delay:0.1s]">
                        {FOOD_FILTERS.map((filter) => (
                            <button
                                key={filter.id}
                                onClick={() => setFilterCat(filter.id)}
                                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap flex-shrink-0 transition-all duration-200 hover:scale-[1.01] hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.98]
                                    ${filterCat === filter.id
                                        ? 'bg-stone-800 text-white'
                                        : 'bg-stone-100 text-stone-500 hover:bg-stone-200'
                                    }`}
                            >
                                {filter.label}
                            </button>
                        ))}
                    </div>

                    {/* result count + food cards — fadeInUp, staggered 0.6s */}
                    <div className="opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards] [animation-delay:0.2s]">
                        <p className="text-xs text-stone-400 mb-3">
                            Showing {FOODS.filter(f => filterCat === 'all' || f.cat === filterCat).length} of {FOODS.length} foods
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {FOODS
                                .filter(f => filterCat === 'all' || f.cat === filterCat)
                                .map((food) => (
                                    <div
                                        key={food.name}
                                        className={`rounded-xl border p-4 transition-all duration-200 hover:scale-[1.01] hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.98]
                                            ${food.cat === 'go'
                                                ? 'bg-green-50 border-green-200'
                                                : food.cat === 'caution'
                                                    ? 'bg-yellow-50 border-yellow-200'
                                                    : 'bg-red-50 border-red-200'
                                            }`}
                                    >
                                        {/* top row — name and badge */}
                                        <div className="flex items-start justify-between gap-2">
                                            <h3 className="text-sm text-stone-800">{food.name}</h3>
                                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0
                                                ${food.cat === 'go'
                                                    ? 'bg-green-200 text-green-800'
                                                    : food.cat === 'caution'
                                                        ? 'bg-yellow-200 text-yellow-800'
                                                        : 'bg-red-200 text-red-800'
                                                }`}
                                            >
                                                {food.cat === 'go' ? 'Safe' : food.cat === 'caution' ? 'Moderate' : 'Avoid'}
                                            </span>
                                        </div>

                                        {/* iron content */}
                                        <p className="text-xs font-medium text-stone-500 mt-1">{food.mg}</p>

                                        {/* note */}
                                        <p className="text-xs text-stone-500 mt-2 leading-relaxed">{food.note}</p>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            )}

            {/* ===== MEAL PLANS TAB ===== */}
            {activeTab === 'meals' && (
                <div>
                    {/* heading — fadeInUp, staggered 0.4s */}
                    <div className="opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards] [animation-delay:0.05s]">
                        <h2 className="text-lg text-stone-800">Sample daily meal plans</h2>
                        <p className="text-sm text-stone-500 mt-1 mb-4">
                            Example meal plans tailored to your sex and life stage. These are guides, not prescriptions.
                        </p>
                    </div>

                    {/* sex toggle — fadeInUp, staggered 0.5s */}
                    <div className="flex gap-2 mb-6 overflow-x-auto pb-2 opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards] [animation-delay:0.1s]">
                        {SEX_OPTIONS.map((option) => (
                            <button
                                key={option.id}
                                onClick={() => setSelectedSex(option.id)}
                                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap flex-shrink-0 transition-all duration-200 hover:scale-[1.01] hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.98]
                                    ${selectedSex === option.id
                                        ? 'bg-stone-800 text-white'
                                        : 'bg-stone-100 text-stone-500 hover:bg-stone-200'
                                    }`}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>

                    {/* meal cards — fadeInUp, staggered 0.6s */}
                    <div className="grid grid-cols-1 gap-4 opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards] [animation-delay:0.2s]">
                        {MEALS[selectedSex].map((meal) => (
                            <div
                                key={meal.time}
                                className={`rounded-xl border p-4 transition-all duration-200 hover:scale-[1.01] hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.98]
                                    ${meal.time === 'Note' || meal.time === 'Important'
                                        ? 'bg-amber-50 border-amber-200'
                                        : 'bg-stone-50 border-stone-200'
                                    }`}
                            >
                                {/* time badge */}
                                <span className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full mb-2
                                    ${meal.time === 'Note' || meal.time === 'Important'
                                        ? 'bg-amber-200 text-amber-800'
                                        : 'bg-stone-200 text-stone-600'
                                    }`}
                                >
                                    {meal.time}
                                </span>

                                {/* meal name */}
                                <h3 className="text-sm text-stone-800">{meal.name}</h3>

                                {/* description */}
                                <p className="text-xs text-stone-500 mt-2 leading-relaxed">{meal.desc}</p>

                                {/* pill tags */}
                                <div className="flex flex-wrap gap-1.5 mt-3">
                                    {meal.pills.map((pill) => (
                                        <span
                                            key={pill}
                                            className="text-xs bg-white border border-stone-200 text-stone-600 px-2 py-0.5 rounded-full"
                                        >
                                            {pill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* ===== TIMING GUIDE TAB ===== */}
            {activeTab === 'timing' && (
                <div>
                    {/* heading — fadeInUp, staggered 0.4s */}
                    <div className="opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards] [animation-delay:0.05s]">
                        <h2 className="text-lg text-stone-800">Timing guide</h2>
                        <p className="text-sm text-stone-500 mt-1 mb-4">
                            When you eat matters as much as what you eat. These timing strategies can reduce iron absorption.
                        </p>
                    </div>

                    {/* timing cards — fadeInUp, staggered 0.5s */}
                    <div className="grid grid-cols-1 gap-3 opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards] [animation-delay:0.1s]">
                        {[
                            { icon: '☕', title: 'Tea or coffee with meals', text: 'Polyphenols in tea and coffee reduce iron absorption by up to 60%. Drink a cup with or immediately after meals containing iron.' },
                            { icon: '🥛', title: 'Calcium with iron-rich meals', text: 'Calcium inhibits both haem and non-haem iron absorption. A glass of milk or a serving of cheese alongside a meal helps reduce the iron your body takes in.' },
                            { icon: '🍊', title: 'Avoid vitamin C with iron-rich foods', text: 'Vitamin C dramatically increases iron absorption. Avoid orange juice, citrus fruits, and vitamin C supplements at mealtimes. Save fruit for snacks between meals.' },
                            { icon: '⏰', title: 'Space iron-rich foods apart', text: 'If you eat a higher-iron meal at lunch, choose a low-iron option for dinner. Spreading intake across the day gives your body less iron to absorb at once.' },
                            { icon: '🍷', title: 'Avoid alcohol with meals', text: 'Alcohol increases iron absorption and causes liver damage independently. If you drink, do so away from iron-rich meals and stay within recommended limits.' },
                        ].map((tip) => (
                            <div key={tip.title} className="flex gap-4 items-start bg-stone-50 border border-stone-200 rounded-xl p-4 transition-all duration-200 hover:scale-[1.01] hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.98]">
                                <span className="text-2xl flex-shrink-0">{tip.icon}</span>
                                <div>
                                    <h3 className="text-sm text-stone-800">{tip.title}</h3>
                                    <p className="text-xs text-stone-500 mt-1 leading-relaxed">{tip.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* ===== SPECIAL CONSIDERATIONS TAB ===== */}
            {activeTab === 'special' && (
                <div>
                    {/* heading — fadeInUp, staggered 0.4s */}
                    <div className="opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards] [animation-delay:0.05s]">
                        <h2 className="text-lg text-stone-800">Special considerations</h2>
                        <p className="text-sm text-stone-500 mt-1 mb-4">
                            Important dietary factors for specific groups and situations.
                        </p>
                    </div>

                    {/* consideration cards — fadeInUp, staggered 0.5s */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards] [animation-delay:0.1s]">
                        {[
                            { icon: '🤰', title: 'Pregnancy', text: 'Pregnant women with haemochromatosis should work closely with their medical team. Iron requirements change during pregnancy and standard HH dietary advice may not apply. Never restrict iron during pregnancy without medical guidance.' },
                            { icon: '👶', title: 'Children and teenagers', text: 'Children with HH need iron for growth and brain development. Dietary restrictions should be minimal and always supervised by a paediatric dietitian. Focus on avoiding offal and iron supplements, not broad restriction.' },
                            { icon: '🍺', title: 'Alcohol', text: 'Alcohol increases iron absorption and independently damages the liver — a double risk for HH patients. Cider is particularly high in iron. If you drink, limit intake and never drink with iron-rich meals.' },
                            { icon: '💊', title: 'Supplements', text: 'Never take iron supplements without medical supervision. Avoid multivitamins containing iron. High-dose vitamin C supplements dramatically increase iron absorption and should be avoided.' },
                            { icon: '🐚', title: 'Raw shellfish', text: 'People with iron overload are at increased risk of Vibrio vulnificus infection from raw or undercooked shellfish. This can cause serious illness. Always cook shellfish thoroughly.' },
                            { icon: '🥣', title: 'Fortified foods', text: 'Many breakfast cereals and breads are fortified with iron. Check labels and choose unfortified alternatives where possible. Fortified cereals can contain 4mg+ of iron per serving.' },
                            { icon: '🧃', title: 'Fruit juice', text: 'Limit fruit juice to a maximum of 150ml per day. Fructose increases iron absorption, and the vitamin C content further enhances uptake. Whole fruit is always a better choice.' },
                            { icon: '🩸', title: 'Venesection periods', text: 'During active venesection treatment, your doctor may adjust dietary advice. Some patients are temporarily advised to eat more iron-rich foods to maintain energy between treatments. Always follow your medical team\'s guidance.' },
                        ].map((item) => (
                            <div key={item.title} className="bg-stone-50 border border-stone-200 rounded-xl p-4 transition-all duration-200 hover:scale-[1.01] hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.98]">
                                <div className="text-2xl mb-2">{item.icon}</div>
                                <h3 className="text-sm text-stone-800 mb-1">{item.title}</h3>
                                <p className="text-xs text-stone-500 leading-relaxed">{item.text}</p>
                            </div>
                        ))}
                    </div>

                    {/* disclaimer — fadeInUp, staggered 0.6s */}
                    <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards] [animation-delay:0.2s]">
                        <p className="text-sm text-amber-800">
                            <span className="font-semibold">Medical disclaimer:</span> This dietary plan is based on
                            the Irish Haemochromatosis Association guidelines and is intended for educational purposes only.
                            Always consult your doctor or dietitian before making dietary changes.
                        </p>
                    </div>

                    {/* source attribution — fadeInUp, staggered 0.7s */}
                    <p className="text-xs text-stone-400 mt-4 text-center opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards] [animation-delay:0.3s]">
                        Based on guidance from the IHA "Diet &amp; Haemochromatosis" guide (Feb 2023)
                        by Sarah Keogh, Consultant Dietitian, in association with INDI.
                    </p>
                </div>
            )}
        </div>
    )
}