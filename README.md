# Jira-like Task Management System (Frontend Only)

This is a simple React + Tailwind project made for internship assignment practice.
It has a mini Kanban board with drag and drop.

## Features

- Create task
- Update task
- Delete task
- Assign task to mock users
- Add deadline
- Change status (not_started, in_progress, completed)
- Drag and drop between columns
- Reorder tasks inside same column

## Tech Used

- React (Hooks + Context)
- Tailwind CSS
- react-beautiful-dnd
- Framer Motion (small hover animation)

## Project Structure

- src/components/TaskCard.jsx
- src/components/Column.jsx
- src/components/Board.jsx
- src/context/TaskContext.jsx
- src/data/dummyData.js
- src/App.jsx

## Run Steps

1. Install packages

   npm install

2. Start dev server

   npm run dev

3. Open in browser

Use the localhost URL shown in terminal.

## Notes

- No backend used
- Data is in local state/dummy data only
- Code is kept simple and beginner-friendly on purpose
