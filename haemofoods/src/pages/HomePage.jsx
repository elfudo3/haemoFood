// landing page — project info and call to action
import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div className="max-w-3xl mx-auto">

      {/* hero section */}
      <div className="text-center pt-16 pb-12 border-b border-stone-200">
        <h1 className="text-4xl font-bold tracking-tight text-stone-900 mb-6 opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards]">
          Because knowing your diagnosis
          <br />

          {/* [animation-delay:0.15s] — red line appears just after the main heading */}
          <span className="text-red-700 inline-block opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards] [animation-delay:0.15s]">
            is only the beginning.
          </span>
        </h1>
        {/* [animation-delay:0.3s] — paragraph appears third in the cascade */}
        <p className="text-lg text-stone-500 max-w-lg mx-auto mb-8 opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards] [animation-delay:0.3s]">
          We are a student research group investigating whether Irish patients
          with hereditary haemochromatosis have access to the dietary guidance,
          digital tools, and resources they actually need to manage their
          condition day to day.
        </p>

        {/* [animation-delay:0.5s] — CTA button appears last for visual emphasis */}
        {/* inline-block needed so transform (translateY) works on an inline element */}
        <Link
          to="/search"
          className="inline-block bg-red-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-800 transition-colors opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards] [animation-delay:0.5s]"
        >
          Search a food
        </Link>
      </div>

      {/* mission section */}
      {/* [animation-delay:0.6s] — appears as user's eye reaches this section */}
      <div className="py-12 border-b border-stone-200 opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards] [animation-delay:0.6s]">
        <p className="text-sm uppercase tracking-widest text-red-700 mb-2">
          Our Mission
        </p>
        <h2 className="text-2xl font-bold text-stone-900 mb-4">
          The gap we are trying to fill
        </h2>
        <p className="text-stone-600 leading-relaxed">
          Most patients with haemochromatosis are told to avoid red meat and
          alcohol. But the reality of managing iron through diet is far more
          complex — vitamin C dramatically increases iron absorption, while
          tea, coffee, and calcium reduce it. Sex matters too: women are
          diagnosed later, often after menopause, and face different risks.
          Yet existing resources and digital tools rarely reflect any of this.
        </p>
      </div>

      {/* what is haemofood section */}
      {/* [animation-delay:0.8s] — final section fades in last */}
      <div className="py-12 border-b border-stone-200 opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards] [animation-delay:0.8s]">
        <p className="text-sm uppercase tracking-widest text-red-700 mb-2">
          What is HaemoFood
        </p>
        <h2 className="text-2xl font-bold text-stone-900 mb-4">
          A free, open-source tool built for patients
        </h2>
        <p className="text-stone-600 leading-relaxed mb-4">
          HaemoFood is a dietary safety checker designed specifically for people
          living with hereditary haemochromatosis. Search any food and get a
          clear traffic-light rating — safe, moderate, or avoid — based on
          clinical guidance from the Irish Haemochromatosis Association.
        </p>
        <p className="text-stone-600 leading-relaxed">
          This tool is completely free and open source. It was built by students
          as part of the Virtuome 2026 research programme to bridge the gap
          between diagnosis and day-to-day dietary management. Our goal is to
          give patients and their carers a simple, reliable resource backed by
          real clinical evidence — alongside sharing what we learn through our
          research.
        </p>
      </div>

    </div>
  )
}