# Setup & Running Instructions

## ✅ Prerequisites

- **Node.js** v16 or higher
- **npm** v8 or higher

## 📥 Installation Steps

### 1. Install Dependencies
```bash
npm install
```

This will install all required packages listed in `package.json`:
- React & React DOM
- React Router DOM
- Tailwind CSS
- React Hook Form with Yup validation
- Recharts for data visualization
- Framer Motion for animations
- Axios for API calls
- React Icons
- React Toastify for notifications
- And more...

### 2. Start Development Server
```bash
npm run dev
```

The app will start at `http://localhost:5173`

### 3. Open in Browser
Click on the Local URL shown in the terminal or open:
```
http://localhost:5173
```

## 🚀 Running the App

### Development Mode
```bash
npm run dev
```
- Hot reload enabled
- Development optimizations
- Error highlighting

### Build for Production
```bash
npm run build
```
- Creates optimized `dist/` folder
- Minified CSS and JavaScript
- Ready for deployment

### Preview Production Build
```bash
npm run preview
```
- Shows how the production build will look
- Still a local preview

### Run Linter
```bash
npm run lint
```
- Checks code quality
- Shows any linting errors

## 📁 Key Files & Directories

- **src/pages/** - Main page components (Dashboard, Transactions, Budget, Analytics)
- **src/components/** - Reusable UI components
- **src/hooks/** - Custom React hooks
- **src/context/** - Context API for state management
- **src/services/** - API integration
- **src/utils/** - Utility functions
- **src/App.jsx** - Main app router
- **tailwind.config.js** - Tailwind CSS configuration
- **vite.config.js** - Vite configuration

## 🎯 First Steps in the App

1. **Visit Dashboard** - See your financial overview
2. **Add Transactions** - Click "Add Transaction" button to create new income/expense
3. **View All Transactions** - Go to Transactions page to see complete list
4. **Set Budget** - Navigate to Budget page to set your monthly budget
5. **Analyze Spending** - Check Analytics page for detailed charts and insights

## 💾 Data Storage

- All data is saved in **localStorage**
- No login or backend required
- Data persists when you close the browser
- Clear browser cache to reset data

## 🔄 Currency Settings

1. Click currency selector in header (INR, USD, EUR, GBP)
2. Selected currency is used throughout the app
3. Real-time currency conversion available

## ⚙️ Configuration

### Tailwind CSS
- **File:** `tailwind.config.js`
- Customize colors, fonts, breakpoints here

### Environment Variables
Currently, the app doesn't require env variables. For future API keys:
- Create `.env.local` file
- Add: `VITE_API_KEY=your_key_here`
- Access in code: `import.meta.env.VITE_API_KEY`

## 🐛 Troubleshooting

### Port Already in Use
```bash
# If port 5173 is busy, Vite will use next available port
npm run dev
```

### Dependencies Issues
```bash
# Clear npm cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Errors
```bash
# Clear dist folder and rebuild
rm -rf dist
npm run build
```

## 📱 Mobile Testing

### On Same Network
```bash
# Get your IP address
ipconfig getifaddr en0  # macOS
# Then access: http://YOUR_IP:5173
```

### Chrome DevTools
- Press F12 or Right-click → Inspect
- Click device icon to toggle mobile view
- Test responsiveness

## 🎨 Customization

### Change Colors
Edit `tailwind.config.js` to modify the color scheme

### Add Categories
Edit `EXPENSE_CATEGORIES` in:
- `src/components/Filters.jsx`
- `src/components/TransactionForm.jsx`

### Modify Budget Default
Edit `initialBudget` in `src/context/FinanceContext.jsx`

## 📦 Deployment

### Build for Deployment
```bash
npm run build
```

### Deploy Options
- **Vercel** (Recommended)
  ```bash
  npm i -g vercel
  vercel
  ```

- **Netlify**
  - Connect GitHub repo
  - Set build command: `npm run build`
  - Set publish directory: `dist`

- **GitHub Pages**
  ```bash
  npm run build
  # Upload dist/ folder contents
  ```

## 🔗 Useful Links

- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [React Router](https://reactrouter.com)
- [Vite Documentation](https://vite.dev)
- [Recharts](https://recharts.org)
- [React Hook Form](https://react-hook-form.com)
- [Framer Motion](https://www.framer.com/motion/)

## 📝 Notes for Developers

### Project Architecture
- **Components:** Reusable UI components
- **Pages:** Full page components
- **Context:** Global state management
- **Hooks:** Custom React hooks for logic reuse
- **Services:** API integration layer
- **Utils:** Helper functions

### Code Style
- Use functional components
- Use React hooks
- Prefer composition over inheritance
- Keep components small and focused

### Adding New Features
1. Create component/hook in appropriate folder
2. Import and use in page/component
3. Update context if adding global state
4. Test in browser

## 🆘 Getting Help

1. Check README.md and README_DETAILED.md
2. Review component comments
3. Check console for error messages
4. Verify all dependencies are installed

## ✨ Tips & Tricks

- Use DevTools to inspect state
- Check localStorage in DevTools → Application
- Use React DevTools browser extension
- Console.log for debugging
- Hot reload refreshes without page reload

Happy coding! 🎉
