# HaemoEat — App Specification

**A food safety checker for haemochromatosis patients and caregivers**

---

## Problem Statement

Haemochromatosis patients must manage dietary iron intake daily, but there is no simple tool that tells them whether a specific food is safe. Most information is buried in medical PDFs or generic nutrition sites with no condition-specific guidance. This app gives patients and caregivers a clear, immediate answer when evaluating a food.

---

## Users

- Haemochromatosis patients managing their own diet
- Caregivers and family members supporting a patient

---

## Core Features (Must Have)

### 1. Food Search

- Search bar queries the Open Food Facts API in real time
- Returns a list of matching products with name, brand, and image
- User selects a product to see the full breakdown
- **Fallback:** if a product is not found, display a "not in database" message with a tip to search a similar category

### 2. Safety Score

- Prominent traffic light rating displayed at the top of each result:
  - 🟢 **Safe**
  - 🟡 **Moderate** — limit intake
  - 🔴 **Avoid**
- Score is based on iron content per 100g using thresholds defined by the biology team
- **Category fallback:** if iron data is missing from the database, classify by food category (e.g. red meat → Avoid, dairy → Safe)
- Short plain-English explanation of the rating, e.g. *"High iron content — limit intake"*

### 3. Nutrient Breakdown

- Display iron (mg/100g) — the primary metric
- Flag vitamin C content — increases iron absorption, an important secondary concern
- Flag alcohol content — causes liver stress, relevant for haemochromatosis patients
- Disclaimer on every result page: *"Always consult your dietitian — this tool is a guide, not medical advice"*

### 4. About Haemochromatosis Page

- Written in plain language, no medical jargon
- What is haemochromatosis and why does diet matter?
- General foods to eat / foods to limit — a simple guide
- Dietary tips supplied by the biology team (e.g. drinking tea or coffee with meals reduces iron absorption)
- Link to the Irish Haemochromatosis Association as an external resource

---

## Extended Features (Nice to Have)

These are only worth building after the core features are complete and tested.

- **Favourites** — save foods you have checked (requires Firebase Auth + Firestore)
- **Daily iron tracker** — add foods to a daily log, see total iron intake vs recommended limit (requires Firebase)
- **Search history** — recent searches stored locally in the browser, no backend needed
- **Category browse** — browse foods by category (meats, dairy, cereals, etc.) with pre-filtered safety ratings

---

## Tech Stack

| Part             | Technology            | Reason                                    |
| ---------------- | --------------------- | ----------------------------------------- |
| Frontend         | React                 | Component-based, easy to iterate          |
| Styling          | Tailwind CSS          | Fast, clean, responsive by default        |
| Food data        | Open Food Facts API   | Free, public, no API key required         |
| Backend (optional) | Firebase            | Auth + Firestore for favourites/tracker   |
| Hosting          | Vercel                | Free tier, deploys in minutes             |

> **Note:** If Firebase is skipped, favourites and the daily tracker are dropped but the core app works entirely without a backend. This is a valid choice for the 6-week timeline.

---

## 6-Week Plan

### Week 1 — Design & Clinical Input

- Sketch UI wireframes (pen and paper or Figma)
- Meet with biology teammates — collect iron thresholds, dietary rules, and About page content
- Set up React project structure
- Set up Firebase if the favourites/tracker features are in scope
- Define food category fallback rules with the team

### Week 2 — Core Search

- Build the search bar component
- Connect to the Open Food Facts API
- Display raw product results cleanly
- Handle "not found" and API error states

### Week 3 — Scoring Logic

- Implement the traffic light rating using the thresholds agreed in Week 1
- Build category fallback for products missing iron data
- Flag vitamin C and alcohol content where present
- Write unit tests for the scoring logic

### Week 4 — Information Pages

- Build the About haemochromatosis page
- Build the general foods to eat/avoid guide
- Add dietary tips from the biology team
- Add the medical disclaimer to all result pages

### Week 5 — Polish & Nice-to-Haves

- Make the layout fully mobile-friendly
- Implement favourites or search history if Firebase is set up
- Handle all edge cases and error states
- UI refinement and accessibility checks

### Week 6 — Testing & Demo

- Test with real foods from Irish supermarkets (Tesco, SuperValu, Dunnes)
- Document known limitations honestly
- Deploy to Vercel or Firebase Hosting
- Prepare the Virtuome demo

---

## Disclaimer

This application is intended as an educational and dietary guidance tool for the Virtuome 2026 research programme. It does not constitute medical advice. Users should consult a qualified healthcare professional or dietitian before making changes to their diet based on this tool.
