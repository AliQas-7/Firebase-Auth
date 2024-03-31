import React from 'react';
import useBitcoinData from './hooks/useBitcoinData';
import BitcoinList from './BitcoinList';

const App = () => {
  const bitcoinData = useBitcoinData();

  return <BitcoinList bitcoinData={bitcoinData} />;
};

export default App;
