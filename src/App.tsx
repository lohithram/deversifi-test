import React from 'react';

// components
import BalanceChart from 'components/BalanceChart'

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <BalanceChart/>
    </div>
  );
}

export default App;
