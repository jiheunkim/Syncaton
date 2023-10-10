import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from "../../firebase-config";
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import '../../App.css';


const SignUp = () => {
  const [userData, setUserData] = useState(null);

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Firebase Authentication을 사용하여 이메일과 비밀번호로 로그인
      if (email.trim() !== '' && password.trim() !== '') {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        setUserData(user);
        console.log(user);
        navigate('/');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoogleLogin = async (e) => {
    e.preventDefault();

    const provider = new GoogleAuthProvider(); // provider 구글 설정
    signInWithPopup(auth, provider) // 팝업창 띄워서 로그인
      .then((data) => {
        setUserData(data.user); // user data 설정
        console.log(data); // console에 UserCredentialImpl 출력
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
      });
  }


  return (
    <>
    <div className='App-back'>
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              로그인<br></br>
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  이메일
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    required
                    onChange={handleEmailChange} // 입력값이 변경될 때 상태 업데이트
                    className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    비밀번호
                  </label>
                  <div className="text-sm">
                    <a href="#" className="font-semibold text-blue-600 hover:text-blue-500">
                      비밀번호 찾기
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    required
                    onChange={handlePasswordChange} // 입력값이 변경될 때 상태 업데이트
                    className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="relate w-full justify-center rounded-md bg-black py-1 text-m font-semibold leading-6 text-gray-200 shadow-sm hover:text-white hover:font-bold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 mb-2"
                >
                  <img className='login-google' src='https://t1.daumcdn.net/cfile/tistory/251C7B4A52BEB7A526' />
                  로그인
                  <img className='login-google' src='https://t1.daumcdn.net/cfile/tistory/251C7B4A52BEB7A526' />
                </button>
                <button
                  onClick={handleGoogleLogin}
                  className="relate w-full justify-center rounded-md bg-white py-1 text-m font-semibold leading-6 text-gray-500 shadow-lg hover:bg-blue-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  <img className='login-google' alt="google" src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/120px-Google_%22G%22_Logo.svg.png' />
                  <span className="login-google-text">Google 계정으로 로그인</span>
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              아직 회원이 아니신가요?{'   '}
              <a href="/register" className="font-semibold leading-6 text-blue-600 hover:text-blue-500">
                &nbsp;회원가입하기
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
    </div>
  </>
  );
};

export default SignUp;