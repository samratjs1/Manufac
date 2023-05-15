import React from 'react';
import '../csstyle/GammaStatsTable.css'

function calculateGamma(data) {
  return data.map((item) => {
    const gamma = (item.Ash * item.Hue) / item.Magnesium;
    return {
      ...item,
      Gamma: Number(gamma.toFixed(3)),
    };
  });
}

function calculateClassWiseStats(data, className) {
  const classData = data.filter((item) => item.Alcohol === parseInt(className));
  
  // Mean calculation
  const sum = classData.reduce((acc, item) => acc + item.Gamma, 0);
  const mean = sum / classData.length;
  
  // Median calculation
  const sortedData = classData.sort((a, b) => a.Gamma - b.Gamma);
  const middleIndex = Math.floor(sortedData.length / 2);
  let median;
  if (sortedData.length % 2 === 0) {
    median = (sortedData[middleIndex - 1].Gamma + sortedData[middleIndex].Gamma) / 2;
  } else {
    median = sortedData[middleIndex].Gamma;
  }
  
  // Mode calculation
  const countMap = {};
  let maxCount = 0;
  let mode = null;
  classData.forEach((item) => {
    if (countMap[item.Gamma]) {
      countMap[item.Gamma]++;
    } else {
      countMap[item.Gamma] = 1;
    }
    if (countMap[item.Gamma] > maxCount) {
      maxCount = countMap[item.Gamma];
      mode = item.Gamma;
    }
  });

  return {
    mean: mean.toFixed(3),
    median: median.toFixed(3),
    mode: mode,
  };
}

function GammaStatsTable({data}) {

  const gammaData = calculateGamma(data);

  const class1GammaStats = calculateClassWiseStats(gammaData, '1');
  const class2GammaStats = calculateClassWiseStats(gammaData, '2');
  const class3GammaStats = calculateClassWiseStats(gammaData, '3');

  return (
    <table className='table' style={{width:'45%' ,marginTop:"50px"}}>
      <thead>
        <tr>
          <th>Measure</th>
          <th>Class 1</th>
          <th>Class 2</th>
          <th>Class 3</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td >Gamma Mean</td>
          <td >{class1GammaStats.mean}</td>
          <td >{class2GammaStats.mean}</td>
          <td >{class3GammaStats.mean}</td>
        </tr>
        <tr>
          <td >Gamma Median</td>
          <td >{class1GammaStats.median}</td>
          <td >{class2GammaStats.median}</td>
          <td >{class3GammaStats.median}</td>
        </tr>
        <tr>
          <td >Gamma Mode</td>
          <td >{class1GammaStats.mode}</td>
          <td >{class2GammaStats.mode}</td>
          <td >{class3GammaStats.mode}</td>
        </tr>
      </tbody>
    </table>
  );
}

export default GammaStatsTable;