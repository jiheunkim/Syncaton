import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Cards.css';
import CardItem from './CardItem';
import { Link } from 'react-router-dom';


function Cards() {
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState([]);

  useEffect(() => {
    setLoading(true);

    axios.get('https://6097350120.for-seoul.synctreengine.com/login') // 백엔드 주소 집어넣기
      .then((response) => {
        const serverInfo = response.data;

        // 서버에서 받아온 정보를 현재 이미지 정보에 추가
        const updatedResultInfo = serverInfo.result.map((item, index) => (
          <div key={index}>
          <CardItem
                            src={item.card_img}
                            text={`${item.card_name} - ${item.card_advantage}`} 
                            label={item.card_name}
                            path={item.card_url}
                          />
                          
                          <a href={item.card_url} style={{ fontFamily: 'PretendardVariable, sans-serif' }}>
                            {item.card_name} 카드 신청하러 가기
                          </a>
                          <br></br><br></br>
                    </div>
        ));

        setInfo(updatedResultInfo);
        setLoading(false); // 데이터 로딩 완료 시 상태 업데이트
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, [])

  return (
    <div className="mypage">
      {loading ? (
        <p>Loading...</p>
      ) : (
        info
      )}
    </div>
  );
}

export default Cards;