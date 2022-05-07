import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  // Initially make an empty list
  const [activities, setActivities] = useState([]);

  // Populate the list with data retrieved from the api.
  // The empty array at the end is in order to avoid an infinite loop.
  useEffect(() => {
    axios.get('http://localhost:5000/api/activities').then(response => {
      setActivities(response.data);
    })
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1>Activities fetched from api:</h1>
        <ul>
          {activities.map((activity: any) => (
            <li key={activity.id}>
              {activity.title}
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
