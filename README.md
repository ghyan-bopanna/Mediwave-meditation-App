# Mediwave

**Mediwave** is a mindfulness and meditation app designed to help users find peace, feel joy, and embrace life through guided meditations, mood tracking, and personalized recommendations.

## Features

- **User Authentication**: Register and log in using Firebase Authentication.  
- **Onboarding**: Collect user preferences through onboarding questions to provide personalized recommendations.  
- **Home Screen**: Display recommended and mood-based playlists.  
- **Library**: Browse and search the entire library of meditations.  
- **Journal**: Track your mood and write journal entries.  
- **Profile**: View your meditation streaks, completed tracks, and total meditation time.  
- **Music Player**: Play meditation tracks with a built-in music player.  

## Installation

### 1. Clone the repository  
```sh
git clone https://github.com/yourusername/mediwave.git
cd mediwave
```

### 2. Install dependencies  
```sh
npm install
```

### 3. Set up Firebase  
- Create a **Firebase project** and add your app.  
- Copy the Firebase configuration and update the `.env` file with your Firebase credentials.  

### 4. Start the app  
```sh
npx expo start
```

## Environment Variables

Create a `.env` file in the root directory and add your **Firebase configuration**:

```plaintext
EXPO_PUBLIC_apiKey=your_api_key
EXPO_PUBLIC_authDomain=your_auth_domain
EXPO_PUBLIC_projectId=your_project_id
EXPO_PUBLIC_storageBucket=your_storage_bucket
EXPO_PUBLIC_messagingSenderId=your_messaging_sender_id
EXPO_PUBLIC_appId=your_app_id
```

## Project Structure

```
Mediwave/
├── assets/                 # Static assets (images, fonts, etc.)
├── src/                    # Source code
│   ├── components/         # Reusable components
│   ├── context/            # Context providers
│   ├── hooks/              # Custom hooks
│   ├── navigation/         # Navigation stacks
│   ├── screens/            # Screen components
│   ├── utils/              # Utility functions and constants
│   └── App.tsx             # Main app component
├── .env                    # Environment variables
├── app.json                # Expo configuration
├── eas.json                # EAS configuration
├── package.json            # Project dependencies and scripts
└── README.md               # Project documentation
```

## Usage

### Authentication  
- **Register**: Create a new account using email and password.  
- **Login**: Log in to your account using email and password.  
- **Logout**: Log out of your account.  

### Onboarding  
- Answer a series of questions to personalize your meditation experience.  
- Your preferences will be saved and used to recommend playlists.  

### Home Screen  
- **Recommended for You**: View playlists recommended based on your preferences.  
- **Based on Your Mood**: View playlists based on your current mood.  

### Library  
- Browse and search the entire library of meditations.  
- View playlists by category.  

### Journal  
- Track your mood and write journal entries.  
- View your journal history and entries.  

### Profile  
- View your **meditation streaks**, **completed tracks**, and **total meditation time**.  
- Log out of your account.  

### Music Player  
- Play meditation tracks with a built-in **music player**.  
- Control playback (**play, pause, next, previous**).  

## Working (Click on image to see Video !!!)

[![Watch the Demo](https://img.youtube.com/vi/_nIA1YhYPKM/0.jpg)](https://www.youtube.com/watch?v=_nIA1YhYPKM)

