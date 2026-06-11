//about page — project info, team, methodology, sources

const TEAM = [
    {
        name: 'Jakub Zeman',
        university: 'University of Galway',
        course: 'BSc Computer Science & IT',
        role: '"I\'m the Web Developer of HaemoFood, providing data science & tech support for the team."',
        image: '/team/jakub1.jpg',
        github: 'https://github.com/elfudo3',
        linkedin: 'https://www.linkedin.com/in/jacobzeman', //replace with real URL
    },
    {
        name: 'Emma O\'Keeffe',
        university: 'University of Galway',
        course: 'BSc Biomedical Science',
        role: '"I\'m one of the researchers on our team, ensuring all our information is current and up to date!"',
        image: '/team/emma.jpg',
        linkedin: 'https://www.linkedin.com/in/emma-o-keeffe-ba3328347/', //replace with real URL
    },
    {
        name: 'Grace Dawson',
        university: 'UCD',
        course: 'BSc Cell & Molecular Biology',
        role: '"I am a third-year Cell and Molecular Biology student at University College Dublin with a background in molecular techniques, data analysis, and scientific research. I am passionate about the intersection of biological science and community health, which is what drew me to our project."',
        image: '/team/grace.jpg',
        linkedin: 'https://www.linkedin.com/in/grace-dawson-9b8179306/', //replace with real URL
    },
    {
        name: 'Lauren Richardson',
        university: 'DCU',
        course: 'BSc Genetics & Cell Biology',
        role: '"I am one of the researchers on our team. I have a strong interest in bioinformatics and genomics with the intention of pursuing a career in Medical Therapeutics."',
        image: '/team/lauren.jpeg',
        linkedin: 'https://www.linkedin.com/in/lauren-richardson-4a717a414/', //replace with real URL
    },
    {
        name: 'Neasa Ní Ainiféin',
        university: 'University of Galway',
        course: 'BSc Biomedical Science',
        role: '"I have a particular interest in pharmacology, human health and disease research."',
        image: '/team/neasa.jpg',
        linkedin: 'https://www.linkedin.com/in/neasa-n%C3%AD-ainif%C3%A9in-927751307/', //replace with real URL
    }
]

export default function AboutPage() {
    return (
        //max-w-3xl — caps content width so lines don't stretch too wide
        //mx-auto — centres the content block horizontally
        //px-4 — padding on mobile so content doesn't touch screen edges
        <div className="max-w-3xl mx-auto px-4 py-10">

            {/* ===== MAIN CONTENT ===== */}
            <div className="space-y-16">

                {/* ---------- SECTION 1: About HaemoFood ---------- */}
                {/* fadeInUp — slides up + fades in, no delay (first element) */}
                <section className="opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards]">
                    <h1 className="text-2xl md:text-3xl font-bold text-stone-900 mb-4">About HaemoFood</h1>
                    <p className="text-stone-600 leading-relaxed">
                        HaemoFood is more than a search tool — it&apos;s a platform built to raise
                        awareness about hereditary haemochromatosis and make reliable dietary
                        guidance accessible to anyone who needs it.
                    </p>
                    <p className="text-stone-600 leading-relaxed mt-3">
                        The site combines three things: a food safety checker backed by clinical
                        guidelines from the Irish Haemochromatosis Association, an information
                        guide explaining the science behind iron absorption and dietary management,
                        and HaemoBot — an AI assistant trained on IHA guidelines that can answer
                        specific questions about diet and haemochromatosis.
                    </p>
                    <p className="text-stone-600 leading-relaxed mt-3">
                        This project was developed as part of the Virtuome 2026 student research
                        programme, bringing together students from three Irish universities to
                        investigate whether patients with hereditary haemochromatosis have access
                        to the digital tools and dietary resources they actually need. HaemoFood
                        is one of our answers to that question.
                    </p>
                </section>

                {/* ---------- SECTION 2: Our Partners ---------- */}
                {/* fadeIn — fades in without sliding, staggered 0.15s after section 1 */}
                <section className="opacity-0 animate-[fadeIn_0.6s_ease-out_forwards] [animation-delay:0.15s]">
                    <h2 className="text-xl font-bold text-stone-900 mb-6">Our Partners</h2>

                    {/* two rows: associations then universities */}
                    <div className="space-y-8">

                        {/* in association with */}
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-4">
                                In association with
                            </p>
                            {/* grid-cols-2 — always 2 columns, even on mobile */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center justify-center h-24 bg-stone-50 border border-stone-200 rounded-xl p-4">
                                    <img
                                        src="/images/logos/IHA.png"
                                        alt="Irish Haemochromatosis Association"
                                        className="max-h-16 object-contain"
                                    />
                                </div>
                                <div className="flex items-center justify-center h-24 bg-stone-50 border border-stone-200 rounded-xl p-4">
                                    <img
                                        src="/images/logos/VMH_square.png"
                                        alt="Virtual Metabolic Human"
                                        className="max-h-35 object-contain"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* students from */}
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-4">
                                Students from
                            </p>
                            {/* grid-cols-2 on mobile, 3 on medium screens */}
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                <div className="flex items-center justify-center h-24 bg-stone-50 border border-stone-200 rounded-xl p-4">
                                    <img
                                        src="/images/logos/UG.png"
                                        alt="University of Galway"
                                        className="max-h-16 object-contain"
                                    />
                                </div>
                                <div className="flex items-center justify-center h-24 bg-stone-50 border border-stone-200 rounded-xl p-4">
                                    <img
                                        src="/images/logos/UCD1.png"
                                        alt="UCD"
                                        className="max-h-16 object-contain"
                                    />
                                </div>
                                <div className="flex items-center justify-center h-24 bg-stone-50 border border-stone-200 rounded-xl p-4">
                                    <img
                                        src="/images/logos/DCU.png"
                                        alt="DCU"
                                        className="max-h-16 object-contain"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ---------- SECTION 3: Research Team ---------- */}
                {/* fadeIn staggered 0.3s */}
                <section className="opacity-0 animate-[fadeIn_0.6s_ease-out_forwards] [animation-delay:0.3s] relative z-10">
                    <h2 className="text-xl font-bold text-stone-900 mb-6">Research Team</h2>

                    {/* team grid — single column, cards stack vertically */}
                    <div className="grid grid-cols-1 gap-5">
                        {TEAM.map(member => (
                            <div
                                key={member.name}
                                //flex on desktop, stack on mobile for better readability
                                className="flex flex-col sm:flex-row gap-4 items-start bg-stone-50 border border-stone-200 rounded-xl p-4 relative pr-14"
                            >
                                {/* profile image — circular, 80x80 */}
                                {/* flex-shrink-0 — prevents the circle from squishing when text is long */}
                                {/* mx-auto on mobile centres the image when stacked, sm:mx-0 resets for row layout */}
                                <div className="w-20 h-20 rounded-full bg-stone-200 flex-shrink-0 overflow-hidden mx-auto sm:mx-0">
                                    {member.image ? (
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        //placeholder — shows first letter of name
                                        <div className="w-full h-full flex items-center justify-center text-stone-400 font-bold text-lg">
                                            {member.name.charAt(0)}
                                        </div>
                                    )}
                                </div>

                                {/* text content */}
                                {/* min-w-0 — prevents text from overflowing the flex container */}
                                {/* text-center on mobile, left-aligned on sm+ */}
                                <div className="min-w-0 text-center sm:text-left">
                                    <h3 className="font-semibold text-stone-900">{member.name}</h3>
                                    <p className="text-xs text-stone-400 mt-0.5">{member.university}</p>
                                    <p className="text-xs text-stone-400">{member.course}</p>
                                    <p className="text-sm text-stone-600 mt-2 leading-relaxed">{member.role}</p>
                                </div>

                                {/* flex-wrap handles narrow screens, justify-center on mobile matches text alignment */}
                                {/* social icons — stacked vertically in top-right corner */}
                                {(member.github || member.linkedin) && (
                                    <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
                                        {member.github && (
                                            <a
                                                href={member.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-10 h-10 rounded-full bg-stone-800 hover:bg-stone-700 flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-md active:scale-95 relative z-20"
                                            >
                                                <img
                                                    src="/images/logos/github.png"
                                                    alt="GitHub"
                                                    className="w-6 h-6 invert"
                                                />
                                            </a>
                                        )}
                                        {member.linkedin && (
                                            <a
                                                href={member.linkedin}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-10 h-10 rounded-full bg-blue-700 hover:bg-blue-600 flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-md active:scale-95 relative z-20"
                                            >
                                                <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                                </svg>
                                            </a>
                                        )}
                                    </div>
                                )}
                            </div>

                        ))}
                    </div>
                </section>

                {/* ---------- SECTION 4: How the Search Works ---------- */}
                {/* fadeIn staggered 0.45s */}
                {/* scroll-mt-24 offsets the scroll target so heading isn't hidden behind sticky navbar */}
                <section id="how-it-works" className="scroll-mt-24 opacity-0 animate-[fadeIn_0.6s_ease-out_forwards] [animation-delay:0.45s]">
                    <h2 className="text-xl font-bold text-stone-900 mb-4">How the Search Works</h2>

                    <div className="space-y-4 text-stone-600 leading-relaxed">
                        <p>
                            When you search for a food, HaemoFood checks two sources. First, it searches our
                            curated database of approximately 150 foods that have been individually rated using
                            the Irish Haemochromatosis Association&apos;s dietary guidelines. These foods carry
                            clinically accurate safety ratings that account for factors like heme vs non-heme
                            iron, vitamin C content, and alcohol.
                        </p>
                        <p>
                            Second, it queries the USDA FoodData Central API — the gold-standard public database
                            of food composition data maintained by the United States Department of Agriculture.
                            For USDA results, iron safety ratings are calculated automatically based on iron
                            content per 100g.
                        </p>

                        {/* IHA methodology — separated into its own highlighted block */}
                        <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 space-y-3">
                            <p className="font-semibold text-stone-800">
                                How we rate foods
                            </p>
                            <p>
                                Our safety ratings are based on the Irish Haemochromatosis
                                Association&apos;s &quot;Diet &amp; Haemochromatosis&quot; guide
                                (February 2023), written by Sarah Keogh, Consultant Dietitian,
                                in association with INDI.
                            </p>
                            <p>
                                The IHA guide distinguishes between two types of dietary iron.
                                Heme iron, found in meat, poultry, and fish, is absorbed two to
                                three times more efficiently than non-heme iron, found in eggs,
                                plants, and fortified foods. This means animal-source foods pose
                                a greater risk at the same iron level — beef at 2.7mg/100g is
                                more dangerous than spinach at 2.7mg/100g.
                            </p>
                            <p>
                                Our curated database of 150 common foods uses clinically assigned
                                ratings that account for iron type, absorption enhancers like
                                alcohol, and absorption inhibitors like tea, coffee, and calcium.
                            </p>
                            <p className="text-sm text-stone-500 italic">
                                When a food is not in our curated database, we fall back to iron
                                content per 100g from the USDA FoodData Central database and apply
                                general thresholds. This numerical fallback does not distinguish
                                between heme and non-heme iron, so users should treat USDA-sourced
                                ratings as approximate.
                            </p>
                        </div>

                        {/* rating explanation cards — 1 column on mobile, 3 on sm+ */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
                            <div className="rounded-xl border border-green-200 bg-green-50 p-4">
                                <p className="font-semibold text-green-800 mb-1">🟢 Safe</p>
                                <p className="text-sm text-green-700">
                                    Low iron content. Generally safe for regular consumption.
                                </p>
                            </div>
                            <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-4">
                                <p className="font-semibold text-yellow-800 mb-1">🟡 Moderate</p>
                                <p className="text-sm text-yellow-700">
                                    Medium iron content. Enjoy in moderation and monitor portions.
                                </p>
                            </div>
                            <div className="rounded-xl border border-red-200 bg-red-50 p-4">
                                <p className="font-semibold text-red-800 mb-1">🔴 Avoid</p>
                                <p className="text-sm text-red-700">
                                    High iron content or other risk factors. Best avoided or consumed rarely.
                                </p>
                            </div>
                        </div>

                    </div>
                </section>

                {/* ---------- SECTION 5: Sources ---------- */}
                {/* fadeIn staggered 0.6s */}
                <section className="opacity-0 animate-[fadeIn_0.6s_ease-out_forwards] [animation-delay:0.6s]">
                    <h2 className="text-xl font-bold text-stone-900 mb-4">Visit Our Sources</h2>

                    <div className="space-y-3">
                        <a
                            href="https://haemochromatosis.ie/"
                            target="_blank"
                            rel="noopener noreferrer"
                            //transition-all instead of transition-colors so scale and translate animate too
                            className="flex items-center justify-between bg-stone-50 border border-stone-200 rounded-xl p-4 hover:border-stone-300 transition-all duration-200 hover:scale-[1.01] hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.98]"
                        >
                            <div>
                                <p className="font-medium text-stone-900">Irish Haemochromatosis Association</p>
                                <p className="text-sm text-stone-500 mt-1">
                                    Clinical dietary guidelines for hereditary haemochromatosis patients.
                                </p>
                            </div>
                            <span className="text-stone-400 ml-4 text-lg flex-shrink-0">→</span>
                        </a>

                        <a
                            href="/DIET_HAEMO_IRELAND.PDF"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between bg-stone-50 border border-stone-200 rounded-xl p-4 hover:border-stone-300 transition-all duration-200 hover:scale-[1.01] hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.98]"
                        >
                            <div>
                                <p className="font-medium text-stone-900">IHA Dietary Guide</p>
                                <p className="text-sm text-stone-500 mt-1">
                                    Diet and Haemochromatosis — full dietary guide by Sarah Keogh, Consultant Dietitian (Feb 2023).
                                </p>
                            </div>
                            <span className="text-stone-400 ml-4 text-lg flex-shrink-0">→</span>
                        </a>

                        <a
                            href="https://fdc.nal.usda.gov/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between bg-stone-50 border border-stone-200 rounded-xl p-4 hover:border-stone-300 transition-all duration-200 hover:scale-[1.01] hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.98]"
                        >
                            <div>
                                <p className="font-medium text-stone-900">USDA FoodData Central</p>
                                <p className="text-sm text-stone-500 mt-1">
                                    Comprehensive food composition database maintained by the U.S. Department of Agriculture.
                                </p>
                            </div>
                            <span className="text-stone-400 ml-4 text-lg flex-shrink-0">→</span>
                        </a>

                        <a
                            href="https://www.vmh.life/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between bg-stone-50 border border-stone-200 rounded-xl p-4 hover:border-stone-300 transition-all duration-200 hover:scale-[1.01] hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.98]"
                        >
                            <div>
                                <p className="font-medium text-stone-900">Virtual Metabolic Human</p>
                                <p className="text-sm text-stone-500 mt-1">
                                    Database of human and gut microbial metabolism for systems biology research.
                                </p>
                            </div>
                            <span className="text-stone-400 ml-4 text-lg flex-shrink-0">→</span>
                        </a>
                    </div>

                    {/* disclaimer */}
                    <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                        <p className="text-sm text-amber-800">
                            <span className="font-semibold">Medical disclaimer:</span> HaemoFood is an
                            educational tool and does not constitute medical advice. Always consult your
                            doctor or dietitian before making dietary changes based on this information.
                        </p>
                    </div>
                </section>

            </div>
        </div>
    )
}