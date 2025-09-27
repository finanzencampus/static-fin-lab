// Calculation utilities for financial calculations

// Format currency values
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

// Format percentage values
export const formatPercentage = (value: number): string => {
  return new Intl.NumberFormat('de-DE', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value / 100);
};

// Compound Interest Calculator
export const calculateCompoundInterest = (
  principal: number,
  monthlyContribution: number,
  annualRate: number,
  years: number
) => {
  const monthlyRate = annualRate / 100 / 12;
  const totalMonths = years * 12;
  const breakdown: Array<{
    year: number;
    balance: number;
    totalContributions: number;
    totalInterest: number;
  }> = [];

  let currentBalance = principal;
  let totalContributions = principal;

  for (let year = 1; year <= years; year++) {
    const monthsInYear = year * 12;
    const monthsInPreviousYear = (year - 1) * 12;
    
    for (let month = monthsInPreviousYear + 1; month <= monthsInYear; month++) {
      // Add monthly contribution at the beginning of each month
      if (month > 1) { // Don't add contribution in first month since we already have principal
        currentBalance += monthlyContribution;
        totalContributions += monthlyContribution;
      }
      
      // Apply monthly interest
      currentBalance *= (1 + monthlyRate);
    }
    
    const totalInterest = currentBalance - totalContributions;
    
    breakdown.push({
      year,
      balance: currentBalance,
      totalContributions,
      totalInterest,
    });
  }

  const finalAmount = currentBalance;
  const totalInterest = finalAmount - totalContributions;

  return {
    finalAmount,
    totalContributions,
    totalInterest,
    breakdown,
  };
};

// Simple Return Calculation
export const calculateSimpleReturn = (
  initialValue: number,
  finalValue: number
): number => {
  return ((finalValue - initialValue) / initialValue) * 100;
};

// CAGR (Compound Annual Growth Rate) Calculation
export const calculateCAGR = (
  initialValue: number,
  finalValue: number,
  years: number
): number => {
  return (Math.pow(finalValue / initialValue, 1/years) - 1) * 100;
};

// Real Return Calculation (adjusted for inflation)
export const calculateRealReturn = (
  initialValue: number,
  finalValue: number,
  inflationRate: number,
  years: number
) => {
  const nominalReturn = calculateCAGR(initialValue, finalValue, years);
  const realReturn = ((1 + nominalReturn/100) / (1 + inflationRate/100) - 1) * 100;
  const inflationImpact = nominalReturn - realReturn;

  return {
    nominalReturn,
    realReturn,
    inflationImpact,
  };
};

// Portfolio Calculations
export const calculatePortfolioMetrics = (priceHistory: Array<{date: string; close: number}>) => {
  if (priceHistory.length < 2) {
    return {
      totalReturn: 0,
      cagr: 0,
      volatility: 0,
      maxDrawdown: 0,
      sharpeRatio: 0,
    };
  }

  const startPrice = priceHistory[0].close;
  const endPrice = priceHistory[priceHistory.length - 1].close;
  
  // Calculate returns
  const dailyReturns = [];
  for (let i = 1; i < priceHistory.length; i++) {
    const prevPrice = priceHistory[i - 1].close;
    const currentPrice = priceHistory[i].close;
    const dailyReturn = (currentPrice - prevPrice) / prevPrice;
    dailyReturns.push(dailyReturn);
  }

  // Total Return
  const totalReturn = ((endPrice - startPrice) / startPrice) * 100;

  // CAGR (assuming data spans exactly the time period)
  const years = priceHistory.length / 365; // Approximate
  const cagr = years > 0 ? calculateCAGR(startPrice, endPrice, years) : 0;

  // Volatility (annualized standard deviation)
  const avgReturn = dailyReturns.reduce((sum, r) => sum + r, 0) / dailyReturns.length;
  const variance = dailyReturns.reduce((sum, r) => sum + Math.pow(r - avgReturn, 2), 0) / dailyReturns.length;
  const volatility = Math.sqrt(variance * 252) * 100; // Annualized (252 trading days)

  // Maximum Drawdown
  let peak = startPrice;
  let maxDrawdown = 0;
  
  for (const price of priceHistory) {
    if (price.close > peak) {
      peak = price.close;
    }
    const drawdown = (peak - price.close) / peak;
    if (drawdown > maxDrawdown) {
      maxDrawdown = drawdown;
    }
  }
  maxDrawdown *= 100;

  // Sharpe Ratio (simplified, assuming risk-free rate = 0)
  const sharpeRatio = volatility > 0 ? (cagr / volatility) : 0;

  return {
    totalReturn,
    cagr,
    volatility,
    maxDrawdown,
    sharpeRatio,
  };
};