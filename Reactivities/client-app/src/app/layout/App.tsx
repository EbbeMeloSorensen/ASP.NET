import React, { Fragment, useEffect, useState } from 'react';
import { Container, Header, List } from 'semantic-ui-react';
import axios from 'axios';
import { Activity } from '../models/activity';
import NavBar from './NavBar';

function App() {
  // Teorien for disse forklares fint i lesson 27
  const [activities, setActivities] = useState<Activity[]>([])

  useEffect(() => {
    axios.get<Activity[]>('http://localhost:5000/api/activities').then(response => {
      setActivities(response.data);
    })
  }, []) // Denne tomme liste er der for at undgå en uendelig løkke, som Neil beskriver

  return (
    <>
      <NavBar />
      <Container style={{marginTop: '7em'}}>
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
