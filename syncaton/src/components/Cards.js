import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Cards.css';
import CardItem from './CardItem';
import { getAuth, onAuthStateChanged } from 'firebase/auth';


function Cards() {
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState([]);
  const [uid, setUid] = useState(null); // 사용자 UID 상태

  useEffect(() => {
    setLoading(true);

    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // 사용자가 로그인한 경우
        const userUid = user.uid;
        setUid(userUid); // 사용자 UID 설정
      } else {
        // 사용자가 로그아웃한 경우 또는 로그인하지 않은 경우
        setUid(null); // UID를 초기화하거나 다른 처리를 수행할 수 있습니다.
      }
    });
  
    const postData = {
      uid: uid
    };

    axios.get(`/login`) // 백엔드 주소 집어넣기
      .then((response) => {
        const serverInfo = response.data;

        setInfo(serverInfo.result);
        setLoading(false); // 데이터 로딩 완료 시 상태 업데이트
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });

      return () => unsubscribe();
  }, [])

  
  return (
    <>
    <div className='cards__text'>
      나의 쇼핑유형에 맞는 카드 추천받기
    </div>
    <div className="card_container">
      {loading ? (
        <p className='cards__item__text'><br></br>Loading...</p>
      ) : (
        info.map((item, index) => (
          <div key={index}>
            <CardItem
              src={item.card_img}
              text1={item.card_name}
              text2={`- ${item.card_advantage}`} 
              label={item.card_name}
              path={item.card_url}
            />
            <br></br><br></br><br></br><br></br>
          </div>
        ))
      )}
    </div>
    </>
  );
  
}

export default Cards;