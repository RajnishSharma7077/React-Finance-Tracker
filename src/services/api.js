import axios from 'axios';

const API_BASE_URL = 'https://api.exchangerate-api.com/v4/latest';

export const convertCurrency = async (amount, fromCurrency, toCurrency) => {
  if (fromCurrency === toCurrency) return amount;

  try {
    const response = await axios.get(`${API_BASE_URL}/${fromCurrency}`);
    const rate = response.data.rates[toCurrency];
    return amount * rate;
  } catch (error) {
    console.error('Currency conversion error:', error);
    throw new Error('Failed to convert currency');
  }
};

export const getExchangeRates = async (baseCurrency = 'INR') => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${baseCurrency}`);
    return response.data.rates;
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    throw new Error('Failed to fetch exchange rates');
  }
};

// Financial News API (optional)
// export const getFinancialNews = async (query = 'finance') => {
//   try {
//     const response = await axios.get('https://newsapi.org/v2/everything', {
//       params: {
//         q: query,
//         sortBy: 'publishedAt',
//         apiKey: 'demo', // Replace with actual API key
//       },
//     });
//     return response.data.articles || [];
//   } catch (error) {
//     console.error('Error fetching financial news:', error);
//     return [];
//   }
// };
