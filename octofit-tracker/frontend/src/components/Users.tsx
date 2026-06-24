import { useEffect, useState } from 'react';
import { API_BASE_URL, extractItems } from '../lib/api';

interface User {
  _id?: string;
  name?: string;
  email?: string;
  role?: string;
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadUsers() {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/users/`);
        const data = await response.json();
        setUsers(extractItems(data, 'users') as User[]);
      } catch (err) {
        setError('Unable to load users.');
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, []);

  return (
    <div className="container py-4">
      <h2>Users</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {loading ? (
        <div>Loading users...</div>
      ) : (
        <div className="list-group">
          {users.map((user) => (
            <div key={user._id ?? user.email} className="list-group-item">
              <h5>{user.name ?? 'Unknown User'}</h5>
              <div>Email: {user.email ?? 'N/A'}</div>
              <div>Role: {user.role ?? 'N/A'}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
