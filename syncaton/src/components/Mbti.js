import './Mbti.css'; // 스타일 파일 import
import CardItem from './CardItem';
import BarChart from './BarChart'; // BarChart 컴포넌트를 불러옵니다.
import axios from 'axios';
import React, { useState, useEffect } from 'react';

const MAX_SUMMARY_LENGTH = 100;
let message = 'message';

const Mbti = () => {
  const [loading, setLoading] = useState(false); // 로딩 상태 추가
  const [info, setInfo] = useState([]);
  const [profile, setProfile] = useState([]);
  const [explain, setExplain] = useState([]);
  
  useEffect(() => {
    setLoading(true); // 로딩 상태 활성화
  
    axios
      .get(`/account`)
      .then((response) => {
        // 서버에서 받은 응답 데이터
        const serverInfo = response.data;
        
        // 서버에서 받아온 정보를 현재 이미지 정보에 추가
        const updatedResultInfo = serverInfo.result.map((item) => ({
          category: item[0],
          percent: item[1],
        }));

        // result 정보 업데이트
        setInfo(updatedResultInfo);

        // type 정보 업데이트
        setExplain(serverInfo.type);

        // dalle 정보 업데이트
        setProfile(serverInfo.dallE[0].url); // 이미지 URL 업데이트

      })
      .catch((error) => {
        // 오류 발생 시의 처리
        console.error('데이터 가져오기 실패:', error);
      })
      .finally(() => {
        setLoading(false); // 로딩 상태 비활성화
      });
  }, []);



  return (
    <div className='mbti-container'>
      <div className='mbti-content'>
        <div className='mbti-text'>
        {/* 이미지를 화면에 표시 */}
        <img
          className='img'
          alt='dalle'
          src={profile}
        />
        <span className="w-btn w-btn-blue" style={{ fontWeight: 'bold', fontSize: '30px' }}>
          당신의 쇼핑유형은 "{explain[0]}"입니다.
        </span>
        <br></br>
        <span style={{ fontWeight: 600, fontSize: '20px' }}>
          {explain[1]}
        </span>
        </div>
        <br></br><br></br><br></br>

        <div className="bar-chart-container">
  {info.map((info, indexs) => (
    <BarChart key={indexs} value={info.percent} indexs={info.category}/>
  ))}
</div>


    <br></br><br></br><br></br>

        {/* <div className='mbti-image'>
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
        </div> */}
      </div>
    </div>
  );
};

export default Mbti;
