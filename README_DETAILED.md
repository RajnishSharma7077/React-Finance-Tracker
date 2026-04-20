# Personal Finance & Expense Analytics App

A full-featured Personal Finance & Expense Analytics application built with React, Tailwind CSS, and modern JavaScript libraries. This app helps users track their income and expenses, maintain budgets, and analyze their spending patterns.

## 🚀 Features

### Core Features
- **Transaction Management**
  - Add, edit, and delete income and expense transactions
  - Categorize transactions (Food, Travel, Rent, Shopping, Entertainment, Health, Utilities, Subscriptions)
  - Mark transactions as recurring
  - Add notes to transactions
  - Real-time form validation with react-hook-form and yup

- **Search & Filter**
  - Search transactions by title or notes
  - Filter by category, transaction type, and date range
  - Multiple sorting options (date, amount, category)
  - Debounced search for optimal performance

- **Budget Tracking**
  - Set monthly budgets
  - Real-time budget status monitoring
  - Percentage-based progress visualization
  - Warnings when exceeding budget limits

- **Analytics Dashboard**
  - Interactive charts using Recharts:
    - Pie chart for spending by category
    - Line chart for monthly spending trends
    - Bar chart for income vs expense comparison
  - Top spending categories
  - Quick financial insights
  - Multiple time range views (month, quarter, all-time)

- **Data Visualization**
  - Beautiful, responsive charts and graphs
  - Real-time analytics updates
  - Visual budget tracking
  - Interactive UI with Framer Motion animations

- **Currency Management**
  - Support for multiple currencies (INR, USD, EUR, GBP)
  - Currency conversion using ExchangeRate API
  - Formatted currency display throughout the app

- **Data Persistence**
  - All data stored in browser's localStorage
  - Automatic backup of transactions and budget
  - No server required

## 🛠️ Tech Stack

### Frontend Framework
- **React 19** - UI library with hooks
- **React Router DOM** - Client-side routing
- **Vite** - Lightning-fast build tool

### Styling
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions

### Form & Validation
- **React Hook Form** - Efficient form handling
- **Yup** - Schema validation library

### Charts & Visualization
- **Recharts** - React charts library
- **React Icons** - Icon library

### State Management
- **Context API** - Global state management
- **localStorage** - Client-side data persistence

### API Integration
- **Axios** - HTTP client for API requests
- **ExchangeRate API** - Currency conversion
- **NewsAPI** - Financial news feed (optional)

### Utilities
- **date-fns** - Date manipulation and formatting
- **uuid** - Unique ID generation
- **React Toastify** - Toast notifications

## 📁 Project Structure

```
src/
├── components/          # Reusable React components
│   ├── TransactionCard.jsx
│   ├── TransactionForm.jsx
│   ├── SearchBar.jsx
│   ├── Filters.jsx
│   ├── BudgetCard.jsx
│   ├── Charts.jsx
│   └── Navigation.jsx
├── pages/              # Page components
│   ├── Dashboard.jsx
│   ├── Transactions.jsx
│   ├── Budget.jsx
│   └── Analytics.jsx
├── context/            # Context API
│   └── FinanceContext.jsx
├── hooks/              # Custom React hooks
│   ├── useTransactions.js
│   ├── useBudget.js
│   ├── useCurrency.js
│   └── useDebounce.js
├── services/           # API services
│   └── api.js
├── utils/              # Utility functions
│   └── currencyFormatter.js
├── App.jsx             # Main app component
└── main.jsx            # Entry point
```

## 🚀 Getting Started

### Prerequisites
- Node.js v16+ and npm v8+

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the development server**
   ```bash
   npm run dev
   ```

3. **Open in browser**
   - Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The app will be built in the `dist/` directory.

## 📖 Usage Guide

### Dashboard
- **Overview of your finances** with key metrics
- **Budget status** with visual progress
- **Spending by category** pie chart
- **Income vs Expenses** bar chart
- **Recent transactions** quick view
- **Top spending categories** insights

### Transactions
- **Add new transactions** with detailed information
- **Edit existing transactions** with modal form
- **Delete transactions** with one-click removal
- **Search** transactions in real-time
- **Filter** by category, type, or date range
- **Sort** by date, amount, or category

### Budget
- **Set monthly budget** with easy adjustment
- **Track spending** against budget
- **View budget breakdown** with percentages
- **Get budget tips** for better financial management

### Analytics
- **Comprehensive financial insights** with multiple views
- **Spending trends** over time with line charts
- **Category-wise breakdown** with pie charts
- **Income vs Expense comparison** with bar charts
- **Filter by time range** (month, quarter, all-time)

## 🔄 Key Concepts Implemented

### React Hooks
- **useState** - Managing component state
- **useContext** - Accessing global state
- **useEffect** - Side effects and data fetching
- **useCallback** - Memoized function callbacks
- **useMemo** - Memoized computations
- **useReducer** - Complex state logic

### Context API
- Global finance state management
- Transaction CRUD operations
- Budget management
- Currency settings
- Derived calculations (income, expenses, trends)

### Custom Hooks
- `useTransactions()` - Transaction operations
- `useBudget()` - Budget calculations
- `useCurrency()` - Currency formatting and conversion
- `useDebounce()` - Optimized search performance

### Form Handling
- `react-hook-form` for efficient form state
- `yup` for validation schema
- Real-time validation feedback
- Conditional field rendering

## 📊 Data Models

### Transaction Object
```javascript
{
  id: string,              // UUID
  title: string,           // Transaction title
  amount: number,          // Amount in base currency
  category: string,        // Expense category
  type: "income" | "expense",
  date: string,            // ISO date string
  notes: string,           // Additional notes
  recurring: boolean,      // Recurring flag
  createdAt: string        // Creation timestamp
}
```

### Budget Object
```javascript
{
  monthlyBudget: number   // Monthly budget limit
}
```

## 🎨 Features Highlight

### Responsive Design
- Mobile-first approach
- Tailwind CSS responsive utilities
- Mobile navigation menu
- Optimized for all screen sizes

### Animations
- Smooth page transitions
- Button hover effects
- Chart animations
- Modal transitions
- Staggered element animations

### User Experience
- Toast notifications for actions
- Loading states
- Empty state messages
- Confirmations for destructive actions
- Intuitive UI/UX design

## 🔐 Data Storage

All data is stored in the browser's localStorage:
- Transactions list
- Monthly budget
- Currency preference

Data persists across browser sessions and is available offline.

## 📡 API Integration

### ExchangeRate API
- Used for currency conversion
- Endpoint: `https://api.exchangerate-api.com/v4/latest/{currency}`
- No API key required for basic usage

### NewsAPI (Optional)
- For financial news feed
- Requires API key
- Not implemented by default

## 🚀 Performance Optimizations

- **Debounced search** - Reduces renders during typing
- **Memoized calculations** - Prevents unnecessary recalculations  
- **React.memo** - Prevents unnecessary component re-renders
- **Code splitting** - Route-based code splitting
- **Lazy loading** - Charts load on demand

## 📱 Browser Support

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests
- Improve documentation

## 📄 License

This project is open source and available under the MIT License.

## 🎯 Future Enhancements

- [ ] Monthly expense reports (PDF export)
- [ ] Bill reminders and notifications
- [ ] Savings goals tracking
- [ ] Investment portfolio tracking
- [ ] Multi-currency support with API
- [ ] Cloud sync with Firebase
- [ ] Mobile app with React Native
- [ ] Advanced analytics with ML predictions
- [ ] Social features (expense splitting)
- [ ] Dark mode theme

## 📞 Support

For questions or issues, please:
1. Check the documentation
2. Review existing discussions
3. Create a new issue with details

## 🎓 Learning Resources

This project demonstrates:
- React best practices
- Custom hooks development
- Context API usage
- Form validation patterns
- CSS-in-utility approach (Tailwind)
- Responsive design
- Modern JavaScript practices
- Component composition
- State management patterns

---

**Made with ❤️ for personal finance management**
