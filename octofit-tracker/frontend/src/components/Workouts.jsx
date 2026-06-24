import React, { useEffect, useState } from 'react';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    fetch('https://-8000.app.github.dev/api/workouts')
      .then(response => response.json())
      .then(data => setWorkouts(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div>
      {/* Render workouts */}
    </div>
  );
}