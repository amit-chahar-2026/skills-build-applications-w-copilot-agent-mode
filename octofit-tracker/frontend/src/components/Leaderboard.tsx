import { useEffect, useState } from 'react';
import { API_BASE_URL, extractItems } from '../lib/api';

interface LeaderboardEntry {
  _id?: string;
  user?: { name?: string };
  score?: number;
  rank?: number;
}

export default function Leaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/leaderboard/`);
        const data = await response.json();
        setEntries(extractItems(data, 'leaderboard') as LeaderboardEntry[]);
      } catch (err) {
        setError('Unable to load leaderboard.');
      } finally {
        setLoading(false);
      }
    }

    loadLeaderboard();
  }, []);

  return (
    <div className="container py-4">
      <h2>Leaderboard</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {loading ? (
        <div>Loading leaderboard...</div>
      ) : (
        <div>
          <p>{entries.length} leaderboard entries loaded.</p>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Rank</th>
                <th>User</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, index) => (
                <tr key={entry._id ?? index}>
                  <td>{entry.rank ?? index + 1}</td>
                  <td>{entry.user?.name ?? 'Unknown'}</td>
                  <td>{entry.score ?? 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
