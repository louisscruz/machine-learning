const roundCash = value => Math.round(value * 100) / 100;

const generateStockPrice = (number, variance, slope, startPrice) => {
  const slopeCost = slope * number;
  const straightValue = startPrice + slopeCost;
  const temperature = (Math.random() * variance * 2) - variance;
  const stockValue = straightValue + temperature;

  return roundCash(stockValue);
};

const generateStocks = (count, variance, slope = -1, startPrice = count) => {
  const stocks = []

  for (let i = 0; i < count; i++) {
    const stockPrice = generateStockPrice(i, variance, slope, startPrice);

    stocks.push(stockPrice);
  }

  return stocks;
};

module.exports = {
  generateStocks: generateStocks,
  roundCash: roundCash
};
