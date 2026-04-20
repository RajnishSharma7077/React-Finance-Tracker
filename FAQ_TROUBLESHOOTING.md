# FAQ & Common Issues

## ❓ Frequently Asked Questions

### General

**Q: Do I need a backend/server?**
A: No! This is a completely frontend application. All data is stored in your browser's localStorage.

**Q: Can I use this offline?**
A: Yes! Except for currency conversion feature, everything works offline.

**Q: Is my data safe?**
A: Yes, all data stays on your device. No information is sent to any server.

**Q: Can I export my data?**
A: Currently, you can copy data from browser's Application tab → localStorage. We can add export feature in future.

**Q: What happens if I clear browser cache?**
A: All your data will be deleted. Always backup important data.

---

## 🐛 Common Issues & Solutions

### Issue 1: Port Already in Use
**Problem:** `Error: Port 5173 already in use`

**Solutions:**
```bash
# Vite will automatically use next available port
npm run dev

# Or manually specify a port
npm run dev -- --port 3000
```

### Issue 2: Dependencies Not Installing
**Problem:** `npm install` fails

**Solutions:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and lock file
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Issue 3: ModuleNotFoundError
**Problem:** `Module not found error when running`

**Solutions:**
```bash
# Check if all dependencies are installed
npm list

# Check package.json for missing dependencies
npm install

# Clear Vite cache
rm -rf node_modules/.vite
npm run dev
```

### Issue 4: Localhost Not Accessible
**Problem:** Cannot access http://localhost:5173

**Solutions:**
- Check if development server is running (see "npm run dev" output)
- Try clearing browser cache and refreshing
- Try a different browser
- Check firewall settings

### Issue 5: Data Not Persisting
**Problem:** Transactions disappear after refresh

**Solutions:**
- Check if localStorage is enabled in browser
- Developer Tools → Application → Storage → Local Storage
- Check if "Disable cache" is checked in DevTools (uncheck it)

### Issue 6: Charts Not Displaying
**Problem:** Analytics page shows blank charts

**Solutions:**
- Ensure you have transactions added
- Check browser console for errors (F12)
- Try adding at least 3 transactions in different categories

### Issue 7: Form Validation Issues
**Problem:** Form won't submit or shows unexpected errors

**Solutions:**
- Check form error messages
- Ensure all required fields are filled
- Close browser DevTools console and try again
- Try in a different browser

### Issue 8: Slow Performance
**Problem:** App feels sluggish

**Solutions:**
```bash
# Disable browser extensions
# Clear browser cache
# Close unnecessary tabs
# Restart the development server
npm run dev
```

---

## 🔧 Troubleshooting Tips

### Check Browser Console (F12)
- Press F12 to open DevTools
- Go to Console tab
- Look for error messages in red
- Note any errors and search for solutions

### Check localStorage
- Press F12 → Application tab
- Expand "Storage" → "Local Storage"
- Look for your domain
- Verify transactions are saved

### Clear Everything
```bash
# Stop dev server (Ctrl+C)
# Clear cache
rm -rf node_modules/.vite

# Restart
npm run dev
```

### Check npm Version
```bash
npm --version
# Should be v8 or higher
```

### Check Node Version
```bash
node --version
# Should be v16 or higher
```

---

## ⚙️ Configuration Questions

### How to Change Default Budget?
Edit `src/context/FinanceContext.jsx`:
```javascript
// Line ~12
monthlyBudget: 50000  // Change this number
```

### How to Add New Categories?
Edit `src/components/TransactionForm.jsx`:
```javascript
// Line ~6
const EXPENSE_CATEGORIES = [
  'Food',
  'Travel',
  'Rent',
  'Shopping',         // Add new category here
  'Entertainment',
  'Health',
  'Utilities',
  'Subscriptions',
  'NewCategory',      // Like this
];
```

### How to Change Colors?
Edit `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      // Add custom colors here
    }
  }
}
```

### How to Change Currency Symbol?
Edit `src/utils/currencyFormatter.js`:
```javascript
const currencySymbols = {
  INR: '₹',
  USD: '$',
  EUR: '€',
  GBP: '£',
  // Add more here
};
```

---

## 🏗️ Building & Deployment

### Build Commands
```bash
# Development
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Check code quality
npm run lint
```

### Build Output
```
dist/
├── index.html      # Main HTML file
├── assets/         # CSS and JS bundles
└── ...            # Other assets
```

### Deploy to Vercel
```bash
npm i -g vercel
vercel
# Follow the prompts
```

### Deploy to Netlify
1. Push code to GitHub
2. Go to netlify.com
3. Connect GitHub repository
4. Build command: `npm run build`
5. Publish directory: `dist`

---

## 📱 Mobile & Responsive Issues

### Mobile Not Responsive
- Check if Tailwind is properly configured
- Clear browser cache
- Reload the page
- Test in different browser

### Touch Issues on Mobile
- Buttons should be at least 44x44px
- Try using a different mobile device
- Check browser compatibility

---

## 📊 Data & Performance

### Too Many Transactions Causing Lag
- Current implementation supports ~1000+ transactions smoothly
- For optimal performance, keep under 5000 transactions
- Consider archiving old data if needed

### Charts Not Updating
- Ensure transactions have proper date format
- Check browser console for errors
- Refresh the page

---

## 🔌 API & External Services

### Currency Conversion Not Working
- Check internet connection
- ExchangeRate API might be temporarily down
- The app continues to work without currency conversion

### Financial News Not Loading
- NewsAPI requires API key (not configured yet)
- This is optional and not critical

---

## ✅ Verification Checklist

If the app doesn't work, verify:

- [ ] Node.js is installed (`node --version`)
- [ ] npm is updated (`npm --version`)
- [ ] All dependencies installed (`npm install`)
- [ ] No errors in package.json
- [ ] Tailwind config exists (`tailwind.config.js`)
- [ ] PostCSS config exists (`postcss.config.js`)
- [ ] src/index.css has Tailwind directives
- [ ] Development server starts without errors
- [ ] Browser opens to localhost:5173
- [ ] No red errors in browser console

---

## 🆘 When All Else Fails

### Fresh Install
```bash
# Navigate to project
cd react-finance-app

# Remove everything
rm -rf node_modules package-lock.json dist

# Reinstall
npm install

# Run
npm run dev
```

### Report the Issue
If you encounter an issue:
1. Note the exact error message
2. Check the browser console (F12)
3. Check the terminal output
4. Verify all steps in SETUP_INSTRUCTIONS.md

---

## 📚 Resources

- [React Documentation](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React Router Guide](https://reactrouter.com/start)
- [Vite Guide](https://vite.dev/guide/)
- [npm Documentation](https://docs.npmjs.com/)

---

## 💬 Quick Tips

✓ Use DevTools to check state
✓ Check localStorage to verify data
✓ Look at console errors first
✓ Try a fresh browser tab
✓ Restart the dev server
✓ Check internet connection
✓ Try a different browser

---

**Still stuck? Check:**
1. SETUP_INSTRUCTIONS.md
2. README_DETAILED.md
3. Browser console (F12)
4. Terminal output

Happy debugging! 🎉
