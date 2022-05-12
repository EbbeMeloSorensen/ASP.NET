import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { Container, List, ListList } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';

function App() {
  // Initially make an empty list
  const [activities, setActivities] = useState<Activity[]>([]);

  // Populate the list with data retrieved from the api.
  // The empty array at the end is in order to avoid an infinite loop.
  useEffect(() => {
    axios.get<Activity[]>('http://localhost:5000/api/activities').then(response => {
      setActivities(response.data);
    })
  }, [])

  return (
    <>
      <NavBar />
      <div>
        <ListList>
          {activities.map((activity: any) => (
            <List.Item key={activity.id}>
              {activity.title}
            </List.Item>
          ))}
        </ListList>
      </div>
      <Container style={{marginTop: '2em'}}>
        <ActivityDashboard activities={activities} />
      </Container>
    </>
  );
}

export default App;
