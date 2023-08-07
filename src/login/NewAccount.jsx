//모달창에서 정보 보내기 
import { useState } from 'react';
import Modal from './Modal';
import styles from './NewAccount.module.css';

const NewAccount = () => {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCreateAccount = () => {
    // 서버로 회원가입 정보 전송
    const userData = {
      name: name,
      email: email,
      password: password,
    };

    fetch('http://13.124.181.169:8080', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // 서버에서 처리 결과에 따른 메시지 표시
        if (data.success) {
          setSuccessMessage('Successfully created your account');
        } else {
          setErrorMessage('Failed to create an account');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('서버와의 연결에 문제가 있습니다.');
      });
  };

  return (
    <div>
      <div className={styles.ask_new}>
        아직 회원이 아니신가요?{' '}
        <span className={styles.span} onClick={handleOpenModal}>
          회원가입
        </span>
      </div>
      {showModal && (
        <Modal
          onClose={handleCloseModal}
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleCreateAccount={handleCreateAccount}
        />
      )}
    </div>
  );
};

export default NewAccount;