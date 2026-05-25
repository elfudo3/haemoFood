
// about haemochromatosis page shell — content will be added later
export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-stone-900 mb-2">About Haemochromatosis</h1>
      <p className="text-sm text-stone-400 mb-8">
        Plain-language guide - not medical advice
      </p>

      {/* What is haemochromatosis */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-stone-900 mb-3">What is Haemochromatosis?</h2>
        <p className="text-stone-600 mb-3">
          Haemochromatosis is one of the most common genetic conditions in Ireland. It causes
          your body to absorb too much iron from food. Normally your body takes in just the right
          amount of iron and discards the rest — with haemochromatosis, that control mechanism
          is faulty, so iron builds up over time.
        </p>
        <img src="/images/hereditaryHaemo.png" alt="Diagram of haemo liver" className="w-full rounded-lg my-4" />
        <p className="text-stone-600 mb-3">
          Excess iron gets deposited in organs — especially the liver, heart, and pancreas — where
          it can cause serious damage if left untreated. Around 1 in 83 people in Ireland carry
          two copies of the gene variant responsible.
        </p>
        <p className="text-stone-600 mb-3">
          The main treatment is venesection (giving blood regularly to reduce iron levels). Diet
          alone cannot treat haemochromatosis, but managing what you eat plays an important
          supporting role alongside treatment.
        </p>
      </section>

      {/* Why diet matters */}
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