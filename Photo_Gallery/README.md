# Photo Gallery

A simple photo gallery web application built with React and Vite. It fetches photos from the Picsum Photos API and automatically loads more photos as you scroll down.

## Project Description

This project displays photos in a vertical single-column feed. Key features include:
- Automatic fetching of photos on page load.
- Infinite scrolling: loads the next set of photos smoothly as you scroll down.
- Individual like button with a thumbs-up icon for each photo.
- Displays photographer credit and keeps image proportions intact.
- Error handling with a retry button if network requests fail.

## How to Run

1. Open your terminal and navigate to the project directory:
```bash
cd Photo_Gallery
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
Photo_Gallery/
├── public/              # Static assets
├── src/
│   ├── components/      # UI components (PhotoCard, PhotoList, Header, Loader, Error)
│   ├── hooks/           # Custom hook for infinite scrolling (IntersectionObserver)
│   ├── services/        # API service to fetch photos from Picsum
│   ├── App.jsx          # Main application component and state
│   ├── index.css        # Stylesheet
│   └── main.jsx         # React application entry point
├── index.html           # HTML entry file
├── package.json         # Project dependencies and npm scripts
└── vite.config.js       # Vite build configuration
```
