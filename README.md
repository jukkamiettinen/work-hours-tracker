# Work Hours Tracker

A simple and efficient work hours tracking application built with React, TypeScript, and Firebase. Track your daily work hours with a weekly view, perfect for monitoring overtime and maintaining work-life balance.

## Features

- Weekly view with 7-day display
- Previous/Next week navigation
- Copy previous week's hours
- Finnish calendar format (Monday first)
- Cloud storage with Firebase
- Modern UI with Tailwind CSS

## Live Demo

The application is live at: [work-hours-tracker.vercel.app](https://work-hours-tracker.vercel.app)

## Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS
- Firebase (Firestore)
- date-fns
- Vercel for deployment

## Getting Started

1. Clone the repository
```bash
git clone https://github.com/jukkamiettinen/work-hours-tracker.git
cd work-hours-tracker
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file with your Firebase configuration
```
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

4. Run the development server
```bash
npm run dev
```

## License

MIT

## Author

Jukka Miettinen
