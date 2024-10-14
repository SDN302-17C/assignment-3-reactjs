import React, { useContext, useEffect, useState } from 'react';
import IUser from '../../models/User'; 
import { AuthContext } from '../../context/AuthContext';
import { getUsers } from '../../services/api/user.api';

const UserList: React.FC = () => {
  const authContext = useContext(AuthContext);
  const token = authContext?.token;
  const user = authContext?.user;
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!token) {
        setError('User is not authenticated');
        setLoading(false);
        return;
      }

      if (user?.admin !== true) {
        setError('User is not authorized');
        setLoading(false);
        return;
      }

      try {
        console.log('Fetching users with token:', token);
        const userData = await getUsers(token);
        console.log('Fetched user data:', userData);
        setUsers(userData);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [token, user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>User List</h1>
      <table>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.username}>
              <td>{user.fullName}</td>
              <td>{user.username}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;