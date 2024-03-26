import React from 'react';
import './RoundButton.css'; // RoundButton 컴포넌트에서 사용할 스타일 파일을 불러옵니다.
import { Link } from 'react-router-dom';

const RoundButton = ({ to, children }) => {
  return (
    <Link to={to} className="round-button">
      {children}
    </Link>
  );
};

export default RoundButton;
