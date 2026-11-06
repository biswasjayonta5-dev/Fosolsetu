# 🌾 FosolSetu (ফসলে সেতু)

> **Fair Farm Finance & Direct Marketplace for Bangladesh Smallholder Farmers**  
> *“কৃষক কষ্ট পাওয়ার আগেই যেন ন্যায্য আয় নিশ্চিত করতে পারে।”*

FosolSetu is a mobile-first agricultural fintech and direct trade platform built to break the debt cycle of rural smallholder farmers in Bangladesh. By combining pre-harvest micro-advances (up to 30% of projected crop value at transparent, 0% compound interest flat fees) with a verified 0%-commission direct marketplace, real-time localized weather radar alerts, AI price forecasting with voice read-aloud in Bengali, and a dedicated inclusion track for women farmers.

---

## 📱 Mobile-First Features

- **Thumb-Friendly Touch Navigation**: 56px bottom action bar, notch and dynamic safe-area insets, responsive on all smartphones (Android, iPhone, feature-browser hybrids).
- **Toggleable Mobile Shell & Desktop View**: Switch between responsive full-screen and a sleek smartphone device simulator with a single tap.
- **Bilingual & Voice-Enabled (বাংলা ও English)**: Full localization with standard Hind Siliguri typography and native speech synthesis (`SpeechSynthesisUtterance`) that reads financial terms and market alerts aloud for low-literacy farmers.
- **4-Stage Farm Journey Bridge**:
  1. 🌱 **Plan (পরিকল্পনা)**: Visual crop selector (Rice, Jute, Potato, Tomato, Onion, Mustard), land calculator in Bigha, and yield estimation.
  2. 💰 **Advance (অগ্রিম)**: Transparent credit risk assessment score, satellite yield index, 5%–8% flat fee with zero hidden compounding interest, and instant simulated bKash/Nagad disbursement.
  3. 🌤️ **Grow (চাষ)**: Localized weather alerts (heavy rain, nor'wester storms) with practical farm advisories, 5-day forecasts, and SMS notifications.
  4. 🤝 **Sell (বিক্রি)**: 100% commission-free listing, real-time bidding from verified buyers (Karim Agro, Bengal Export, GreenPlate Foods), and automated settlement receipts.
- **Input Dealers Directory (সার-বীজের দোকান)**: Certified BADC dealer directory with stock inventory and one-click direct telephone calling (`tel:...`).
- **Women Farmers & Co-operative Track (নারী কৃষক সমবায়)**: Peer verification without requiring upfront land ownership deeds, dedicated field agent visits, and a preferential 5% fee tier.
- **AI Crop Doctor (এআই ক্রপ ডক্টর)**: Quick mobile leaf symptom checker with targeted treatment recommendations for blights and pests.
- **Institutional Buyer Portal (পাইকারি ক্রেতা)**: Verified wholesaler bidding, counter-offer negotiations (-3% / ask price), and trade license accreditation.
- **Partner & MFI Admin Dashboard (পার্টনার ড্যাশবোর্ড)**: Real-time portfolio at risk (PAR < 1.2%), active subscriber mix (Basic, Pro, Premium), disbursed advances, and MRR analytics.

---

## 🚀 How to Push this App to your GitHub Repository

This workspace is already pre-initialized with Git! To link and push it to your personal or organization GitHub account:

### Step 1: Create a New Repository on GitHub
1. Go to [github.com/new](https://github.com/new).
2. Set the repository name to `fosolsetu` (or your preferred name).
3. Choose **Public** or **Private**.
4. Do **not** check "Add a README" or ".gitignore" (these are already configured).
5. Click **Create repository**.

### Step 2: Push From Terminal
Run the following commands in the project root:

```bash
# 1. Add your GitHub remote URL (replace <your-username> with your GitHub username)
git remote add origin https://github.com/<your-username>/fosolsetu.git

# 2. Ensure your main branch is set
git branch -M main

# 3. Push all commits to GitHub
git push -u origin main
```

---

## 🛠️ Local Development & Quickstart

### Prerequisites
- Node.js (v18+ or v20+)
- npm or yarn

### Installation
```bash
# 1. Clone repository
git clone https://github.com/<your-username>/fosolsetu.git
cd fosolsetu

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

The application will start on `http://localhost:3000`.

### Building for Production
```bash
npm run build
```

The optimized static build will be placed in the `dist/` directory, ready to deploy to Vercel, Netlify, Cloud Run, or GitHub Pages.

---

## 🏗️ Architecture & Technology Stack

- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS v4 with custom CSS variables, dark/contrast mode, and safe-area insets
- **Icons**: Lucide React
- **Animations & Effects**: Motion & Canvas Confetti
- **Typography**: Google Fonts ("Hind Siliguri")
- **Audio / Accessibility**: Web Speech API (`SpeechSynthesis`) with `bn-BD` and `en-US` voices
- **State & Storage**: Reactive state with persistent browser `localStorage`

---

## 📄 License
Apache-2.0. Built with pride for Bangladesh's farming communities.
