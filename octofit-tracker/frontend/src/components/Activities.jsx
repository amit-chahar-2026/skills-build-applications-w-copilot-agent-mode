import React, { useEffect, useState } from 'react';

export default function Activities() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetch('https://-8000.app.github.dev/api/activities')
      .then(response => response.json())
      .then(data => setActivities(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div>
      {/* Render activities */}
    </div>
  );
}