import React from 'react';
import './BarChart.css'; // 스타일 파일을 불러옵니다.


const BarChart = ({ value,index,fields }) => {
  const barStyle = {
    width: `${value}px`, // 숫자값에 따라 막대의 넓이를 동적으로 설정합니다.
  };

  return (
    <div className="bar-container">
      <div className="bar" style={barStyle}></div>
      <p className="bar-text">{fields[index]}에 {value} 지출하셨습니다.</p> {/* 여기에서 index를 사용해야 올바른 설명이 표시됩니다. */}
    </div>
  );
};

export default BarChart;
