# Photo Gallery with Infinite Scrolling

A modern, responsive, single-page Photo Gallery application built with React.js, Vite, and Font Awesome, integrating the Picsum Photos REST API with automatic infinite scrolling and independent like tracking.

---

## 🌟 Key Features

- **Initial Automated API Fetching**: Automatically fetches Page 1 (`https://picsum.photos/v2/list?page=1`) upon loading and populates the gallery.
- **Vertical Single-Column Layout**: Strictly adheres to a clean, centered single-column layout as specified in the assignment requirements.
- **Automatic Infinite Scrolling (`IntersectionObserver`)**:
  - Automatically loads the next page when the user scrolls near the bottom of the feed using an invisible sentinel element.
  - No manual "Load More" button required.
  - IntersectionObserver lifecycle is cleanly managed and disconnected on unmount.
  - Prevents race conditions and duplicate API requests during rapid scrolling with concurrency guards (`useRef`).
- **Individual Like Functionality**:
  - Every photo has an independent like button with a blue Font Awesome thumbs-up icon (`faThumbsUp`).
  - Likes are initialized to zero.
  - Clicking a photo's like button increments only that photo's count without mutating or re-rendering unrelated cards.
  - Uses immutable React state updates.
- **Image Aspect Ratio & Performance Optimization**:
  - Calculates proportional dimensions based on the API's `download_url` to prevent pulling excessively heavy original files (e.g. 5000px raw photos) while preserving the photo's original aspect ratio.
  - Skeleton shimmer placeholder while images load asynchronously (`loading="lazy"`).
- **Resilient Error Handling & Retry Mechanism**:
  - Displays meaningful error banners if an API request fails.
  - Includes a "Try Again" retry button.
  - Retains all previously loaded photos even if a subsequent page request fails.
  - Automatically detects empty responses from the API and halts further pagination.
- **CORS Handling**:
  - Direct browser fetch to Picsum Photos API.
  - Configured Vite development server proxy (`/api/picsum`) as a fallback in case of strict network environments or local CORS restrictions.

---

## 🛠️ Technology Stack

- **Framework**: React 18 (Functional Components & Hooks)
- **Build Tool**: Vite 6
- **Language**: JavaScript (ES6+)
- **Icons**: Font Awesome (`@fortawesome/react-fontawesome`, `@fortawesome/free-solid-svg-icons`)
- **Styling**: CSS3 (Custom properties, flexbox, shimmer keyframe animations, mobile-first responsive design)
- **APIs**: Picsum Photos REST API, DOM `IntersectionObserver`, Fetch API

---

## 📁 Project Structure

```text
Photo_Gallery/
├── public/
├── src/
│   ├── components/
│   │   ├── EmptyState.jsx          # End-of-gallery and empty collection states
│   │   ├── ErrorMessage.jsx        # Error notification with Retry action
│   │   ├── GalleryHeader.jsx       # Sticky header with title and photo count badge
│   │   ├── LoadingIndicator.jsx    # Animated spinner for initial load & pagination
│   │   ├── PhotoCard.jsx           # Individual card: image, author, like button
│   │   └── PhotoList.jsx           # Vertical column and sentinel element
│   ├── hooks/
│   │   └── useInfiniteScroll.js    # Reusable hook wrapping IntersectionObserver
│   ├── services/
│   │   └── photoService.js         # API integration, fallback proxy & URL optimization
│   ├── App.jsx                     # Top-level state (photos, pagination, likes, errors)
│   ├── index.css                   # Custom modern styles, animations, responsive rules
│   └── main.jsx                    # React root entry point
├── index.html                      # HTML document with Google Font preconnect
├── package.json                    # Project configuration and dependencies
├── vite.config.js                  # Vite configuration with proxy definition
└── README.md                       # Documentation
```

---

## 🚀 Setup & Execution Instructions

### Prerequisites
- Node.js (v18.0.0 or higher recommended; verified on Node v22)
- npm (v9.0.0 or higher)

### 1. Navigate to the Project Directory
```powershell
cd D:\Downloads\Excatspace\Photo_Gallery
```

### 2. Install Dependencies
```powershell
npm install
```

### 3. Start the Development Server
```powershell
npm run dev
```

The application will launch locally at:
👉 **`http://localhost:5173`**

### 4. Build for Production
```powershell
npm run build
```

### 5. Preview Production Build
```powershell
npm run preview
```

### 6. Run Automated Verification Tests
```powershell
npm test
```

---

## 🔍 Verification Checklist

| Requirement | Status | Verification Detail |
|---|---|---|
| Initial Page 1 fetch | ✅ Verified | Automatically triggers on mount via `useEffect` |
| Image display & aspect ratio | ✅ Verified | Preserves proportional height & uses skeleton loaders |
| Photographer author display | ✅ Verified | Displayed with high contrast label in each card |
| Independent like count | ✅ Verified | Starts at 0; clicking updates only the targeted photo |
| Font Awesome thumbs-up icon | ✅ Verified | Uses `faThumbsUp` with `#2563eb` blue color |
| Infinite scroll detection | ✅ Verified | `IntersectionObserver` detects sentinel & loads next page |
| Append without replacing | ✅ Verified | Preserves prior photos using `[...prev, ...uniqueNew]` |
| Concurrency & rapid scrolling guard | ✅ Verified | `isRequestInProgressRef` prevents duplicate requests |
| Error handling & retry | ✅ Verified | "Try Again" retries current page without losing loaded photos |
| End of list detection | ✅ Verified | Halts pagination if response is empty or under page size |
| Single-column vertical layout | ✅ Verified | Responsive column (max-width: 640px) on mobile/desktop |
