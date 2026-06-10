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
  

export default function DietPlanPage() {
    //tracks which tab is currently visible
    const [activeTab, setActiveTab] = useState('overview')
    const [selectedSex, setSelectedSex] = useState('male')

    return (
        <div className='max-w-4xl mx-auto px-4 py-10'>
            {/* page heading — fadeInUp, no delay */}
            <h1 className="text-2xl md:text-3xl font-bold text-stone-800 opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards]">
                Dietary Management Plan
            </h1>
            <p className="text-sm text-stone-500 mt-2 mb-6 opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards] [animation-delay:0.15s]">
                Personalised guidance for managing iron intake with haemochromatosis.
            </p>
            {/* Tab bar */}
            <div className='flex gap-2 border-b border-stone-200 pb-4 mb-6 overflow-x-auto opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards] [animation-delay:0.3s]'>
                {TABS.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap flex-shrink-0
                        ${activeTab === tab.id
                                ? 'bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white shadow-md'
                                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            { /* Tab plane */}
            {activeTab === 'overview' && (
                <div>
                    <h2 className="text-lg font-semibold text-stone-800">Your daily iron targets</h2>
                    <p className="text-sm text-stone-500 mt-1">Overview content coming soon.</p>
                </div>
            )}

            {activeTab === 'foods' && (
                <div>
                    <h2 className="text-lg font-semibold text-stone-800">Food Guide</h2>
                    <p className="text-sm text-stone-500 mt-1">Food Guide content coming soon.</p>
                </div>
            )}

            {activeTab === 'meals' && (
                <div>
                    <h2 className="text-lg font-semibold text-stone-800">Meal Plans</h2>
                    <p className="text-sm text-stone-500 mt-1">Meal Plans content coming soon.</p>
                </div>
            )}

            {activeTab === 'timing' && (
                <div>
                    <h2 className="text-lg font-semibold text-stone-800">Timing Guide</h2>
                    <p className="text-sm text-stone-500 mt-1">Timing Guide content coming soon.</p>
                </div>
            )}

            {activeTab === 'special' && (
                <div>
                    <h2 className="text-lg font-semibold text-stone-800">Special Considerations</h2>
                    <p className="text-sm text-stone-500 mt-1">Special Considerations content coming soon.</p>
                </div>
            )}
        </div>
    )
}