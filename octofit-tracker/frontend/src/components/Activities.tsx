import { useEffect, useState } from 'react';
import { API_BASE_URL, extractItems } from '../lib/api';

interface Activity {
  _id?: string;
  type?: string;
  durationMinutes?: number;
  distanceKm?: number;
  caloriesBurned?: number;
  date?: string;
  user?: { name?: string };
}

export default function Activities() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadActivities() {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/activities/`);
        const data = await response.json();
        setActivities(extractItems(data, 'activities') as Activity[]);
      } catch (err) {
        setError('Unable to load activities.');
      } finally {
        setLoading(false);
      }
    }

    loadActivities();
  }, []);

  return (
    <div className="container py-4">
      <h2>Activities</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {loading ? (
        <div>Loading activities...</div>
      ) : (
        <div>
          <p>{activities.length} activities loaded.</p>
          <div className="list-group">
            {activities.map((activity) => (
              <div key={activity._id ?? `${activity.type}-${activity.date}`} className="list-group-item">
                <strong>{activity.type}</strong>
                <div>User: {activity.user?.name ?? 'Anonymous'}</div>
                <div>Duration: {activity.durationMinutes ?? 'N/A'} min</div>
                <div>Distance: {activity.distanceKm ?? 0} km</div>
                <div>Calories: {activity.caloriesBurned ?? 0}</div>
                <div>Date: {new Date(activity.date ?? '').toLocaleDateString() || 'N/A'}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
