import React from "react";
  
const calculateMean = (data, className) => {
  const classData = data.filter((item) => item.Alcohol === className);
  const sum = classData.reduce((acc, item) => acc + item.Flavanoids, 0);
  return sum / classData.length;
};

const calculateMedian = (data, className) => {
  const classData = data.filter((item) => item.Alcohol === className);
  const sortedData = classData.sort((a, b) => a.Flavanoids - b.Flavanoids);
  const middleIndex = Math.floor(sortedData.length / 2);
  if (sortedData.length % 2 === 0) {
    return (sortedData[middleIndex - 1].Flavanoids + sortedData[middleIndex].Flavanoids) / 2;
  } else {
    return sortedData[middleIndex].Flavanoids;
  }
};

const calculateMode = (data, className) => {
  const classData = data.filter((item) => item.Alcohol === className);
  const countMap = {};
  let maxCount = 0;
  let mode = null;
  classData.forEach((item) => {
    if (countMap[item.Flavanoids]) {
      countMap[item.Flavanoids]++;
    } else {
      countMap[item.Flavanoids] = 1;
    }
    if (countMap[item.Flavanoids] > maxCount) {
      maxCount = countMap[item.Flavanoids];
      mode = item.Flavanoids;
    }
  });
  return mode;
};

const FlavanoidsStats = ({ data }) => {
  const classes = [...new Set(data.map((item) => item.Alcohol))];

  const meanValues = classes.map((className) =>
    calculateMean(data, className)
  );
  const medianValues = classes.map((className) =>
    calculateMedian(data, className)
  );
  const modeValues = classes.map((className) =>
    calculateMode(data, className)
  );
  // console.log(meanValues)
  return (
    <table className="table" style={{border: '1px solid black', width:'45%',marginTop:'10px'}}>
      <thead >
        <tr>
          <th style={{border: '1px solid black'}}>Measure</th>
          {classes.map((className) => (
            <th style={{border: '1px solid black'}} key={className}>Class {className}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{border: '1px solid black'}}>Flavanoids Mean</td>
          {meanValues.map((value, index) => (
            <td style={{border: '1px solid black'}} key={index}>{value.toFixed(3)}</td>
          ))}
        </tr>
        <tr>
          <td style={{border: '1px solid black'}}>Flavanoids Median</td>
          {medianValues.map((value, index) => (
            <td style={{border: '1px solid black'}} key={index}>{value.toFixed(3)}</td>
          ))}
        </tr>
        <tr>
          <td style={{border: '1px solid black'}}>Flavanoids Mode</td>
          {modeValues.map((value, index) => (
            <td style={{border: '1px solid black'}} key={index}>{value.toFixed(3)}</td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};

export default FlavanoidsStats;
