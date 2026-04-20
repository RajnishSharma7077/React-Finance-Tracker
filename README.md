# React Finance App

A modern personal finance tracker built with React, Vite, Tailwind CSS and Recharts.
This project helps manage income, expenses, budgets, and analytics in a responsive web app.

## Key Features

- Add, edit, and delete income / expense transactions.
- Search and filter transactions in real time.
- Set and track budgets with visual progress bars.
- View analytics with pie, line, and bar charts.
- Persist data locally using browser localStorage.
- Responsive layout for desktop and mobile devices.
- Smooth animations and notifications for better UX.
- Multi-currency support with currency conversion.
- Form validation using React Hook Form and Yup.

## Project Structure

- `src/App.jsx` - Main router and layout.
- `src/main.jsx` - App entry file.
- `src/components/Navigation.jsx` - Page navigation and currency selector.
- `src/components/TransactionCard.jsx` - Transaction display cards.
- `src/components/TransactionForm.jsx` - Add/edit transaction form.
- `src/components/SearchBar.jsx` - Search input and debounced query.
- `src/components/Filters.jsx` - Filter controls for type, category, and date.
- `src/components/BudgetCard.jsx` - Budget overview card and progress.
- `src/components/Charts.jsx` - Charts for spending and income trends.
- `src/pages/Dashboard.jsx` - Main dashboard overview page.
- `src/pages/Transactions.jsx` - Transactions list and management page.
- `src/pages/Budget.jsx` - Budget tracking page.
- `src/pages/Analytics.jsx` - Detailed spending analytics page.
- `src/pages/About.jsx` - About page with app description.
- `src/context/FinanceContext.jsx` - Global state and transaction actions.
- `src/hooks/useTransactions.js` - Transaction CRUD and storage logic.
- `src/hooks/useBudget.js` - Budget calculations and update helpers.
- `src/hooks/useCurrency.js` - Currency formatting and external rates.
- `src/hooks/useDebounce.js` - Debounce utility for search input.
- `src/services/api.js` - External exchange-rate API service.
- `src/utils/currencyFormatter.js` - Formatting helper for amounts and symbols.

## Technology Stack

- React 19
- Vite 4
- Tailwind CSS 4
- React Router DOM 7
- React Hook Form
- Yup validation
- Axios HTTP client
- Recharts for data visualization
- Framer Motion for animation
- React Toastify for notifications
- date-fns for dates
- uuid for unique transaction IDs

## Installation

1. Clone the repository
2. Install dependencies
3. Start the development server

```bash
git clone https://github.com/RajnishSharma7077/React-end-term-project.git
cd React-end-term-project
npm install
npm run dev
```

## Usage

- Open the app at `http://localhost:5173`
- Add a transaction with title, amount, category, and notes
- Choose income or expense
- Use the dashboard to review totals and trends
- Search and filter transactions to find specific entries
- Set a budget and watch progress change over time
- Switch currencies to view amounts in different formats

## Data Persistence

- All transactions are stored in the browser using localStorage.
- Refreshing the page keeps saved transactions intact.
- No external database or backend is required for main app data.
- Exchange rate lookup uses `https://api.exchangerate-api.com/v4/latest`

## Pages and Flow

- `Dashboard` shows summary statistics and charts.
- `Transactions` lists all entries and allows editing.
- `Budget` focuses on budget goals and alerts.
- `Analytics` provides spending and income breakdowns.
- `About` describes the app and how to use it.

## Custom Hooks

- `useTransactions` manages transaction state and localStorage.
- `useBudget` calculates budget remaining and alerts.
- `useCurrency` fetches exchange rates and formats values.
- `useDebounce` optimizes search input performance.
