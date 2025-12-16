# Client Manager SaaS MVP - Implementation Plan

## 1. Project Setup & Architecture
- **Framework:** React + Vite (Fast, lightweight, optimal for SPAs)
- **Language:** JavaScript (Standard for rapid MVP, unless TypeScript is preferred - assuming JS based on "Vanilla CSS" context, but TS is standard for SaaS. I will stick to JS/JSX for simplicity unless prompt implies otherwise. The prompt mentions "Core: HTML and Javascript". I will use JSX.)
- **Styling:** Vanilla CSS (CSS Modules or standard CSS with Variables)
  - Focus on `variables.css` for Design Tokens (Colors, Glassmorphism, Typography).
- **Icons:** `lucide-react` or `phosphor-icons` (Clean, modern).
- **Font:** Outfit (Google Fonts).

## 2. Design System Implementation (The "Premium" Feel)
- **Token Definition:**
  - Colors: Primary Orange (`#FF9F43`), Branding Purple (`#6C5CE7`).
  - Surface: Glassmorphism layers (background blurry white).
  - Shadows: Soft, diffuse shadows (`0 10px 30px rgba(0,0,0,0.08)`).
  - Radius: `24px` for cards.
- **Micro-interactions:** Hover states, scale effects on click.

## 3. Core Components
- **Layout:**
  - `Sidebar`: Fixed, translucent, pill-highlight for active state.
  - `MainContent`: 12-column grid system.
- **UI Elements:**
  - `GlassCard`: The fundamental building block.
  - `Button`: Primary (Orange) and Secondary styles.
  - `Avatar`: For users/assignees.
  - `Badge`: For status (Active, Paused, etc.).

## 4. MVP Features
1.  **Dashboard (Home):**
    - Grid view of 5 active projects.
    - Counter for pending/overdue tasks.
2.  **Clients & Projects:**
    - List view of clients.
    - Detail view to manage associated projects.
3.  **Task Manager (Kanban):**
    - Columns: To Do, In Progress, Completed.
    - Drag & Drop (using a library like `dnd-kit` or simple HTML5 API).
4.  **Finance (Simple):**
    - Log incoming payments (Date, Amount, Client).
5.  **Chat (Mock):**
    - Simple text interface for notes/collaboration.

## 5. Development Steps
1.  Initialize Vite Project.
2.  Configure Design Tokens (`index.css`).
3.  Build Layout & Navigation.
4.  Implement 'Clients' CRUD (Mock Data).
5.  Implement 'Kanban' Board.
6.  Polish Animations & Transitions.
