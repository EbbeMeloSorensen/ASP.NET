import React, { useEffect, useState } from 'react';
import { Header, List } from 'semantic-ui-react';
import axios from 'axios';

function App() {
  // Teorien for disse forklares fint i lesson 27
  const [activities, setActivities] = useState([])

  useEffect(() => {
    axios.get('http://localhost:5000/api/activities').then(response => {
      setActivities(response.data);
    })
  }, []) // Denne tomme liste er der for at undgå en uendelig løkke, som Neil beskriver

  return (
    <div>
      <Header as='h2' icon='users' content='Reactivities'/>
        <List>
        {activities.map((activity: any) => (
            <List.Item key={activity.id}>
              {activity.title}
            </List.Item>
          ))}
        </List>
    </div>
  );
}

export default App;
