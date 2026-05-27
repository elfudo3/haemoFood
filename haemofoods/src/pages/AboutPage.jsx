// about haemochromatosis — plain-language info page with dietary guidance
export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-stone-900 mb-2">About Haemochromatosis</h1>
      <p className="text-sm text-stone-400 mb-8">
        Plain-language guide - not medical advice
      </p>

      {/* what is haemochromatosis */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-stone-900 mb-3">What is Haemochromatosis?</h2>
        <p className="text-stone-600 mb-3">
          Haemochromatosis is one of the most common genetic conditions in Ireland. It causes
          your body to absorb too much iron from food. Normally your body takes in just the right
          amount of iron and discards the rest — with haemochromatosis, that control mechanism
          is faulty, so iron builds up over time.
        </p>

        <p className="text-sm text-stone-500 mb-2">
          Common symptoms of hereditary haemochromatosis — many overlap with other conditions,
          which is why it often goes undiagnosed for years.
        </p>
        <img
          src="/images/HHSymptoms.png"
          alt="Diagram showing common symptoms of hereditary haemochromatosis including fatigue, joint pain, skin discolouration, and organ damage"
          className="w-full rounded-lg mb-4"
        />

        <p className="text-stone-600 mb-3">
          Excess iron gets deposited in organs — especially the liver, heart, and pancreas — where
          it can cause serious damage if left untreated. In the liver, iron overload progresses
          through stages — from initial iron accumulation to inflammation, fibrosis, and in severe
          cases, cirrhosis. Early diagnosis and treatment can halt this progression entirely.
        </p>

        <p className="text-sm text-stone-500 mb-2">
          How iron overload damages the liver over time — from healthy tissue through to cirrhosis.
        </p>
        <img
          src="/images/HHLiverDamageProgression.jpeg"
          alt="Diagram showing the progression of liver damage from iron overload: healthy liver, iron accumulation, fibrosis, and cirrhosis"
          className="w-full rounded-lg mb-4"
        />

        <p className="text-stone-600 mb-3">
          The main treatment is venesection — regularly removing blood to reduce the body's
          iron stores. Each session removes around 250mg of iron. Most patients start with
          weekly sessions until iron levels normalise, then move to maintenance sessions
          every few months. Diet alone cannot treat haemochromatosis, but managing what you
          eat plays an important supporting role alongside treatment.
        </p>

        <p className="text-sm text-stone-500 mb-2">
          Venesection (phlebotomy) — the primary treatment for reducing iron overload.
        </p>
        <img
          src="/images/Phlebotomy.png"
          alt="Diagram showing the phlebotomy procedure used to treat haemochromatosis by removing iron-rich blood"
          className="w-full rounded-lg mb-4"
        />
      </section>

      {/* why diet matters */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-stone-900 mb-3">Why does diet matter?</h2>
        <p className="text-stone-600 mb-3">
          Every time you eat, your gut decides how much iron to absorb. For most people that
          process is automatic — for haemochromatosis patients it is not, so the type and amount
          of iron in your food directly affects how quickly iron builds up in your body.
        </p>
        <p className="text-stone-600 mb-3">
          Not all iron is equal. Heme iron — found in red meat, organ meat, and shellfish — is
          absorbed two to three times more efficiently than non-heme iron from plant sources like
          lentils or spinach. This means beef at 2.6mg of iron per 100g is more of a concern
          than spinach at 2.7mg, even though the numbers look similar.
        </p>
        <p className="text-stone-600 mb-3">
          Some foods and drinks also affect how much iron your gut absorbs from everything else
          in the same meal. Tea, coffee, and calcium-rich dairy slow absorption down — vitamin C
          supplements and alcohol speed it up. The tips section below explains how to use this
          to your advantage.
        </p>
      </section>

    </div>
  )
}