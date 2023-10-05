import React from 'react';
import './Mbti.css'; // 스타일 파일 import
import CardItem from './CardItem';

const MAX_SUMMARY_LENGTH = 100;
let message = 'message';

const Mbti = ({ item, isFirst }) => {
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
