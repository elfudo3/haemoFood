//learn about haemochromatosis — based on IHA "Diet & Haemochromatosis" guide (Feb 2023)
export default function LearnPage() {
  return (
    <div className="max-w-3xl mx-auto">

      {/* hero — matches HomePage stagger pattern */}
      <div className="text-center pt-16 pb-12 border-b border-stone-200">
        <h1 className="text-4xl font-bold tracking-tight text-stone-900 mb-4 opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards]">
          Understanding
          <br />
          <span className="text-red-700 inline-block opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards] [animation-delay:0.15s]">
            Haemochromatosis
          </span>
        </h1>
        <p className="text-lg text-stone-500 max-w-lg mx-auto opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards] [animation-delay:0.3s]">
          Based on the Irish Haemochromatosis Association&apos;s dietary guide,
          written by Sarah Keogh, Consultant Dietitian, with INDI.
        </p>
      </div>

      {/* ===== SECTION 1: What is Haemochromatosis ===== */}
      <section className="py-12 border-b border-stone-200 opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards] [animation-delay:0.5s]">
        <p className="text-sm uppercase tracking-widest text-red-700 mb-2">The Condition</p>
        <h2 className="text-2xl font-bold text-stone-900 mb-4">What is Haemochromatosis?</h2>

        <p className="text-stone-600 leading-relaxed mb-4">
          A healthy person typically absorbs 1–2mg of iron from food each day. People with
          haemochromatosis absorb significantly more than this. Because the body has no natural
          way to get rid of excess iron, it accumulates over time and gets deposited in organs
          — particularly the liver, heart, and pancreas. Left untreated, this build-up can lead
          to liver disease, heart disease, diabetes, and joint problems.
          <span className="text-xs text-stone-400 align-super">[1,2,3]</span>
        </p>

        {/* symptoms diagram — image beside text */}
        <div className="flex flex-col md:flex-row gap-6 mb-6">
          <img
            src="/images/HHSymptoms.png"
            alt="Diagram showing common symptoms of hereditary haemochromatosis"
            className="w-full md:w-56 rounded-xl object-contain flex-shrink-0"
          />
          <div>
            <p className="font-medium text-stone-800 mb-2">Common symptoms</p>
            <p className="text-stone-600 leading-relaxed text-sm">
              Fatigue, joint pain, skin discolouration, abdominal pain, and loss of
              sex drive are among the most common signs. Many of these overlap with
              other conditions, which is why haemochromatosis often goes undiagnosed
              for years. A simple blood test measuring transferrin saturation and
              serum ferritin can detect it early — before organ damage occurs.
              <span className="text-xs text-stone-400 align-super">[2]</span>
            </p>
          </div>
        </div>

        {/* liver damage diagram */}
        <div className="flex flex-col md:flex-row gap-6 mb-6">
          <img
            src="/images/HHLiverDamageProgression.jpeg"
            alt="Diagram showing the progression of liver damage from iron overload"
            className="w-full md:w-56 rounded-xl object-contain flex-shrink-0"
          />
          <div>
            <p className="font-medium text-stone-800 mb-2">How iron damages the liver</p>
            <p className="text-stone-600 leading-relaxed text-sm">
              Iron overload in the liver progresses through stages: initial iron
              accumulation, inflammation, fibrosis, and in severe cases, cirrhosis.
              Once diagnosed, treatment can halt and even reverse early-stage damage.
              The key is early detection — most organ damage is preventable with
              timely intervention.
              <span className="text-xs text-stone-400 align-super">[2,3]</span>
            </p>
          </div>
        </div>

        {/* treatment diagram */}
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src="/images/Phlebotomy.png"
            alt="Diagram showing the phlebotomy procedure"
            className="w-full md:w-56 rounded-xl object-contain flex-shrink-0"
          />
          <div>
            <p className="font-medium text-stone-800 mb-2">Treatment: venesection</p>
            <p className="text-stone-600 leading-relaxed text-sm">
              The primary treatment is venesection (phlebotomy) — regularly removing
              blood to reduce the body&apos;s iron stores. Blood is rich in iron, so
              removing it directly lowers stored iron levels. Most patients start with
              frequent sessions until iron normalises, then move to maintenance
              sessions every few months. Diet cannot replace this treatment, but
              dietary changes can help limit iron absorption between sessions.
              <span className="text-xs text-stone-400 align-super">[1,2]</span>
            </p>
          </div>
        </div>
      </section>

      {/* ===== SECTION 2: Two Types of Iron ===== */}
      <section className="py-12 border-b border-stone-200 opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards] [animation-delay:0.6s]">
        <p className="text-sm uppercase tracking-widest text-red-700 mb-2">Diet &amp; Iron</p>
        <h2 className="text-2xl font-bold text-stone-900 mb-4">Not all iron is equal</h2>

        <p className="text-stone-600 leading-relaxed mb-4">
          There are two types of dietary iron, and your body handles them very differently.
          Understanding the difference is the single most important thing for managing iron
          through diet.
          <span className="text-xs text-stone-400 align-super">[6]</span>
        </p>

        {/* heme vs non-heme cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="rounded-xl border border-red-200 bg-red-50 p-5">
            <p className="font-semibold text-red-800 mb-2">Heme Iron</p>
            <p className="text-sm text-red-700 mb-3">
              Found in meat, poultry, and fish. Your body absorbs this type of iron
              very efficiently — which makes it the bigger concern for people with
              haemochromatosis.
            </p>
            <p className="text-xs text-red-600">
              Sources: red meat, chicken, turkey, oily fish, shellfish, offal
              (liver, kidney)
            </p>
          </div>
          <div className="rounded-xl border border-green-200 bg-green-50 p-5">
            <p className="font-semibold text-green-800 mb-2">Non-Heme Iron</p>
            <p className="text-sm text-green-700 mb-3">
              Found in eggs, plants, and fortified foods. Your body has more
              difficulty absorbing this type, and natural compounds in these foods
              (like phytates) further reduce absorption.
            </p>
            <p className="text-xs text-green-600">
              Sources: eggs, beans, lentils, nuts, seeds, wholegrains, spinach,
              kale, fortified cereals, dark chocolate
            </p>
          </div>
        </div>

        <p className="text-stone-600 leading-relaxed">
          Choosing more non-heme iron foods in place of heme iron foods may be helpful
          for reducing overall iron absorption. Iron-fortified breakfast cereals are an
          exception — despite being non-heme, the concentrated added iron means they should
          be limited or avoided where possible.
          <span className="text-xs text-stone-400 align-super">[7,8]</span>
        </p>
      </section>

      {/* ===== SECTION 3: Enhancers and Inhibitors ===== */}
      <section className="py-12 border-b border-stone-200 opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards] [animation-delay:0.7s]">
        <p className="text-sm uppercase tracking-widest text-red-700 mb-2">What You Eat With It Matters</p>
        <h2 className="text-2xl font-bold text-stone-900 mb-4">Iron enhancers and inhibitors</h2>

        <p className="text-stone-600 leading-relaxed mb-6">
          Beyond the iron content of a food itself, other foods eaten at the same meal
          can increase or decrease how much iron your body actually absorbs. Limiting
          enhancers and adding more inhibitors to meals can reduce overall iron uptake
          — research suggests this approach may reduce phlebotomy sessions by 1–2
          per year.
          <span className="text-xs text-stone-400 align-super">[7,8,11]</span>
        </p>

        {/* enhancers */}
        <div className="rounded-xl border border-red-200 bg-red-50 p-5 mb-4">
          <p className="font-semibold text-red-800 mb-3">
            🔺 Enhancers — increase iron absorption
          </p>
          <div className="space-y-2 text-sm text-red-700">
            <p>
              <span className="font-medium">Alcohol</span> — increases
              iron absorption from food and puts additional pressure on the liver.
              Some alcoholic drinks also contain iron themselves, particularly cider
              and red wine.
              <span className="text-xs text-red-400 align-super">[1,2]</span>
            </p>
            <p>
              <span className="font-medium">Vitamin C supplements</span> — best
              avoided entirely. If you must take one, have it at least one hour
              before or after eating. Vitamin C in whole fruits and vegetables is
              fine and does not need to be avoided.
              <span className="text-xs text-red-400 align-super">[7,8]</span>
            </p>
            <p>
              <span className="font-medium">Fructose</span> — found
              mainly in fruit juices. Limit fruit juice to 150ml per day and
              have it at least one hour before or after meals.
              <span className="text-xs text-red-400 align-super">[7,8]</span>
            </p>
          </div>
        </div>

        {/* inhibitors */}
        <div className="rounded-xl border border-green-200 bg-green-50 p-5">
          <p className="font-semibold text-green-800 mb-3">
            🔻 Inhibitors — reduce iron absorption
          </p>
          <div className="space-y-2 text-sm text-green-700">
            <p>
              <span className="font-medium">Tea and coffee</span> — contain
              polyphenols (tannins) that reduce iron absorption. Drinking tea or
              coffee with or just after meals may help.
              <span className="text-xs text-green-500 align-super">[9]</span>
            </p>
            <p>
              <span className="font-medium">Calcium-rich foods</span> — milk,
              yoghurt, and cheese eaten with meals may help reduce iron absorption.
              <span className="text-xs text-green-500 align-super">[7,8]</span>
            </p>
            <p>
              <span className="font-medium">Phytates</span> — found naturally in
              nuts, seeds, beans, lentils, and wholegrains. Although some of these
              foods contain iron, the phytates in them reduce how much is absorbed.
              <span className="text-xs text-green-500 align-super">[10]</span>
            </p>
            <p>
              <span className="font-medium">Dietary fibre</span> — wholegrain
              bread, bran-based cereals, fruits, and vegetables are all good sources.
              <span className="text-xs text-green-500 align-super">[7,8]</span>
            </p>
            <p>
              <span className="font-medium">Oxalates</span> — found in spinach,
              almonds, beetroot, berries, and rhubarb. These compounds bind to iron
              and reduce its absorption.
              <span className="text-xs text-green-500 align-super">[10]</span>
            </p>
          </div>
        </div>
      </section>

      {/* ===== SECTION 4: Alcohol ===== */}
      <section className="py-12 border-b border-stone-200 opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards] [animation-delay:0.8s]">
        <p className="text-sm uppercase tracking-widest text-red-700 mb-2">Important Warning</p>
        <h2 className="text-2xl font-bold text-stone-900 mb-4">Alcohol and haemochromatosis</h2>

        <p className="text-stone-600 leading-relaxed mb-4">
          Alcohol is a particular concern for people with haemochromatosis for three reasons:
          it increases iron absorption from food, it puts additional stress on a liver that
          may already be carrying excess iron, and some alcoholic drinks are themselves
          significant sources of iron. If iron overload has caused any liver damage, your
          doctor may advise avoiding alcohol completely.
          <span className="text-xs text-stone-400 align-super">[1,2]</span>
        </p>

        {/* alcohol iron table */}
        <div className="rounded-xl border border-stone-200 overflow-hidden mb-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-stone-50">
                <th className="text-left px-4 py-3 font-semibold text-stone-700">Drink</th>
                <th className="text-right px-4 py-3 font-semibold text-stone-700">Iron content</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              <tr><td className="px-4 py-2.5 text-stone-600">Cider (500ml bottle)</td><td className="px-4 py-2.5 text-right text-red-600 font-medium">2.5mg</td></tr>
              <tr><td className="px-4 py-2.5 text-stone-600">Rosé wine (125ml glass)</td><td className="px-4 py-2.5 text-right text-red-600 font-medium">1.3mg</td></tr>
              <tr><td className="px-4 py-2.5 text-stone-600">Red wine (125ml glass)</td><td className="px-4 py-2.5 text-right text-red-600 font-medium">1.1mg</td></tr>
              <tr><td className="px-4 py-2.5 text-stone-600">Stout (1 pint / 536ml)</td><td className="px-4 py-2.5 text-right text-red-600 font-medium">1.1mg</td></tr>
              <tr><td className="px-4 py-2.5 text-stone-600">White wine (125ml glass)</td><td className="px-4 py-2.5 text-right text-yellow-600 font-medium">0.63mg</td></tr>
              <tr><td className="px-4 py-2.5 text-stone-600">Lager (1 pint / 536ml)</td><td className="px-4 py-2.5 text-right text-green-600 font-medium">0.01mg</td></tr>
              <tr><td className="px-4 py-2.5 text-stone-600">Spirits</td><td className="px-4 py-2.5 text-right text-green-600 font-medium">0mg</td></tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-stone-500 italic">
          Iron content data from the IHA dietary guide. Note that these values may
          vary between brands. Your doctor may advise lower limits than the general
          population guidelines, or complete avoidance.
        </p>
      </section>

      {/* ===== SECTION 5: Raw Shellfish ===== */}
      <section className="py-12 border-b border-stone-200 opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards] [animation-delay:0.9s]">
        <p className="text-sm uppercase tracking-widest text-red-700 mb-2">Food Safety</p>
        <h2 className="text-2xl font-bold text-stone-900 mb-4">Raw shellfish warning</h2>

        <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
          <p className="text-stone-700 leading-relaxed">
            People with haemochromatosis should avoid raw shellfish. Shellfish can carry
            a bacterium called Vibrio vulnificus, which thrives in iron-rich environments
            and can cause severe infection in people with iron overload. Cooking shellfish
            thoroughly at high temperature destroys these bacteria. If you handle raw
            shellfish, always wash your hands well with soap and water.
            <span className="text-xs text-stone-400 align-super">[12]</span>
          </p>
        </div>
      </section>

      {/* ===== SECTION 6: Daily Iron Needs ===== */}
      <section className="py-12 border-b border-stone-200 opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards] [animation-delay:1.0s]">
        <p className="text-sm uppercase tracking-widest text-red-700 mb-2">How Much Is Enough</p>
        <h2 className="text-2xl font-bold text-stone-900 mb-4">You still need iron</h2>

        <p className="text-stone-600 leading-relaxed mb-4">
          Iron is an essential nutrient — even for people with haemochromatosis. It plays
          a role in forming healthy red blood cells, supporting brain function, releasing
          energy from food, maintaining the immune system, and building the protein
          myoglobin for healthy muscles. Cutting out all iron-containing foods would lead
          to a very unbalanced diet and could cause deficiencies in other important
          nutrients.
          <span className="text-xs text-stone-400 align-super">[4]</span>
        </p>

        {/* recommended daily iron table */}
        <div className="rounded-xl border border-stone-200 overflow-hidden mb-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-stone-50">
                <th className="text-left px-4 py-3 font-semibold text-stone-700">Group</th>
                <th className="text-right px-4 py-3 font-semibold text-stone-700">Daily iron intake</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              <tr>
                <td className="px-4 py-2.5 text-stone-600">Women before menopause (18–~50)</td>
                <td className="px-4 py-2.5 text-right font-medium text-stone-800">16mg</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-stone-600">Women after menopause (50+)</td>
                <td className="px-4 py-2.5 text-right font-medium text-stone-800">11mg</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-stone-600">Men (18+)</td>
                <td className="px-4 py-2.5 text-right font-medium text-stone-800">11mg</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-stone-500 italic">
          Recommended daily intakes from EFSA (European Food Safety Authority).
          <span className="text-xs text-stone-400 align-super">[5]</span>
        </p>
      </section>

      {/* ===== REFERENCES ===== */}
      <section className="py-12 opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards] [animation-delay:1.1s]">
        <p className="text-sm uppercase tracking-widest text-red-700 mb-2">Sources</p>
        <h2 className="text-2xl font-bold text-stone-900 mb-4">References</h2>

        <p className="text-sm text-stone-500 mb-4">
          All content on this page is based on the Irish Haemochromatosis
          Association&apos;s &quot;Diet &amp; Haemochromatosis&quot; guide
          (February 2023), written by Sarah Keogh, Consultant Dietitian,
          in association with INDI. The original references are listed below.
        </p>

        <ol className="space-y-2 text-xs text-stone-400 leading-relaxed list-decimal list-inside">
          <li>Moretti D. et al. Relevance of dietary iron intake and bioavailability in the management of HFE hemochromatosis: a systematic review. <span className="italic">Am J Clin Nutr.</span> 2013;98(2):468–479.</li>
          <li>HSE Hereditary Haemochromatosis Working Group. A model of care for Hereditary Haemochromatosis — Diagnosis, Treatment and Management. 2019.</li>
          <li>Adams P. et al. Therapeutic recommendations in HFE hemochromatosis for p.Cys282Tyr homozygous genotype. <span className="italic">Hepatology International.</span> 2018;12(2):83–86.</li>
          <li>EFSA Panel on Dietetic Products, Nutrition and Allergies. Scientific Opinion on health claims related to iron. <span className="italic">EFSA Journal.</span> 2009;7(9):1215.</li>
          <li>EFSA Panel on Dietetic Products, Nutrition and Allergies. Scientific Opinion on Dietary Reference Values for iron. <span className="italic">EFSA Journal.</span> 2015;13(10):4254.</li>
          <li>Collings R. et al. The absorption of iron from whole diets: a systematic review. <span className="italic">Am J Clin Nutr.</span> 2013;98:65–81.</li>
          <li>Omena J. et al. The effect of food and nutrients on iron overload: what do we know so far? <span className="italic">Eur J Clin Nutr.</span> 2021;75:1771–1780.</li>
          <li>Milman NT. Managing Genetic Hemochromatosis: An Overview of Dietary Measures. <span className="italic">Gastroenterology Res.</span> 2021;14(2):66–80.</li>
          <li>Hurrell RF et al. Inhibition of non-haem iron absorption in man by polyphenolic-containing beverages. <span className="italic">Br J Nutr.</span> 1999;81(4):289–95.</li>
          <li>Milman NT. A Review of Nutrients and Compounds Which Promote or Inhibit Intestinal Iron Absorption. <span className="italic">J Nutr Metab.</span> 2020;2020:7373498.</li>
          <li>Van Doorn GM. Dietary advice in HFE-hemochromatosis. Wageningen University. 2012.</li>
          <li>Leng F. et al. Epidemiology, pathogenetic mechanism, clinical characteristics, and treatment of Vibrio vulnificus infection. <span className="italic">Eur J Clin Microbiol Infect Dis.</span> 2019;38(11):1999–2004.</li>
        </ol>

        {/* disclaimer */}
        <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-xl">
          <p className="text-sm text-amber-800">
            <span className="font-semibold">Medical disclaimer:</span> This page is for
            educational purposes only and does not constitute medical advice. Diet alone
            cannot treat haemochromatosis. Always consult your doctor or dietitian before
            making dietary changes.
          </p>
        </div>
      </section>

    </div>
  )
}