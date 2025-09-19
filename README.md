# 📊 Mini Seller Console

A **mini web CRM** built with **React + TypeScript + TailwindCSS.**
Allows you to manage **Leads** and **Opportunities** easily, with a basic conversion flow and local persistence.

<p align="center"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" height="40" alt="React"/> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" height="40" alt="TypeScript"/><img src="https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg" height="40" alt="Tailwind CSS"/></p>

---

## 🚀 Setup

### 🔧 Prerequisites

- **Node.js** `>= 18`
- **npm** `>= 9` (or yarn/pnpm)

### ▶️ Instalation and running

```bash
# Install dependencies
npm install

# Run in dev mode
npm run dev

# Build for production
npm run build
```

➡️ The app will be available on **http://localhost:5173**

---

## 🛠️ Tech Stack

- ⚛️ **React + Vite + TypeScript**
- 🎨 **TailwindCSS** (responsive styling)
- 🌐 **React Router** (navigation)
- 💾 **LocalStorage** (persistence of filters, sorting and opportunities)
- 🗂️ **Fake APIs** (JSON + memory with simulated latency)

---

## 📂 Project structure

```
src/
 ├── app/              # Root, routes, providers
 ├── assets/           # Logos and images
 ├── components/       # UI primitives, layouts, feedback
 ├── features/         # Leads e Opportunities
 ├── lib/              # Utils (storage, sort, debounce, etc.)
 └── pages/            # LeadsPage, OpportunitiesPage
public/data/           # Seed data (leads.json)
```

## 🚀 Live Project

- 📂 **Repository:** [View on GitHub](https://github.com/Glaubert01/FE_HW_Mini_Seller_Console)
- 🌐 **Live Demo:** [Check it out on Netlify](https://flourishing-kulfi-9810c3.netlify.app/leads)

---

## 🎥 Demo

Here’s a quick demo of the project in action:

![Project Demo](./assets/demo.gif)

---

---

## ⚙️ Features

### 👥 Leads

- List, filter, search, sort
- Edit email/status inline
- Details panel (slide-over)

### 💼 Opportunities

- Converting leads into opportunities
- Simple in-memory CRUD
- 🔒 **Duplicate prevention:** the system checks existing opportunities
  before creating a new one. If a potential duplicate is detected
  (based on key fields like name, company, or email), the creation
  is blocked and the user is notified. This ensures data integrity
  and keeps the pipeline clean.

### 📌 Persistence

- Filters & sorting saved in LocalStorage
- Opportunities persist between reloads

### ⚡ UX

- **Optimistic updates + rollback**
- **Responsivo** (horizontal scroll in tables on mobile)
- **Acessibilidade básica** (ARIA, visible focus)
- **Dark mode** optional

---

## 🎯 Design decisions & trade-offs

> **Fake API with latency**  
> ✅ Simulates real asynchronous calls
> ⚠️ No real persistence in DB

> **LocalStorage**  
> ✅ Simple and fast for demo
> ⚠️ Not shareable across devices

> **TailwindCSS**  
> ✅ Fast and responsive styling
> ⚠️ JSX with many utility classes

> **Optimistic updates**  
> ✅ Instant user feedback
> ⚠️ Requires rollback on error

---

## ✅ How to test

### Leads Page

- Search by name/email/company
- Filter by status or source
- Sort columns (asc/desc)
- Edit email/status
- Convert lead to opportunity

### Opportunities Page

- View opportunities created by conversion
- Check persistence after reload

### Responsiveness

- Test in DevTools (iPhone mode)
- Horizontal scrolling in tables

### Dark Mode

- Switch theme in the header
- Check color adjustments

---

## 🔮 Future

- Real backend (REST/GraphQL)
- Authentication & multi-user
- Advanced CRM (pipeline, notes, reminders)
- Bulk actions (multi-select leads)
- Testing (Vitest + React Testing Library)
- Improved accessibility (screen reader, full ARIA roles)
- Visualizations (conversion rate charts, etc.)

---

## 👨‍💻 Author

**Glaubert Nunes da Rosa**
