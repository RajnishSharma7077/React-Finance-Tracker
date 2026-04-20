# 🚀 Getting Started - Quick Guide

## ⚡ 2-Minute Quick Start

### Step 1: Open Terminal
```bash
cd /Users/rajnish_sharma/Desktop/react-finance-app
```

### Step 2: Start the App
```bash
npm run dev
```

### Step 3: Open Browser
- Automatically opens at http://localhost:5173
- Or manually open that URL

### That's it! 🎉

---

## 📖 First Time Setup (5 Minutes)

### Prerequisites ✓
- Node.js v16+ installed (with npm)
- All dependencies already installed

### Run the App
```bash
npm run dev
```

**Expected Output:**
```
  VITE v8.0.3  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### Access the App
- Click the Local URL: http://localhost:5173/
- App opens in your browser automatically

---

## 🗂️ Project Location

```
/Users/rajnish_sharma/Desktop/react-finance-app
```

### What's Inside
```
├── src/              # Source code
├── public/           # Static files
├── package.json      # Dependencies
├── vite.config.js    # Vite config
└── tailwind.config.js  # Tailwind config
```

---

## 🎯 Using the App

### First Steps
1. **Dashboard** - See financial overview (default page)
2. **Add Transaction** - Click "Add Transaction" button
3. **View Transactions** - Navigate to Transactions page
4. **Set Budget** - Go to Budget page to set limit
5. **Analytics** - Check Analytics for insights

### Main Pages
- 📊 **Dashboard** - Overview & charts
- 📝 **Transactions** - All transactions
- 💰 **Budget** - Budget management
- 📈 **Analytics** - Detailed analysis

---

## ✨ Key Features to Try

### Add a Transaction
1. Click "Add Transaction" button
2. Fill in fields:
   - **Title**: "Lunch"
   - **Amount**: 500
   - **Category**: "Food"
   - **Date**: Today
3. Click "Add Transaction"

### Search & Filter
1. Go to Transactions page
2. Type in search box
3. Use filters on the left
4. Sort by date/amount/category

### Set Budget
1. Go to Budget page
2. Click "Edit Budget"
3. Enter amount (e.g., 50000)
4. Click "Save"

### View Analytics
1. Go to Analytics page
2. See charts and insights
3. Change time range
4. Analyze spending patterns

---

## 🛠️ Common Commands

### Development
```bash
# Start development server
npm run dev

# View app at http://localhost:5173
```

### Production
```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

### Maintenance
```bash
# Check code quality
npm run lint

# Install dependencies
npm install
```

---

## 💾 Your Data

### Where is Data Stored?
- **Stored in**: Browser's localStorage
- **Location**: DevTools → Application → Storage → Local Storage
- **Persists**: Even after closing browser
- **Clears**: Only when you clear browser cache

### Backup Your Data
```bash
# DevTools → Application → Local Storage
# Right-click → Copy data
# Save in text editor
```

---

## 🌐 Features

### ✓ Transaction Management
- Add income/expense
- Edit transactions
- Delete transactions
- Add notes & categories
- Mark as recurring

### ✓ Search & Filter
- Real-time search
- Filter by category/type/date
- Multiple sorting options

### ✓ Budget Tracking
- Set monthly budget
- Track remaining
- Visual progress bar
- Budget alerts

### ✓ Analytics
- Spending charts
- Monthly trends
- Category breakdown
- Financial insights

### ✓ Multi-Currency
- INR, USD, EUR, GBP
- Currency conversion
- Real exchange rates

---

## 📱 Mobile Use

### On Your Phone
1. Get your computer's IP: `ipconfig getifaddr en0`
2. On phone, open: `http://YOUR_IP:5173`
3. App works perfectly on mobile!

### Mobile Features
- Responsive design
- Touch-friendly buttons
- Collapsing navigation
- Optimized charts

---

## 🎨 Customization

### Change Default Budget
Edit `src/context/FinanceContext.jsx` line ~12:
```javascript
monthlyBudget: 50000  // Change this number
```

### Add New Categories
Edit `src/components/TransactionForm.jsx` line ~6:
```javascript
const EXPENSE_CATEGORIES = [
  'Food',
  'Travel',
  // Add more here
];
```

### Change Colors
Edit `tailwind.config.js` theme section

---

## 🐛 Quick Troubleshooting

### App Won't Start
```bash
npm install          # Install dependencies
npm run dev         # Try again
```

### Port Already in Use
```bash
# Vite will use next available port automatically
npm run dev
```

### Data Disappeared
- Check DevTools → Application → Local Storage
- Verify it wasn't cleared
- Clear browser cache and refresh

### Other Issues?
- Check FAQ_TROUBLESHOOTING.md
- See SETUP_INSTRUCTIONS.md

---

## 📚 Documentation Files

- **PROJECT_SUMMARY.md** - Complete project overview
- **README_DETAILED.md** - Comprehensive documentation
- **SETUP_INSTRUCTIONS.md** - Detailed setup guide
- **FEATURES.md** - All features explained
- **FAQ_TROUBLESHOOTING.md** - Problems & solutions

---

## 🎓 Learning Path

1. **Day 1** - Explore and use the app
2. **Day 2** - Try all features
3. **Day 3** - Analyze your spending
4. **Day 4** - Read documentation
5. **Day 5** - Customize as needed

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| F12 | Open DevTools |
| Ctrl+Shift+Delete | Clear cache |
| Ctrl+L | Focus address bar |
| Ctrl+R | Refresh page |

---

## 🎯 Next Steps

### Immediately
1. Run: `npm run dev`
2. Open: http://localhost:5173
3. Click around and explore

### Soon
1. Add 5-10 transactions
2. Try filtering
3. Check analytics
4. Set a budget

### Later
1. Read FEATURES.md
2. Try customizing
3. Test on mobile
4. Explore the code

---

## ❓ Quick FAQ

**Q: Do I need internet?**
A: No, works completely offline (except currency conversion).

**Q: Is my data safe?**
A: Yes, stored only on your device. No server involved.

**Q: Can I export data?**
A: Check localStorage in DevTools, copy manually.

**Q: How many transactions?**
A: Supports 1000+ easily. Works great with 5000+.

**Q: Can I use multiple devices?**
A: No, each device has its own localStorage.

---

## 📞 Need Help?

1. **Check Documentation** - Multiple guides available
2. **Browser Console** - F12 → Console for errors
3. **DevTools** - Inspect state and localStorage
4. **FAQ_TROUBLESHOOTING.md** - Common issues

---

## 🎉 Ready to Go!

You have everything you need. Just run:

```bash
npm run dev
```

And start managing your finances! 💰📊

---

**Created with ❤️ for personal finance management**

**Questions? Check the documentation files or try troubleshooting guide!**
