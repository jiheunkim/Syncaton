import React from 'react';
import './Cards.css';
import CardItem from './CardItem';
import { Link } from 'react-router-dom';

function Cards() {
  return (
    <div className='cards'>
      <h1 style={{ fontSize: '36px', textAlign: 'center', fontFamily: 'Noto Sans KR, sans-serif' }}>
      '쇼핑매니아'에게 추천하는 카드 상품
      </h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='data:image/jpeg;base64,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'
              text={
                <>
                  현대카드 - 현대백화점 카드<br/><br/>
                  <strong>혜택:</strong><br/>
                  - 현대백화점 5% 할인<br/>
                  - 3개월 무이자 할부<br/>
                  - 현대백화점 2시간 무료주차<br/>
                  - 현대백화점 회원 혜택
                  <br></br><br></br><br></br><br></br>

                  <a href="https://www.ehyundai.com/newPortal/card/CA/CA000001_V.do?r=&event_id=&use_r=">카드 신청하러 가기</a>

                </>
              }
              label='현대백화점 카드'
              path='https://www.ehyundai.com/newPortal/card/CA/CA000001_V.do?r=&event_id=&use_r='
            />
            <CardItem
              src='data:image/jpeg;base64,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'
              text={
                <>
                  현대카드 - 현대백화점 Fit카드<br/><br/>
                  <strong>혜택:</strong><br/>
                  -현대백화점 5% 할인<br/>
                  -H.Point 20% 추가적립<br/>
                  -H.Point 최대 6만 P추가적립<br/>
                  -3개월 무의자 할부
                  <br></br><br></br><br></br>

                  <a href="https://www.ehyundai.com/newPortal/card/TB/TB000009_V.do">카드 신청하러 가기</a>
                </>}
              label='현대백화점 Fit카드'
              path='https://www.ehyundai.com/newPortal/card/TB/TB000009_V.do'
            />
            <CardItem
              src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnXP0lw_HqM4jKweW6enNH3sp9WbyGLE831A&usqp=CAU'
              text={
                <>현대카드 - 현대카드 M BOOST<br/><br/>

                <strong>혜택:</strong><br/>
                -연회비 지원<br/>
                -포인트/캐시백백<br/>
                -온라인결제 5%M포인트 적립<br/>
                -주유 특별적립립<br/>

                <br></br><br></br>

                  <a href="https://card.hyundaicard.com/EVENT?id=best_4&eventCode=SBO01&utm_source=google.adwords&utm_medium=keyword_sa&utm_campaign=M&utm_content=SBO01&utm_term=%ED%98%84%EB%8C%80%EC%B9%B4%EB%93%9C%EC%97%A0&gad=1&gclid=CjwKCAjwvfmoBhAwEiwAG2tqzCy7jcQgFfXsIrCj3681HlrPS7SziBVvDk-wqAgD5WBhHDwfv37lshoCVwAQAvD_BwE">카드 신청하러 가기</a>
                </>
              }
              label='코인원(coinone)'
              path='https://card.hyundaicard.com/EVENT?id=best_4&eventCode=SBO01&utm_source=google.adwords&utm_medium=keyword_sa&utm_campaign=M&utm_content=SBO01&utm_term=%ED%98%84%EB%8C%80%EC%B9%B4%EB%93%9C%EC%97%A0&gad=1&gclid=CjwKCAjwvfmoBhAwEiwAG2tqzCy7jcQgFfXsIrCj3681HlrPS7SziBVvDk-wqAgD5WBhHDwfv37lshoCVwAQAvD_BwE'
            />
            
          </ul>
          
        </div>
      </div>
    </div>
  );
}

export default Cards;