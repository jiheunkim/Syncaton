import React, { useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, signOut } from "../firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import {Button} from './Button';
import './Navbar.css';

function Navbar() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    const [activeLink, setActiveLink] = useState('');
    const [loggedIn, setLoggedIn] = useState(false); // 로그인 상태
    const [userName, setUserName] = useState(''); // 사용자 이름
    
    const navigate = useNavigate(); // useHistory 훅 사용

    const handleClick = () => setClick(!click) ;
    const closeMobileMenu = () => setClick(false);

    // 화면 크기에 따라서 버튼이 보이고 안보이도록 설정
    const showButton = () => {
        if(window.innerWidth <= 960){
            setButton(false)
        }
        else {
            setButton(true);
        }
    };

    // SIGNUP버튼이 사이즈가 줄어들면 없어지도록 함
    useEffect(() => {
        showButton();

        // Firebase Authentication의 로그인 상태를 관찰하고 사용자 이름을 가져옴
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            setLoggedIn(true);
            setUserName(user.displayName || ''); // 사용자 이름 가져오기
          } else {
            setLoggedIn(false);
            setUserName('');
          }
        });

        return () => unsubscribe();
    }, []);

    // 링크 클릭 시 activeLink 업데이트
    const handleLinkClick = (link) => {
        setActiveLink(link);
        closeMobileMenu();
    };

    window.addEventListener('resize', showButton);

    // 로그인 버튼 클릭 시 이벤트 핸들러
    const handleLoginButtonClick = () => {
      if (loggedIn) {
        signOut(auth) // Firebase Authentication에서 로그아웃
          .then(() => {
            // 로그아웃 성공 시 수행할 작업 (예: 상태 업데이트 등)
            setLoggedIn(false);
            setUserName('');
          })
          .catch((error) => {
            // 로그아웃 실패 시 처리
            console.error('로그아웃 실패:', error);
          });
      } else {
        navigate("/sign-up");
      }
    };


    return (
        <>
          <nav className="navbar">
            <div className="navbar-container">
              {/* 모바일버전에서 클릭하면 메뉴 보이도록 설정하는 것도 한다. (close Mobile Menu)는 다시 버튼 누르면 없어지고 생기고 하도록 한다. */}
              <Link to="/" className={`navbar-logo ${activeLink === 'home' ? 'active' : ''}`} onClick={() => handleLinkClick('home')}>
                DalleCapture
              </Link>
              <div className="menu-icon" onClick={handleClick}>
                <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
              </div>
              <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                {/* <li className="nav-item">
                  <Link
                    to="/mypage"
                    className={`nav-links ${activeLink === 'mypage' ? 'active' : ''}`}
                    onClick={() => handleLinkClick('mypage')}
                  >
                    마이페이지
                  </Link>
                </li> */}
                <li className="nav-item">
                  <button className={`nav-links-mobile ${activeLink === 'sign-up' ? 'active' : ''}`} onClick={handleLoginButtonClick}>
                    {loggedIn ? '로그아웃' : '로그인'}
                  </button>
                </li>
              </ul>
              {loggedIn && (
                <div className="nav-username">{userName}
                <span className='nav-welcome'>님 환영합니다.</span>&nbsp;&nbsp;
                </div>
              )}
              {button && (
                <button className="nav-links" onClick={handleLoginButtonClick}>
                  {loggedIn ? '로그아웃' : '로그인'}
                </button>
              )}
            </div>
          </nav>
        </>
    );
}

export default Navbar;