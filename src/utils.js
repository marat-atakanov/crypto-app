export const percentDifference = (a, b) => {
  return (100 * Math.abs((a - b) / ((a + b) / 2))).toFixed(2);
};

export const capitalize = (word) => {
  return word.charAt(0).toUpperCase() + word.substring(1);
};

export const mapAssets = (assets, coins) => {
  return assets.map((asset) => {
    const coin = coins.find((item) => item.id === asset.id);
    return {
      ...asset,
      grow: coin.price > asset.price,
      growPercent: percentDifference(asset.price, coin.price),
      totalAmount: asset.amount * coin.price,
      totalProfit: asset.amount * coin.price - asset.amount * asset.price,
    };
  });
};

export const formatAsset = (asset, coins) => {
  const coin = coins.find((item) => item.id === asset.id);
  return {
    ...asset,
    grow: coin.price > asset.price,
    growPercent: percentDifference(asset.price, coin.price),
    totalAmount: asset.amount * coin.price,
    totalProfit: asset.amount * coin.price - asset.amount * asset.price,
    name: coin.name
  };
};
