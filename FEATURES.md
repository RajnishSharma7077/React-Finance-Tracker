# Features Guide

## 📊 Dashboard

### Overview Metrics
- **Total Income** - Sum of all income transactions for the current month
- **Total Expenses** - Sum of all expense transactions for the current month
- **Net Balance** - Difference between income and expenses
- **Budget Remaining** - Available budget from your monthly limit

### Visual Components
- **Budget Progress Card**
  - Visual progress bar
  - Budget status (Within budget / Approaching limit / Over budget)
  - Color-coded alerts

- **Spending by Category Chart**
  - Pie chart showing expense distribution
  - Click legend to highlight categories
  - Percentage breakdown

- **Income vs Expenses Chart**
  - Bar chart comparing monthly income vs expenses
  - Visual comparison for quick insights

- **Top Spending Categories**
  - Lists top 3 spending categories
  - Shows amount spent in each

- **Recent Transactions**
  - Last 3 transactions from current month
  - Quick view of latest activity

## 💳 Transactions Page

### Add Transaction
1. Click "Add Transaction" button
2. Select transaction type (Income/Expense)
3. Fill in required fields:
   - Title
   - Amount
   - Category
   - Date
   - Notes (optional)
   - Mark as recurring (optional)
4. Click "Add Transaction"

### Edit Transaction
1. Click edit icon (pencil) on transaction card
2. Modal opens with current values
3. Make changes
4. Click "Update Transaction"

### Delete Transaction
1. Click delete icon (trash) on transaction card
2. Transaction is removed immediately

### Search Transactions
- Type in search box
- Searches by:
  - Transaction title
  - Notes
- Real-time results (debounced)
- Instant filtering

### Filter Transactions
- **By Category**
  - Select from dropdown
  - Shows only transactions of that category

- **By Type**
  - Income
  - Expense

- **By Date Range**
  - From Date: Start of range
  - To Date: End of range

- **Reset Filters** - Clear all filters at once

### Sort Transactions
- **Date (Newest)** - Most recent first
- **Amount (Highest)** - Highest amounts first
- **Category** - Alphabetical by category

## 💰 Budget Page

### Budget Management
- **Set Monthly Budget**
  - Click "Edit Budget" button
  - Enter budget amount
  - Save changes

- **Budget Breakdown**
  - Total Budget - Your monthly allocation
  - Amount Spent - Current month expenses
  - Remaining Budget - Available to spend
  - Percentage Used - Visual progress

### Budget Tracking
- Visual progress bar shows spending %
- Color indicates status:
  - Green: < 75% used
  - Yellow: 75-100% used
  - Red: Over budget

### Budget Tips
1. **Review Regularly** - Check weekly for patterns
2. **Track Categories** - Monitor where money goes
3. **Set Realistic Goals** - Start with actual patterns
4. **Avoid Overspending** - Use 50/30/20 rule

### Status Indicators
- ✅ Within Budget
- ⚠️ Approaching Limit (75%+)
- 💔 Over Budget

## 📈 Analytics Page

### Time Range Filters
- **This Month** - Current calendar month
- **Last 3 Months** - 90-day view
- **All Time** - All transactions

### Key Metrics
- **Total Income** - Sum by time range
- **Total Expenses** - Sum by time range
- **Net Savings** - Income minus expenses
- **Savings Rate** - Percentage saved
- **Avg. Transaction** - Average transaction amount

### Chart Analysis

#### Spending by Category (Pie Chart)
- Visual distribution of expenses
- Category percentages
- Top 5 categories highlighted

#### Monthly Spending Trend (Line Chart)
- Income and expense lines over time
- Shows spending patterns
- Helps identify trends

#### Income vs Expense (Bar Chart)
- Comparison chart
- Shows income vs expense side by side
- Quick visual comparison

### Quick Insights
- **Highest Spending Category** - Where you spend the most
- **Most Frequent Category** - Most used expense category
- **Expense to Income Ratio** - Percentage of income spent

## 🔄 Recurring Expenses

### Mark as Recurring
- Check "Mark as recurring" when adding/editing
- Highlighted with "Recurring" badge on card
- Visual indicator in transaction list

### Recurring Examples
- Netflix subscription
- Rent payment
- Gym membership
- Insurance

## 🌐 Currency Features

### Select Currency
1. Use dropdown in header navigation
2. Choose from: INR, USD, EUR, GBP
3. All amounts update instantly

### Currency Conversion
- ExchangeRate API integration
- Convert any amount between currencies
- Real-time exchange rates

### Display Format
- Amounts shown with currency symbol
- Formatted with commas and decimals
- Locale-specific formatting

## 📱 Mobile Features

### Responsive Design
- Works on all screen sizes
- Touch-friendly buttons
- Collapsible navigation menu
- Mobile-optimized charts

### Mobile Navigation
- Hamburger menu on small screens
- Easy access to all pages
- Currency selector visible
- Sticky header

## 🔔 Notifications

### Toast Messages
- Transaction added/updated/deleted
- Budget changes confirmed
- Form validation feedback
- Error messages

### Toast Features
- Auto-dismiss after 3 seconds
- Manual close button
- Bottom-right corner positioning
- Non-intrusive design

## 💾 Data Management

### Local Storage
- Automatic saving
- Transactions stored
- Budget preferences saved
- Currency choice remembered

### Data Backup
- No cloud sync (local only)
- Data in browser localStorage
- Clear device cache to reset
- Export data (manual copy-paste)

## 🎨 UI/UX Features

### Animations
- Page transitions
- Button hover effects
- Chart animations
- Modal slides
- Staggered element animations

### Accessibility
- Clear labels
- Focus states
- Alt text for icons
- Keyboard navigation
- Semantic HTML

### Visual Hierarchy
- Color-coded transactions
- Priority indicators
- Clear typography
- Proper spacing
- Responsive layouts

## 🔐 Data Security

### Privacy
- All data stored locally
- No server uploading
- No login required
- No tracking

### Data Types Collected
- Transactions (personal)
- Budget settings (personal)
- Currency preference (session)

## ⚡ Performance Features

### Optimizations
- Debounced search
- Memoized calculations
- Lazy loading
- Optimized re-renders

### Loading States
- Chart loading placeholders
- Smooth transitions
- No janky animations

## 🎯 Common Use Cases

### Track Monthly Spending
1. Add daily transactions
2. View dashboard for overview
3. Check analytics for patterns
4. Adjust budget if needed

### Find Spending Leaks
1. Go to Analytics
2. View "Spending by Category"
3. Identify high categories
4. Review recent transactions

### Monitor Budget
1. Set budget in Budget page
2. Dashboard shows remaining
3. Color indicator shows status
4. Add transactions to update

### Analyze Trends
1. Filter by category
2. View analytics for time range
3. See monthly trend chart
4. Compare income vs expenses

---

**Every feature is designed to help you take control of your finances!**
