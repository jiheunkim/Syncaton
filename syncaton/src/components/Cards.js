import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Cards.css';
import CardItem from './CardItem';
import { Link } from 'react-router-dom';

function Cards({nickname}) {

  // const [name, setName] = useState([50, 120, 80]);
  // const [comp, setComp] = useState([4,5,6]);
  // const [advantage, setAdvantage] = useState(['쇼핑매니아']);
  // const [img, setImg] = useState(['당신은 재미있는 쇼핑을 즐기며 지갑과 마음 모두에 행복을 담는 쇼핑 매니아 입니다.']);
  // useEffect(() => {
  //   // 백엔드 API 엔드포인트 URL
  //   const apiUrl = 'https://6097350120.for-seoul.synctreengine.com/account'; // 백엔드 API 주소

  //   // 백엔드에서 데이터를 비동기적으로 가져오는 함수를 정의합니다.
  //   const fetchData = async () => {
  //     try {
  //       // API 요청 보내기
  //       const response = await fetch(apiUrl);
  //       const data = await response.json();
  //       // 받아온 데이터로 values와 fields 상태를 업데이트합니다.
  //       setName(data.data.result.map(item => item[0])); // 숫자로 변환하여 저장
  //       setComp(data.data.result.map(item => item[1])); // 텍스트로 저장
  //       setAdvantage(data.data.type.map(item => item[2])); // 텍스트로 저장
  //       setImg(data.data.type.map(item => item[3])); // 텍스트로 저장
        
  //     } catch (error) {
  //       console.error('데이터 가져오기 실패:', error);
  //     }
  //   };

  //   // 컴포넌트가 마운트될 때 데이터를 가져오도록 호출합니다.
  //   fetchData();
  // }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 실행되도록 설정합니다.

  const [info, setInfo] = useState([]); // 데이터를 저장할 상태를 정의합니다.
  const [loading, setLoading] = useState(true); // 데이터 로딩 상태를 관리합니다.
  const [error, setError] = useState(null); // 에러 상태를 관리합니다.

  useEffect(() => {
    // 데이터를 불러오는 API 호출
    axios.post('https://6097350120.for-seoul.synctreengine.com/login')//백엔드 주소 집어넣기
      .then(response => {
        // 불러온 데이터를 상태에 저장합니다.
        setInfo(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error);
        setLoading(false);
      });
  }, []); // 두 번째 인자로 빈 배열을 전달하여 컴포넌트가 마운트될 때만 이펙트가 실행되도록 합니다.


  // 로딩 중인 경우 로딩 메시지를 보여줍니다.
  if (loading) {
    return <div>Loading...</div>;
  }

    // 에러가 발생한 경우 에러 메시지를 보여줍니다.
    if (error) {
      return <div>Error occurred: {error.message}</div>;
    }

  return (
    <div className='cards'>
      <h1 style={{ fontSize: '36px', textAlign: 'center', fontFamily: 'PretendardVariable, sans-serif' }}>
      {nickname}에게 추천하는 카드 상품
      </h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            {info.map((card, index) => (
              <CardItem
                key={index} // index를 key로 사용
                src={card.card_img}
                text={`${card.card_name} - <br />${card.card_advantage}`}
                label={card.card_name}
                path={card.card_url}
              />
  ))}
      <a href={info[0].card_url} style={{ fontFamily: 'PretendardVariable, sans-serif' }}>카드 신청하러 가기</a>


      {/* <CardItem
            src={info[1].card_img}
            text={`${info[1].card_name} - <br />${info[1].card_advantage}`}
            label={info[1].card_name}
            path={info[1].card_url}
      />
      <a href={info[1].card_url} style={{ fontFamily: 'PretendardVariable, sans-serif' }}>카드 신청하러 가기</a>

      <CardItem
            src={info[2].card_img}
            text={`${info[2].card_name} - <br />${info[2].card_advantage}`}
            label={info[2].card_name}
            path={info[2].card_url}
      />
      <a href={info[2].card_url} style={{ fontFamily: 'PretendardVariable, sans-serif' }}>카드 신청하러 가기</a> */}


            {/* <CardItem
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
            /> */}
            
          </ul>
          
        </div>
      </div>
    </div>
  );
}

export default Cards;