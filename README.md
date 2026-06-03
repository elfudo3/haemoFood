# HaemoFood

**A dietary safety tool for people living with hereditary haemochromatosis.**

🌐 [haemo-food.vercel.app](https://haemo-food.vercel.app)

---

## What is this?

HaemoFood helps people with hereditary haemochromatosis figure out what they can safely eat. You search for a food, and we tell you whether it's 🟢 Safe, 🟡 Moderate, or 🔴 Avoid — based on clinical guidelines from the Irish Haemochromatosis Association.

It's not a replacement for your doctor or dietitian. It's the tool we wished existed when we started researching this condition.

---

## Why we built it

Most patients are told to "avoid red meat and alcohol" and left to figure out the rest themselves. But the reality of managing iron through diet is much more nuanced — vitamin C supplements dramatically increase iron absorption, tea and coffee reduce it, and heme iron from meat is absorbed 2–3x more efficiently than non-heme iron from plants. Existing resources rarely explain any of this clearly.

HaemoFood is our attempt to bridge that gap. It was built as part of the **Virtuome 2026** student research programme, bringing together students from the University of Galway, UCD, and DCU.

---

## Features

- **Food search** — searches our curated database of 150 clinically rated Irish foods and the USDA FoodData Central database simultaneously
- **Traffic light ratings** — Safe / Moderate / Avoid based on IHA dietary guidelines
- **HaemoBot** — an AI assistant trained on IHA guidelines that can answer specific questions about diet and haemochromatosis
- **Learn section** — plain-language guide to the condition, heme vs non-heme iron, enhancers and inhibitors, and alcohol risks — all referenced to the IHA dietary guide
- **Transparent methodology** — we explain exactly how ratings are calculated and where the data comes from

---

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | React + Vite |
| Styling | Tailwind CSS |
| Food data | USDA FoodData Central API |
| AI assistant | OpenRouter (Claude Haiku) |
| Hosting | Vercel |
| Testing | Vitest + React Testing Library |

---

## Clinical basis

All safety ratings are based on the Irish Haemochromatosis Association's *Diet & Haemochromatosis* guide (February 2023), written by Sarah Keogh, Consultant Dietitian, in association with INDI.

Our curated food database distinguishes between heme iron (animal sources — more easily absorbed) and non-heme iron (plant sources — less easily absorbed). USDA-sourced results use a numerical iron threshold as a fallback and should be treated as approximate.

---

## The team

Built by students as part of Virtuome 2026.

| Name | University | Role |
|---|---|---|
| Jakub Zeman | University of Galway | Web Developer |
| Emma O'Keeffe | University of Galway | Researcher |
| Grace Dawson | UCD | Researcher |
| Lauren Richardson | DCU | Researcher |
| Neasa Ní Ainiféin | University of Galway | Researcher |

---

## Disclaimer

HaemoFood is an educational tool and does not constitute medical advice. Always consult your doctor or dietitian before making dietary changes based on this information.
