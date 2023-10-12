import React, { useState } from 'react';
import { auth, signOut } from "../../firebase-config";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../App.css';


const Register = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [birth, setBirth] = useState('');
  const [account, setAccount] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleBirthChange = (e) => {
    setBirth(e.target.value);
  };
  
  const handleAccountChange = (e) => {
    setAccount(e.target.value);
  };
  // 에러 메시지 컴포넌트
  
  const ErrorMessage = ({ message }) => {
    return (
      <div className="text-red-500" style={{ fontSize: '12px' }}>&nbsp;{message}</div>
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
        setErrorMessage('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
        return;
      } else {
        setErrorMessage('비밀번호가 일치합니다.');
      }

    try {
      // Firebase Authentication을 사용하여 사용자 생성
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const uid = user.uid; // Firebase에서 생성된 UID

      // 사용자 이름 설정
      await updateProfile(userCredential.user, {
        displayName: name,
      });

      // 로그아웃 처리
    await signOut(auth);
    navigate('/sign-up');

      // 회원가입 성공 시 리다이렉트 또는 다른 작업 수행
      const postData = {
        fields: {
          id: uid, // Firebase에서 생성된 UID
          name: name, // 사용자가 입력한 이름
          account: account, // 사용자가 입력한 계좌 정보
        }
      };

      axios.post('back-end api link', postData)
      .then(response => {
        // POST 요청이 성공한 경우의 처리
        console.log('success to send info');
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

    } catch (error) {
      console.error('회원가입 실패:', error);
    }
  };

  return (
    <>
    <section className="bg-gray-200 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                회원가입
              </h1>
              <form className="space-y-4 md:space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">이메일</label>
                  <input type="email" name="email" id="email" value={email} onChange={handleEmailChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@example.com" required="" />
                </div>
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">이름</label>
                  <input type="text" name="name" id="name" value={name} onChange={handleNameChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="이름을 입력해주세요" required="" />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">비밀번호</label>
                  <input type="password" name="password" id="password" value={password} onChange={handlePasswordChange} placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                </div>
                <div>
                  <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">비밀번호 확인</label>
                  <input type="password" name="confirm-password" id="confirm-password" placeholder="••••••••" value={confirmPassword} onChange={handleConfirmPasswordChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                  {/* 에러 메시지 표시 */}
                  {errorMessage && <ErrorMessage message={errorMessage} />}
                </div>
                <div>
                  <label htmlFor="birth" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">생년월일</label>
                  <input type="text" name="birth" id="birth" value={birth} onChange={handleBirthChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ex) 010123" required="" />
                </div>
                <div>
                  <label htmlFor="account" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">농협카드정보</label>
                  <input type="text" name="account" id="account" value={account} onChange={handleAccountChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="계좌번호 (- 빼고 입력해주세요)" required="" />
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">
                        I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                  </div>
                </div>
                <button type="submit" className="w-full text-white bg-black hover:bg-black-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-black-600 dark:hover:bg-black-700 dark:focus:ring-black-800">회원가입하기</button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  이미 회원가입을 하셨나요?&nbsp;&nbsp;&nbsp;<a href="/sign-up" className="font-medium text-primary-600 hover:underline dark:text-primary-500">로그인하기</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
  </>
  );
};

export default Register;