import './Mbti.css'; // 스타일 파일 import
import CardItem from './CardItem';
import BarChart from './BarChart'; // BarChart 컴포넌트를 불러옵니다.
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const MAX_SUMMARY_LENGTH = 100;
let message = 'message';

const Mbti = () => {
  const [loading, setLoading] = useState(false); // 로딩 상태 추가
  const [info, setInfo] = useState([]);
  const [profile, setProfile] = useState([]);
  const [explain, setExplain] = useState([]);
  const [message, setMessage] = useState([]);
  const [uid, setUid] = useState(null); // 사용자 UID 상태
  
  useEffect(() => {
    setLoading(true); // 로딩 상태 활성화

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
    <div className='mbti-container'>
      <div className='mbti-content'>
        <div className='mbti-text'>
        {/* 이미지를 화면에 표시 */}
        <img
          className='profileImg'
          alt='dalle'
          src={profile}
        />
        <br></br>
        <span className="w-btn w-btn-blue" style={{ fontFamily: 'PretendardVariable', fontWeight: 700, fontSize: '30px' }}>
          당신의 쇼핑유형은 <span className='type-emphasize'>
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
      </div>
    </div>
  );
};

export default Mbti;
