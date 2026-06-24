import { useEffect, useState } from 'react';
import { API_BASE_URL, extractItems } from '../lib/api';

interface Workout {
  _id?: string;
  name?: string;
  difficulty?: string;
  durationMinutes?: number;
}

export default function Workouts() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadWorkouts() {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/workouts/`);
        const data = await response.json();
        setWorkouts(extractItems(data, 'workouts') as Workout[]);
      } catch (err) {
        setError('Unable to load workouts.');
      } finally {
        setLoading(false);
      }
    }

    loadWorkouts();
  }, []);

  return (
    <div className="container py-4">
      <h2>Workouts</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {loading ? (
        <div>Loading workouts...</div>
      ) : (
        <div className="row gy-3">
          {workouts.map((workout) => (
            <div key={workout._id ?? workout.name} className="col-md-6">
              <div className="card p-3">
                <h5>{workout.name ?? 'Workout'}</h5>
                <p>Difficulty: {workout.difficulty ?? 'N/A'}</p>
                <p>Duration: {workout.durationMinutes ?? 'N/A'} minutes</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
