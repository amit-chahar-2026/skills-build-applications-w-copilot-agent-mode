import React, { useEffect, useState } from 'react';

export default function Teams() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    fetch('https://-8000.app.github.dev/api/teams')
      .then(response => response.json())
      .then(data => setTeams(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div>
      {/* Render teams */}
    </div>
  );
}