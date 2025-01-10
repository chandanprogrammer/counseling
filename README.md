# GGV Counseling Website

## Overview
The **GGV Counseling Website** is a React-based web application designed to facilitate the counseling process at Guru Ghasidas Vishwavidyalaya (GGV). This platform aims to provide students with a seamless and efficient interface for managing their counseling-related activities.

## Features
- **User Authentication**: Secure login and registration for students and administrators.
- **Counseling Schedule**: View and manage counseling dates and sessions.
- **Student Dashboard**: Personalized dashboard for students to track their counseling progress.
- **Admin Panel**: Tools for administrators to manage students, schedules, and results.
- **Responsive Design**: Fully responsive UI for mobile, tablet, and desktop.

## Technologies Used
- **Frontend**: React.js, HTML, CSS
- **State Management**: React Context API / Redux 
- **Styling**: Pure CSS
- **Backend**: Node.js with Express for send Mail using nodemailer
- **Database**: Excel Sheet (App script)
- **Version Control**: Git and GitHub

## Installation

### Prerequisites
Ensure you have the following installed:
- Node.js
- npm
- Git

### Steps to Run Locally
1. Clone the repository:
   ```bash
   git clone https://github.com/chandanprogrammer/ggv-counseling.git
   ```
2. Navigate to the project directory:
   ```bash
   cd ggv-counseling
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

## Folder Structure
```plaintext
GGV-Counseling-Website/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Header.js
│   │   ├── Footer.js
│   │   └── Dashboard/
│   ├── pages/
│   │   ├── Login.js
│   │   ├── Register.js
│   │   ├── Schedule.js
│   │   └── AdminPanel.js
│   ├── App.js
│   ├── index.js
│   └── styles/
│       ├── App.css
│       └── index.css
├── package.json
└── README.md
```

## Scripts
- `npm run dev`: Start the development server.
- `npm run build`: Create a production build of the application.

## Acknowledgments
- Guru Ghasidas Vishwavidyalaya (GGV)
- React.js Documentation
- Open-source contributors

---

Happy coding! 🚀
