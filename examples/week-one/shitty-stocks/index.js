const { generateStocks, roundCash } = require('./helpers.js');

const predictNextDayValue = (stocks, learningRate = 0.066667) => {
  // The min and max here should really do something a bit more intelligent by default.
  const generateRandomTheta = (min = 0, max = 0) => (
    Math.floor(Math.random() * (max - min + 1)) + min
  );

  const generateLineFunction = (thetaOne, thetaTwo) => (x) => (
    thetaOne + (thetaTwo * x)
  );

  let thetaOne = 0;
  let thetaTwo = 0;
  let oldThetaOne = Infinity;
  let oldThetaTwo = Infinity;
  let count = 0;

  while (thetaOne != oldThetaOne && thetaTwo != oldThetaTwo) {
    oldThetaOne = thetaOne;
    oldThetaTwo = thetaTwo;

    const currentLineFunction = generateLineFunction(thetaOne, thetaTwo);

    let thetaOneDifference = 0;
    let thetaTwoDifference = 0;

    stocks.forEach((stockPrice, i) => {
      thetaOneDifference = thetaOneDifference + (currentLineFunction(i) - stockPrice);
      thetaTwoDifference = thetaTwoDifference + ((currentLineFunction(i) - stockPrice) * i);
    });

    thetaOne = thetaOne - (learningRate * ((1/stocks.length) * thetaOneDifference));
    thetaTwo = thetaTwo - (learningRate * ((1/stocks.length) * thetaTwoDifference));
  }

  const finalLineFunction = generateLineFunction(thetaOne, thetaTwo);

  return finalLineFunction(stocks.length);
};

const startingPrice = 10;
const variance = 0.5;

const stocks = generateStocks(startingPrice, variance);

const priceTomorrow = predictNextDayValue(stocks);

// The answer should always be within a dollar of $0.

console.log(`Based solely on previous stock prices, tomorrow the price should be: $${roundCash(priceTomorrow)}`);
