import React from 'react'
import {data} from "./wineStatsData/data"
import FlavanoidsStats from './components/FlavanoidsStats';
import GammaStatsTable from './components/GammaStatsTable';


function App() {

  return (
    <React.Fragment>
      Wine Stats
      <FlavanoidsStats data={data}/>
      <GammaStatsTable data={data}/>
    </React.Fragment>
  )
}

export default App
