# ReactJS Chat Application

A modern, responsive, functional team chat application built with **React.js**, **Vite**, **HTML5**, and **CSS3**, matching the reference team chat interface with dynamic user management.

---

## 🚀 Features

### 1. Message Input & Submission
- **Message Input Field**: Capsule-style input matching the reference design with placeholder `"Type Message"`.
- **Enter Key Submission**: Send messages with the `Enter` key or by clicking the Send button.
- **Whitespace / Empty Validation**: Disallows empty or whitespace-only messages. Send button automatically disables when no valid characters are typed.
- **Auto-Clear & Refocus**: Automatically clears the input field upon sending and restores focus to keep conversations flowing smoothly.
- **Quick Reactions**: Built-in emoji reactions bar (`👋`, `👏`, `⬇️`, `😊`, `❤️`, `🔥`, `🎉`, `🚀`).

### 2. Dynamic User Management & Random Assignment
- **Dynamic Team Pool**: Users are managed in reactive state starting with the default team:
  ```javascript
  ["Alan", "Bob", "Carol", "Dean", "Elin"]
  ```
- **Add Users on the Fly**: Click the **"+ Add"** button in the sidebar under **Team Members** to dynamically add any new member (e.g., `"Sarah Connor"`, `"John"`).
- **Validation**: Automatically validates against empty submissions and duplicate user names (case-insensitive).
- **Auto-Generated Meta**: Every added user receives deterministic initials and a vibrant color from our avatar palette.
- **Dynamic Random Selection**: Every sent message independently and randomly selects from all current active users (including newly added members).
- **Live Counter**: The header counter (e.g. `5 | 100`) dynamically updates as new members join.

### 3. Chat Thread & Message Display
- **Persistent Messages**: New messages append dynamically without clearing or modifying existing messages.
- **Speech Bubble Cards**: Pure white rounded bubbles with subtle drop shadow matching the corporate chat layout.
- **Auto-Scrolling**: Automatically scrolls smoothly to the latest message whenever a new message is posted.

### 4. Independent Like Functionality
- Every message maintains its own independent like button and counter.
- Default like count starts at `0`.
- Clicking a message's like button increments only that message's count by `+1` using immutable React state updates.
- Liking one message never modifies or resets other messages.

---

## 🛠️ Technology Stack

- **React 19**
- **Vite**
- **JavaScript (ES6+)**
- **HTML5 & CSS3**

---

## ⚡ Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Run Automated Tests
```bash
npm test
```

### 4. Run Linter
```bash
npm run lint
```

### 5. Build for Production
```bash
npm run build
```
