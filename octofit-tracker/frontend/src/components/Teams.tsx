import { useEffect, useState } from 'react';
import { API_BASE_URL, extractItems } from '../lib/api';

interface Team {
  _id?: string;
  name?: string;
  members?: number;
}

export default function Teams() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadTeams() {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/teams/`);
        const data = await response.json();
        setTeams(extractItems(data, 'teams') as Team[]);
      } catch (err) {
        setError('Unable to load teams.');
      } finally {
        setLoading(false);
      }
    }

    loadTeams();
  }, []);

  return (
    <div className="container py-4">
      <h2>Teams</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {loading ? (
        <div>Loading teams...</div>
      ) : (
        <div className="row gy-3">
          {teams.map((team) => (
            <div key={team._id ?? team.name} className="col-md-6">
              <div className="card p-3">
                <h5>{team.name ?? 'Unnamed Team'}</h5>
                <p>Team size: {team.members ?? 'N/A'}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
