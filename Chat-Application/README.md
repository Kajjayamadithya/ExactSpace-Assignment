# Chat Application

A simple team chat application built with React and Vite. It allows team members to send messages, dynamically add new members, react with emojis, and like individual messages.

## Project Description

This project provides a clean chat interface where users can:
- Type and send messages using the input bar or pressing Enter.
- Randomly assign messages to active team members.
- Add new team members dynamically to the chat.
- Like individual messages independently.
- Scroll through conversation history smoothly.

## How to Run

1. Open your terminal and navigate to the project directory:
```bash
cd Chat-Application
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open the URL shown in your terminal (usually `http://localhost:5173`) in your browser.

### Other Commands

- **Build for production:**
```bash
npm run build
```

- **Preview production build:**
```bash
npm run preview
```

## Folder Structure

```text
Chat-Application/
├── public/              # Static assets and icons
├── src/
│   ├── assets/          # Images and SVG icons
│   ├── components/      # UI components (Header, Input, MessageItem, List, Sidebar)
│   ├── App.jsx          # Main application component and state
│   ├── constants.js     # Default team members and colors
│   ├── index.css        # Stylesheet
│   └── main.jsx         # React application entry point
├── index.html           # HTML entry file
├── package.json         # Project dependencies and npm scripts
└── vite.config.js       # Vite build configuration
```
