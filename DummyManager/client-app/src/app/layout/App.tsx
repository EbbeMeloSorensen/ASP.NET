import React, { useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import TaskDashboard from '../../features/activities/dashboard/TaskDashboard';
import LoadingComponent from './LoadingComponents';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App() {
  const {taskStore} = useStore();
  
  useEffect(() => {
    taskStore.loadTasks();
  }, [taskStore])
    
  if (taskStore.loadingInitial) return <LoadingComponent content='Loading app' />

  return (
    <>
      <NavBar />
      <Container style={{marginTop: '7em'}}>
        <TaskDashboard />
      </Container>
    </>
  );
}

export default observer(App);
