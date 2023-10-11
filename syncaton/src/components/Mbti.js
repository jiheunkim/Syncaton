import './Mbti.css'; // 스타일 파일 import
import CardItem from './CardItem';
import BarChart from './BarChart'; // BarChart 컴포넌트를 불러옵니다.
import React, { useState, useEffect } from 'react';

const MAX_SUMMARY_LENGTH = 100;
let message = 'message';

const Mbti = ({ item, isFirst }) => {
  const [values, setValues] = useState([50, 120, 80]);
  const [fields, setFields] = useState(['첫 번째 분야', '두 번째 분야', '세 번째 분야']);
  useEffect(() => {
    // 백엔드 API 엔드포인트 URL
    const apiUrl = 'https://6097350120.for-seoul.synctreengine.com/account'; // 백엔드 API 주소

    // 백엔드에서 데이터를 비동기적으로 가져오는 함수를 정의합니다.
    const fetchData = async () => {
      try {
        // API 요청 보내기
        const response = await fetch(apiUrl);
        const data = await response.json();
        // 받아온 데이터로 values와 fields 상태를 업데이트합니다.
        setValues(data.data.result.map(item => parseInt(item[1], 10))); // 숫자로 변환하여 저장
        setFields(data.data.result.map(item => item[0])); // 텍스트로 저장
      } catch (error) {
        console.error('데이터 가져오기 실패:', error);
      }
    };

    // 컴포넌트가 마운트될 때 데이터를 가져오도록 호출합니다.
    fetchData();
  }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 실행되도록 설정합니다.



  return (
    <div className='mbti-container'>
      <div className='mbti-content'>
        <div className='mbti-text'>
          <span className='w-btn w-btn-blue' style={{ fontWeight: 'bold',fontSize:'30px' }}>당신의 쇼핑유형은 "쇼핑매니아"입니다.</span>
          <br></br>
          <span style={{ fontWeight: 600, fontSize: '20px' }}>{}</span>
          <br />
          <span style={{ fontWeight: 300, fontSize: '16px', lineHeight: '1.5' }}>
            '당신은 재미있는 쇼핑을 즐기며 지갑과 마음 모두에 행복을 담는 쇼핑 매니아 입니다.' <br></br><br></br>
             쇼핑에 90%를 지출했습니다. <br></br>
             의류에 65%를 지출했습니다.<br></br>
             현대백화점에 70%를 지출하였습니다.<br></br>
            <br></br> {/* 요약 내용 표시 */}
          </span>
        </div>
        <br></br><br></br><br></br>

        <div className="bar-chart-container">
  {values.map((value, index) => (
    <BarChart key={index} value={value} index={index} fields={fields}/>
  ))}
</div>


    <br></br><br></br><br></br>

        <div className='mbti-image'>
        <CardItem
              src='https://slownews.kr/wp-content/uploads/2016/11/shopping.jpg'
              text={
                <>
                  <br/><br/>
                  <strong>혜택:</strong><br/>
                  - 현대백화점 5% 할인<br/>
                  - 3개월 무이자 할부<br/>
                  - 현대백화점 2시간 무료주차<br/>
                  - 현대백화점 회원 혜택
                </>
              }
              label='현대백화점 카드'
              path='https://www.ehyundai.com/newPortal/card/CA/CA000001_V.do?r=&event_id=&use_r='
            />
        </div>
      </div>
    </div>
  );
};

export default Mbti;
