import React, { useState } from 'react';
import axios from 'axios';
import styles from './Header.module.css';

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [teamName, setTeamName] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [memberId, setMemberId] = useState(''); // 서버에서 가져온 데이터로 초기화
  const [teamId, setTeamId] = useState('');

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setTeamName('');
  };

  const openInviteModal = () => {
    setInviteModalOpen(true);
  };

  const closeInviteModal = () => {
    setInviteModalOpen(false);
    setEmail('');
  };

  const handleTeamNameChange = (e) => {
    setTeamName(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleCreateTeam = async () => {
    try {
      const response = await axios.post('https://cors-anywhere.herokuapp.com/http://13.124.181.169:8080//create-team', { teamName });
      if (response.status === 200) {
        closeModal();
      }
    } catch (error) {
      console.error('팀만들기 에러:', error);
    }
  };

  const handleInvite = async () => {
    try {
      const response = await axios.post('https://cors-anywhere.herokuapp.com/http://13.124.181.169:8080/invite', {
        email,
        memberId,
        teamId,
      });
      if (response.status === 200) {
        closeInviteModal();
      }
    } catch (error) {
      console.error('멤버 초대에 실패했습니다:', error);
    }
  };

  return ( 
    <>
    <header>
        <div className={`${styles.dropdown} ${dropdownOpen ? styles.open : ''}`}>
          <button className={styles.dropbtn} onClick={toggleDropdown}>profile</button>
          <div className={styles['dropdown-content']}>
            <button onClick={openModal} className={styles.makegroup}>그룹 생성하기</button>
            <button onClick={openInviteModal} className={styles.invite}>모임 초대하기</button>
          </div>
        </div>
        <button className={styles.bringit}>팀 일정 불러오기</button>
      </header>

    {modalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <input
              type="text"
              placeholder="팀 이름"
              value={teamName}
              onChange={handleTeamNameChange}
            />
            <button onClick={handleCreateTeam}>모임 생성</button>
          </div>
        </div>
      )}

    {inviteModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <input
              type="email"
              placeholder="이메일 주소"
              value={email}
              onChange={handleEmailChange}
            />
            <button onClick={handleInvite}>초대하기</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;