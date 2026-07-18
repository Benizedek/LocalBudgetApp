# LocalBudgetApp
*A Universal, Cross-Platform Financial Ledger built with React Native, Expo, and Supabase.*

LocalBudgetApp is a modern, high-performance financial tracking application designed for seamless operation across web, iOS, and Android. It provides users with a comprehensive workspace to monitor their income, expenses, and net margin, complete with data visualization and robust filtering capabilities.

## 🚀 Tech Stack

| Technology | Description |
| :--- | :--- |
| **React Native** | Core framework for building native cross-platform interfaces |
| **Expo SDK 54** | Toolchain and universal runtime for React Native |
| **TypeScript** | Strict typing for robust, maintainable architecture |
| **Supabase** | Open-source Firebase alternative (PostgreSQL & Authentication) |
| **React Navigation** | Smooth, native-feeling tab and stack navigation |
| **React Native Picker** | Cross-platform dropdown selections |

## 🏗 Key Architectural Highlights

### Universal UI/UX
The application is built on a single, unified TypeScript codebase that adapts dynamically to the user's environment. Through careful use of safe area handling, responsive layout padding, and native pickers, the interface feels equally at home on a mobile phone touchscreen and a wide desktop web browser.

### Cloud Synchronization & Relational Data
LocalBudgetApp leverages a powerful PostgreSQL backend hosted on Supabase. The relational database schema elegantly connects authenticated users to their specific financial transactions, ensuring that data is synced instantly across all devices.

### Enterprise-Grade Security
Security is treated as a first-class citizen:
*   **JSON Web Token (JWT) Session Gating:** The application root enforces strict session gating, automatically directing unauthenticated users to a secure login/signup flow.
*   **Row Level Security (RLS):** Supabase PostgreSQL policies guarantee strict multi-tenant data isolation. Each user can only ever access or modify their own transaction records based on their authenticated `user_id`.
*   **Secure Environment Variables:** All external credentials are compartmentalized and excluded from version control, adhering to security best practices.

## 🛠 Local Setup Instructions

Follow these steps to run LocalBudgetApp on your local machine.

### Prerequisites
*   Node.js (v22 or newer recommended)
*   Supabase project (for database and authentication)

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/LocalBudgetApp.git
cd LocalBudgetApp
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a local `.env` file in the root directory. You can use `.env.example` as a template:

```bash
cp .env.example .env
```
Open `.env` and paste your actual Supabase credentials:
```env
EXPO_PUBLIC_SUPABASE_URL=https://your-project-url.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 4. Database Setup (Supabase)
Ensure your Supabase project has a `transactions` table with the following schema:
*   `id` (uuid, primary key)
*   `user_id` (uuid, references `auth.users`)
*   `description` (text)
*   `category` (text)
*   `amount` (numeric)
*   `date` (date)
*   `created_at` (timestamptz)

Enable Row Level Security (RLS) on the `transactions` table so users can only access their own data.

### 5. Launch the Universal Server
Start the Expo development server:
```bash
npx expo start
```
From here, you can open the app in a web browser, on an Android emulator, or an iOS simulator, or run it directly on your physical device using the Expo Go app.
