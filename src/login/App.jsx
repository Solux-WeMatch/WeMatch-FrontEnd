//단순히 로그인 하는 부분
import { useState } from 'react';
import styles from './App.module.css'

const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showLogin, setShowLogin] = useState(true);

  const handleLoginClick = () => {
    if (showLogin) {
      // 서버로 이메일 전송하는 로직
      fetch('http://localhost:8080/', {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.emailExists) {
            setShowLogin(false); // 이메일이 존재하면 login 글자 사라지도록 설정
          } else {
            alert('이메일이 존재하지 않습니다.');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          alert('서버와의 연결에 문제가 있습니다.');
        });
    } else {
      // 로그인 버튼이 클릭되었을 때 실행되는 함수
      // 예: 서버로 password 등을 전달하여 로그인 처리
      console.log('로그인 버튼이 클릭되었습니다!');
    }
  };

  return (
    <div className={styles.formBox}>
      {showLogin ? (
        <>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder=" example123@gmail.com "
            className={styles.infoInput}
          />
          <div className={styles.loginNow}>
            <button onClick={handleLoginClick}>Login now</button>
          </div>
        </>
      ) : (
        <div className={styles.loginNow}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
          />
          <button onClick={handleLoginClick}>Login</button>
        </div>
      )}
    </div>
  );
};

export default App;
