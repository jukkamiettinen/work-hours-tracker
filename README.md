# Work Hours Tracker

A simple web application for tracking work hours on a weekly basis. Built with React, TypeScript, and Firebase.

## Features

- Weekly view of work hours (Monday to Sunday)
- Easy navigation between weeks
- Copy previous week's hours functionality
- Cloud storage with Firebase
- Finnish date format and locale
- 24-hour time format

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
4. Copy the Firebase configuration from your project settings
5. Create a `.env` file in the root directory and add your Firebase configuration:
   ```bash
   cp .env.example .env
   ```
6. Fill in the Firebase configuration values in the `.env` file

## Development

To start the development server:

```bash
npm run dev
```

## Building for Production

To build the application for production:

```bash
npm run build
```

## Firebase Setup

1. Create a new Firebase project
2. Enable Firestore Database
3. Set up Firestore security rules (basic rules are included in `firestore.rules`)
4. Get your Firebase configuration from Project Settings
5. Add the configuration to your `.env` file

## Usage

1. Navigate to the application in your browser
2. Use the "Previous Week" and "Next Week" buttons to navigate between weeks
3. Enter work hours for each day
4. Use the "Copy Previous Week" button to copy hours from the previous week
5. Hours are automatically saved to Firebase

## License

MIT
