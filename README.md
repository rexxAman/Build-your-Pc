# SetupForge — Workspace Checklist & Custom PC Builder

A web application for planning, budgeting, and assembling productive workspaces and custom PC builds.

## Features

- **Interactive Setup Checklist**:
  - Add products (desks, ergonomic chairs, monitors, lighting, audio, peripherals, cable management).
  - Track product links, prices, quantity, priority, and purchase status (Wishlist, Ordered, Received).
  - Live cost aggregation, categorized spending breakdown, and budget health alerts.
- **Custom PC Builder Studio**:
  - Component selection (CPU, GPU, Motherboard, RAM, Storage, PSU, Cooler, Case).
  - Real-time compatibility hints and estimated power consumption (wattage) with PSU adequacy indicator.
  - Curated PC presets (*Developer Productivity*, *Creative Studio & AI*, *Scandinavian Studio Aesthetic*).
  - 1-Click **"Add PC Build into Checklist"** to sync all parts and costs into your main workspace budget.
- **Smart Recommendations & Deal Search**:
  - Battle-tested setup blueprints (Minimalist Developer, Creative Studio, High-Value Ergonomic).
  - Instant Google, Amazon, and Reddit deal search launchers for any hardware or accessory.
- **Vercel Ready**:
  - Deploy instantly to Vercel with zero configuration required.

## Quick Start (Local)

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deploying to Vercel

1. Push this repository to GitHub.
2. Import the repository in [Vercel](https://vercel.com).
3. Click **Deploy**. Vercel will automatically build and host the application.
