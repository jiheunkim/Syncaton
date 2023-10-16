import './Mbti.css';
import './Cards.css';
import CardItem from './CardItem';
import BarChart from './BarChart'; // BarChart 컴포넌트를 불러옵니다.
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const MAX_SUMMARY_LENGTH = 100;
let message = 'message';

const Mbti = () => {
  const [loading, setLoading] = useState(false); // 로딩 상태 추가
  const [loading2, setLoading2] = useState(false); // 로딩 상태2 추가
  const [info, setInfo] = useState([]);
  const [info2, setInfo2] = useState([]);
  const [profile, setProfile] = useState([]);
  const [explain, setExplain] = useState([]);
  const [message, setMessage] = useState([]);
  const [showPopup, setShowPopup] = useState(false); // 팝업창
  const [uid, setUid] = useState(null); // 사용자 UID 상태
  const fields = ['교육비','통신비','음식','교통','쇼핑','카페','여행','문화생활','생활'];

  const navigate = useNavigate();
  
  const handleClick = (e) => {
    e.preventDefault();
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    setLoading(true); // 로딩 상태 활성화
    setLoading2(true); // 로딩 상태 활성화

    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // 사용자가 로그인한 경우
        const userUid = user.uid;
        setUid(userUid); // 사용자 UID 설정
      } else {
        // 사용자가 로그아웃한 경우 또는 로그인하지 않은 경우
        // 로그인 페이지로 이동
        navigate('/sign-up');
      }
    });
  
    const postData = {
      uid: uid
    };

    axios
      .post(`/account`, postData)
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
        setProfile(serverInfo.dallE); // 이미지 URL 업데이트

        // 상태메시지 정보 업데이트
        setMessage(serverInfo.msg)


        // 카드 추천 api 연동
        axios.post(`/login`, postData)
          .then((response) => {
            const serverInfo = response.data;

            setInfo2(serverInfo.result);
            setLoading2(false); // 데이터 로딩 완료 시 상태 업데이트
          })
          .catch(error => {
            console.error('카드 추천 Error fetching data:', error);
            setLoading2(false);
          });
      })
      .catch((error) => {
        // 오류 발생 시의 처리
        console.error('데이터 가져오기 실패:', error);
      })
      .finally(() => {
        setLoading(false); // 로딩 상태 비활성화
      });

      return () => unsubscribe();
  }, []);



  return (
    <>
    <div className='mbti-container'>
      <div className='mbti-content'>
        {/* 이미지를 화면에 표시 */}
        {loading ? (
          <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
            <h2 className="text-center text-white text-xl font-semibold">로딩 중...</h2><br></br>
            <h2 className="text-center text-white text-xl font-semibold">카드 지출내역 바탕으로 최적의 쇼핑유형 분석 중💸</h2><br></br>
            <p className="text-center text-white">This may take a few seconds, please don't close this page.</p>
          </div>
        ) : (
          <>
          <div className='mbti-text'>
            <img
              className='profileImg'
              alt='dalle'
              src={profile}
            />
            <div className='coupon-box' onClick={handleClick}>내 쇼핑유형에 맞는 쿠폰 받기💳</div>
            <br></br>
            <span className="w-btn w-btn-blue" style={{ fontFamily: 'PretendardVariable', fontWeight: 700, fontSize: '28px' }}>
              당신의 쇼핑유형은 &nbsp;<span className='type-emphasize'>
                {explain[0]}</span>입니다
            </span>
            <br></br><br></br>
            <span style={{ fontFamily: 'PretendardVariable', fontWeight: 500, fontSize: '20px' }}>
              {explain[1]}
            </span>
          </div>
          <div className="bar-chart-container">
            <div className='today-msg'>
            👉오늘의 메시지👈
            </div>
            <br></br>
            <div className='white-box'>
            {message}
            </div>
            <br></br><br></br><br></br>
            <div className='today-msg'>
            💚TOP3 지출💚
            </div>
            <br></br>
            <div>
            {info.map((info, indexs) => (
              <BarChart key={indexs} value={info.percent} indexs={info.category}/>
            ))}
            </div>
          </div>
          </>
        )}
      </div>
      {showPopup && (
          <>
          <div className="modal-background">
              {/* 모달 백그라운드 */}
            </div>
          <div className="popup">
            <img className="popup-close" alt="closeBtn" src="/image/buttonClose.png" onClick={closePopup}/>
            <div className='popup-t'>!</div>
            <p className='popup-text'>10월의 쿠폰 혜택<br></br></p>
            <img className="popup-qr" alt="qrcode" src="/image/qrcode.png" />
            <button className='popup-submit'>[{fields[info[0].category]} 10% 할인]</button>
          </div>
          </>
        )}
    </div>
    <br></br><br></br><br></br>
    <div className='cards__text'>
    나의 쇼핑유형에 맞는 카드 추천받기
    </div>
    <div className="card_container">
      {loading2 ? (
        <p className='cards__item__text'><br></br>Loading...</p>
      ) : (
        info2.map((item, index) => (
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
};

export default Mbti;
