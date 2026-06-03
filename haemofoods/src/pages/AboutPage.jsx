//about page — project info, team, methodology, sources

//placeholder team data — replace with real info
const TEAM = [
    {
        name: 'Jakub Zeman',
        university: 'University of Galway',
        course: 'BSc Computer Science & IT',
        role: '"I\'m the Web Developer of HaemoFood, providing data science & tech support for the team."',
        image: '/team/jakub1.jpg', //replace with path like '/images/team/jakub.jpg'
        github: 'https://github.com/elfudo3', //replace with your actual GitHub
    },
    {
        name: 'Emma O\'Keeffe',
        university: 'University of Galway',
        course: 'BSc Biomedical Science',
        role: '"I\'m one of the researchers on our team, ensuring all our information is current and up to date!"',
        image: '/team/emma.jpg',
    },
    {
        name: 'Grace Dawson',
        university: 'UCD',
        course: 'BSc Cell & Molecular Biology',
        role: 'Placeholder',
        image: '/team/grace.jpg',
    },
    {
        name: 'Lauren Richardson',
        university: 'DCU',
        course: 'BSc Genetics & Cell Biology',
        role: '"I am one of the researchers on our team. I have a strong interest in bioinformatics and genomics with the intention of pursuing a career in Medical Therapeutics."',
        image: '/team/lauren.jpeg',
    },
    {
        name: 'Neasa Ní Ainiféin',
        university: 'University of Galway',
        course: 'course',
        role: "Placeholder",
        image: '/team/neasa.jpg'
    }
]

export default function AboutPage() {
    return (
        //max-w-3xl — caps content width so lines don't stretch too wide
        //mx-auto — centres the content block horizontally
        <div className="max-w-3xl mx-auto">

            {/* ===== MAIN CONTENT ===== */}
            <div className="space-y-16">

                {/* ---------- SECTION 1: About HaemoFood ---------- */}
                <section>
                    <h1 className="text-2xl font-bold text-stone-900 mb-4">About HaemoFood</h1>
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
                <section>
                    <h2 className="text-xl font-bold text-stone-900 mb-6">Our Partners</h2>

                    {/* two rows: associations then universities */}
                    <div className="space-y-8">

                        {/* in association with */}
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-4">
                                In association with
                            </p>
                            {/* grid — 2 columns on mobile, 3 on medium screens */}
                            <div className="grid grid-cols-2 gap-4">
                                {/* each partner card — replace bg-stone-50 placeholder with real logos */}
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
                <section>
                    <h2 className="text-xl font-bold text-stone-900 mb-6">Research Team</h2>

                    {/* team grid — 1 column on mobile, 2 on medium screens */}
                    <div className="grid grid-cols-1 gap-5">
                        {TEAM.map(member => (
                            <div
                                key={member.name}
                                className="flex gap-4 items-start bg-stone-50 border border-stone-200 rounded-xl p-4 relative"
                            >
                                {/* profile image — circular, 64x64 */}
                                {/* flex-shrink-0 — prevents the circle from squishing when text is long */}
                                <div className="w-20 h-20 rounded-full bg-stone-200 flex-shrink-0 overflow-hidden">
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
                                <div className="min-w-0">
                                    <h3 className="font-semibold text-stone-900">{member.name}</h3>
                                    <p className="text-xs text-stone-400 mt-0.5">{member.university}</p>
                                    <p className="text-xs text-stone-400">{member.course}</p>
                                    <p className="text-sm text-stone-600 mt-2 leading-relaxed">{member.role}</p>

                                    {/* github link — only shown for members who have one */}
                                    {member.github && (
                                        <a
                                            href={member.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="absolute top-3 right-3 flex items-center gap-2 bg-stone-800 hover:bg-stone-700 text-white text-xs font-medium px-3 py-1.5 rounded-full transition-colors"
                                        >
                                            <img
                                                src="/images/logos/github.png"
                                                alt="GitHub"
                                                className="w-5 h-5 invert"
                                            />
                                            <span>github.com/elfudo3</span>
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ---------- SECTION 4: How the Search Works ---------- */}
                <section id="how-it-works" className="scroll-mt-24">
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

                        {/* rating explanation cards */}
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
                <section>
                    <h2 className="text-xl font-bold text-stone-900 mb-4">Visit Our Sources</h2>

                    <div className="space-y-3">
                        <a
                            href="https://haemochromatosis.ie/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between bg-stone-50 border border-stone-200 rounded-xl p-4 hover:border-stone-300 transition-colors"
                        >
                            <div>
                                <p className="font-medium text-stone-900">Irish Haemochromatosis Association</p>
                                <p className="text-sm text-stone-500 mt-1">
                                    Clinical dietary guidelines for hereditary haemochromatosis patients.
                                </p>
                            </div>
                            <span className="text-stone-400 ml-4 text-lg">→</span>
                        </a>

                        <a
                            href="/DIET_HAEMO_IRELAND.PDF"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between bg-stone-50 border border-stone-200 rounded-xl p-4 hover:border-stone-300 transition-colors"
                        >
                            <div>
                                <p className="font-medium text-stone-900">IHA Dietary Guide</p>
                                <p className="text-sm text-stone-500 mt-1">
                                    Diet and Haemochromatosis — full dietary guide by Sarah Keogh, Consultant Dietitian (Feb 2023).
                                </p>
                            </div>
                            <span className="text-stone-400 ml-4 text-lg">→</span>
                        </a>

                        <a
                            href="https://fdc.nal.usda.gov/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between bg-stone-50 border border-stone-200 rounded-xl p-4 hover:border-stone-300 transition-colors"
                        >
                            <div>
                                <p className="font-medium text-stone-900">USDA FoodData Central</p>
                                <p className="text-sm text-stone-500 mt-1">
                                    Comprehensive food composition database maintained by the U.S. Department of Agriculture.
                                </p>
                            </div>
                            <span className="text-stone-400 ml-4 text-lg">→</span>
                        </a>

                        <a
                            href="https://www.vmh.life/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between bg-stone-50 border border-stone-200 rounded-xl p-4 hover:border-stone-300 transition-colors"
                        >
                            <div>
                                <p className="font-medium text-stone-900">Virtual Metabolic Human</p>
                                <p className="text-sm text-stone-500 mt-1">
                                    Database of human and gut microbial metabolism for systems biology research.
                                </p>
                            </div>
                            <span className="text-stone-400 ml-4 text-lg">→</span>
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

            </div >
        </div >
    )
}
