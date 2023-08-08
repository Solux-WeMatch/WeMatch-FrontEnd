import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Header = () => {
  const [teams, setTeams] = useState([]);
  const [newTeamName, setNewTeamName] = useState('');
  const memberId = 2;

  useEffect(() => {
    const fetchTeams = () => {
      axios
        .get('/teamlist', { params: { memberId } })
        .then((response) => {
          setTeams(response.data.data);
        })
        .catch((error) => {
          console.error('Error fetching teams:', error);
        });
    };

    const fetchUsers = (teamId) => {
        axios
        .get(`/team/users?teamId=${teamId}`)
        .then((response) => {
            setUsers(response.data.data);
        })
        .catch((error) => {
            console.error('Error fetching users:', error);
        });
    };

    fetchTeams();
  }, [memberId]);

  const handleCreateTeam = () => {
    axios
      .post('/create-team', { memberId, teamName: newTeamName })
      .then((response) => {
        console.log('New team created successfully:', response.data);
        // 팀목록 업데이트
        setTeams((prevTeams) => [...prevTeams, { groupId: response.data.data.groupId, groupName: newTeamName }]);
        setNewTeamName('');
      })
      .catch((error) => {
        console.error('Error creating new team:', error);
      });
  };

  const handleInviteUser = () => {
    const email = 'jmy9937@sookmyung.ac.kr';
    const teamId = 9;

    axios
      .post('/invite', { email, memberId, teamId })
      .then((response) => {
        console.log('User invited successfully:', response.data);
        fetchUsers(teamId);
        setInviteEmail('');
      })
      .catch((error) => {
        console.error('Error inviting user:', error);
      });
  };

  const handleExitTeam = (groupId) => {
    axios
      .post(`/team/exit?groupId=${groupId}&memberId=${memberId}`)
      .then((response) => {
        console.log('Exited team successfully:', response.data);
        // 팀목록 업데이트
        setTeams((prevTeams) => prevTeams.filter((team) => team.groupId !== groupId));
      })
      .catch((error) => {
        console.error('Error exiting team:', error);
      });
  };

  return (
    <div>
        <h2>My Teams:</h2>
        <ul>
            {teams.map((team) => (
                <li key={team.groupId}>
                {team.groupName}{' '}
                <button onClick={() => handleExitTeam(team.groupId)}>Exit</button>
                <button onClick={() => handleInviteUser(team.groupId)}>Invite User</button>
                </li>
            ))}
        </ul>

        <div>
            <input
                type="text"
                value={newTeamName}
                onChange={(e) => setNewTeamName(e.target.value)}
            />
            <button onClick={handleCreateTeam}>Create New Team</button>
        </div>

        <div>
            <input
                type="email"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                placeholder="Enter email of user to invite"
            />
        </div>
    </div>
  );
};

export default Header;