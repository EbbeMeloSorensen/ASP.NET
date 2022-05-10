import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { Container, List, ListHeader } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';

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
      <Container style={{marginTop: '2em'}}>
        <List>
          {activities.map(activity => (
              <List.Item key={activity.id}>
                {activity.title}
              </List.Item>
          ))}
        </List>
      </Container>
    </>
  );
}

export default App;
