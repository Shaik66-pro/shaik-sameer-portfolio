# Shaik Sameer — Python Full Stack Developer Portfolio

> **"Building Digital Experiences That Solve Real-World Problems."**
> A cinematic, interactive, and modern 3D portfolio engineered with React.js, Three.js, Tailwind CSS, and Framer Motion.

---

## 📌 Overview

This personal developer portfolio was inspired by a 5-chapter film reel aesthetic and created for **Shaik Sameer**, a Python Full Stack Developer and B.Tech ECE graduate from **MLR Institute of Technology, Hyderabad (Class of 2025)**.

The project translates 11 visual reference screenshots into a tactile, interactive digital experience featuring elastic spring physics, real-time 3D particle systems, a cursor-tracking volumetric torchlight mask, smooth chapter drawers, and comprehensive project dossiers.

---

## 🌟 Key Features

1. **Chapter 00 // The Tactile Teaser (`InteractivePullTeaser.jsx`):**
   - Interactive pullable capsule button with real-time SVG elastic tension strings (Bézier curves).
   - Direct copy-to-clipboard email feedback and quick links.

2. **Chapter 01 // The Subject & 3D Volumetric Stage (`Hero.jsx`):**
   - Three.js 3D WebGL background with floating geometric wireframes and dynamic particle starfields.
   - Real-time mouse-tracking flashlight mask revealing hidden layers and technical HUD annotations.
   - 3D extruded typography for **"SAMEER"** and primary language callout (**PYTHON**).

3. **Chapter 01 // The Curriculum & Biography (`About.jsx`):**
   - Chapter curtain slide-in with editorial stencil typography.
   - Yellow duotone portrait container and highlighted credentials table.

4. **Chapter 02 // Case Files (`Projects.jsx`):**
   - Dual showcase for **Full Stack Architectures** (FastAPI, Django, Flask, MySQL, React) and **Frontend User Experiences** (React.js, Chart.js, CSS3).
   - Interactive project inspection drawers with complete problem-solution analyses and verified "In Progress" badges.

5. **Chapter 03 // The Toolkit (`Skills.jsx`):**
   - Highlighted Python primary language badge, secondary languages, and infinite smooth marquee ribbons.
   - Clean categorized skill grids without fabricated percentages.

6. **Chapter 04 // The Evidence (`Experience.jsx` & `Certifications.jsx`):**
   - Cyber-yellow physical slab with stamped 3D lettering.
   - Verified industrial automation internship at **Polmon Instruments Pvt. Ltd.** (Plant iT MES/HMI, MySQL, PLC ST, live deployment).
   - Key honors: 1st Place National Robotics Competition (SNIST), IBS Distinction, and leadership over 85+ student club members.
   - Filterable certification cards (Infosys Springboard, SNIT, IBS, ProLeiT).

7. **Chapter 05 // One Last Thing & Contact Dossier (`Contact.jsx`):**
   - Pull-up modal drawer with responsive inquiry form, verified email copy tool, and direct download for Shaik Sameer's verified resume.

---

## 🛠️ Technology Stack

- **Core Framework:** React 18 (Vite)
- **Styling & Design System:** Tailwind CSS, PostCSS, Custom 3D Text Utilities
- **3D Graphics & Physics:** Three.js (WebGL Canvas), Framer Motion (Spring Physics & Gesture Dragging)
- **Icons:** Lucide React
- **Typography:** Syne (Display), Instrument Serif (Editorial Cursive), JetBrains Mono (Technical HUD), Inter (Body)

---

## 📁 Project Structure

```
shaik-sameer-portfolio/
├── public/
│   ├── Shaik_Sameer_Resume.pdf    # Verified PDF Resume
│   └── sameer_profile.jpg         # Profile Portrait
├── reference-shots/               # 11 Reference Video Screenshots & Contact Sheet
├── src/
│   ├── components/
│   │   ├── Navbar.jsx             # Floating Glass Header & Mobile Navigation
│   │   ├── InteractivePullTeaser.jsx # Elastic Cord "HIRE ME" Simulation
│   │   ├── Hero.jsx               # 3D Three.js & Torchlight Flashlight Hero
│   │   ├── About.jsx              # Candidate Biography & Education Grid
│   │   ├── Projects.jsx           # Full Stack & Frontend Case Files
│   │   ├── Skills.jsx             # Categorized Skills & Infinite Marquee
│   │   ├── Experience.jsx         # Polmon Instruments & Robotics Achievements
│   │   ├── Certifications.jsx     # Filterable Qualification Cards
│   │   ├── Contact.jsx            # One Last Thing & Contact Modal Drawer
│   │   ├── Footer.jsx             # Minimalist HUD Footer
│   │   └── CustomCursor.jsx       # Smooth Desktop Custom Pointer
│   ├── data/
│   │   └── portfolioData.js       # Centralized Data Matrix
│   ├── styles/
│   │   └── index.css              # 3D Text Shadows, Highlighters & Tailwind
│   ├── App.jsx                    # Root Portfolio Orchestrator
│   └── main.jsx                   # React Entrypoint
├── DESIGN_REFERENCE.md            # Detailed Screenshot Breakdown & Analysis
├── index.html                     # HTML Template with Google Webfonts
├── package.json                   # Dependencies & Scripts
├── tailwind.config.js             # Theme & Color Configuration
└── vite.config.js                 # Vite Bundler Settings
```

---

## 🚀 Local Development Instructions

1. **Clone or Navigate to the Directory:**
   ```bash
   cd "C:\Users\samee\.gemini\antigravity\scratch\shaik-sameer-portfolio"
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Build for Production:**
   ```bash
   npm run build
   ```
   The production-optimized bundle is generated in the `dist/` directory.

5. **Preview Production Build:**
   ```bash
   npm run preview
   ```

---

## 🌐 Production Deployment (Vercel)

1. **Initialize Git Repository:**
   ```bash
   git init
   git add .
   git commit -m "feat: complete cinematic 3D portfolio for Shaik Sameer"
   ```

2. **Push to GitHub:**
   ```bash
   git remote add origin https://github.com/Shaik66-pro/shaik-sameer-portfolio.git
   git branch -M main
   git push -u origin main
   ```

3. **Deploy with Vercel:**
   - Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
   - Import your GitHub repository: `Shaik66-pro/shaik-sameer-portfolio`.
   - Framework Preset: **Vite**.
   - Root Directory: `./`.
   - Build Command: `npm run build`.
   - Output Directory: `dist`.
   - Click **Deploy**.
