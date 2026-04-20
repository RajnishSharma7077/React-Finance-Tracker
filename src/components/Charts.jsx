import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const COLORS = [
  '#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6',
  '#ec4899', '#06b6d4', '#14b8a6', '#f97316', '#6366f1',
];

const COLORS = [
  '#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6',
  '#ec4899', '#06b6d4', '#14b8a6', '#f97316', '#6366f1',
];

// Pie Chart Component
export const SpendingCategoryChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-96 bg-slate-800 rounded-lg border border-slate-700">
        <p className="text-slate-400 font-medium">No data available</p>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
          <defs>
            <rect width="100%" height="100%" fill="transparent" />
          </defs>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ category, percent }) => `${category}: ${(percent * 100).toFixed(0)}%`}
          outerRadius={120}
          fill="#8884d8"
          dataKey="amount"
          style={{ fill: '#f1f5f9' }}
          labelStyle={{ fill: '#f1f5f9', fontSize: '12px' }}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip 
          formatter={(value) => `₹${value.toFixed(2)}`}
          contentStyle={{
            backgroundColor: '#1e293b',
            border: '1px solid #475569',
            borderRadius: '8px',
            color: '#f1f5f9'
          }}
        />
        <Legend 
          wrapperStyle={{ color: '#f1f5f9' }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

// Line Chart Component
export const MonthlySpensingTrendChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-96 bg-slate-800 rounded-lg border border-slate-700">
        <p className="text-slate-400 font-medium">No data available</p>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={data}
        margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
        <XAxis dataKey="month" stroke="#cbd5e1" />
        <YAxis stroke="#cbd5e1" />
        <Tooltip 
          formatter={(value) => `₹${value.toFixed(2)}`}
          contentStyle={{
            backgroundColor: '#1e293b',
            border: '1px solid #475569',
            borderRadius: '8px',
            color: '#f1f5f9'
          }}
        />
        <Legend 
          wrapperStyle={{ color: '#f1f5f9' }}
        />
        <Line
          type="monotone"
          dataKey="expense"
          stroke="#ef4444"
          strokeWidth={2}
          name="Expenses"
          dot={{ fill: '#ef4444', r: 5 }}
        />
        <Line
          type="monotone"
          dataKey="income"
          stroke="#10b981"
          strokeWidth={2}
          name="Income"
          dot={{ fill: '#10b981', r: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

// Bar Chart Component
export const IncomeVsExpenseChart = ({ income, expenses }) => {
  const data = [
    {
      name: 'Current Month',
      Income: income,
      Expenses: expenses,
    },
  ];

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
        <XAxis dataKey="name" stroke="#cbd5e1" />
        <YAxis stroke="#cbd5e1" />
        <Tooltip 
          formatter={(value) => `₹${value.toFixed(2)}`}
          contentStyle={{
            backgroundColor: '#1e293b',
            border: '1px solid #475569',
            borderRadius: '8px',
            color: '#f1f5f9'
          }}
        />
        <Legend 
          wrapperStyle={{ color: '#f1f5f9' }}
        />
        <Bar dataKey="Income" fill="#10b981" name="Income" />
        <Bar dataKey="Expenses" fill="#ef4444" name="Expenses" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default {
  SpendingCategoryChart,
  MonthlySpensingTrendChart,
  IncomeVsExpenseChart,
};
