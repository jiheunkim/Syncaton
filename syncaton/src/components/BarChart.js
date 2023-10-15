import React from 'react';
import './BarChart.css'; // 스타일 파일을 불러옵니다.


const BarChart = ({ value, indexs }) => {
  const getBarColor = (indexs) => {
    const colors = ['#FFC107', '#03A9F4', '#FF5722', '#607D8B', '#FF9800', '#795548', '#8BC34A', '#9C27B0', '#2196F3'];
    return colors[indexs % colors.length]; // index 값이 범위를 벗어날 경우를 대비해 % 연산자 사용
  };
  const getBarField = (indexs) => {
    const fields = ['교육비','통신비','음식','교통','쇼핑','카페','여행','문화생활','생활'];
    return fields[indexs % fields.length]; // index 값이 범위를 벗어날 경우를 대비해 % 연산자 사용
  };

  const fieldValue = getBarField(indexs); // indexs에 따른 필드 값을 가져옵니다.

  const formattedString =`지출하셨습니다.`; // 템플릿 문자열 사용

  
  const barStyle = {
    width: `${value*5}px`, // 숫자값에 따라 막대의 넓이를 동적으로 설정합니다.
    backgroundColor: getBarColor(indexs) // 막대의 배경색을 동적으로 설정합니다.
  };

  return (
    <div className="bar-container">
      <div className="bar" style={barStyle}></div>
      <p className="bar-text">
        <span className='bar-text2'>{fieldValue}</span>에&nbsp;&nbsp;
        <span className='bar-text3'>{value}%</span>&nbsp;{formattedString}</p> {/* 여기에서 index를 사용해야 올바른 설명이 표시됩니다. */}
    </div>
  );
};

export default BarChart;
