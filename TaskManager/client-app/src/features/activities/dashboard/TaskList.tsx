import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react';
import { Button, Item, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

export default observer(function TaskList() {
    const {taskStore} = useStore();
    const {deleteTask, tasksByTitle, loading} = taskStore;
    const [target, setTarget] = useState('');

    function handleTaskDelete(e: SyntheticEvent<HTMLButtonElement>, id: number) {
        setTarget(e.currentTarget.name);
        deleteTask(id);
    }

    return (
        <Segment>
            <Item.Group divided>
                {tasksByTitle.map(task => (
                    <Item key={task.id}>
                        <Item.Content>
                            <Item.Header as='a'>{task.title}: {task.description}</Item.Header>
                            <Item.Extra>
                                <Button onClick={() => taskStore.selectTask(task.id)} floated='right' content='View' color='blue' />
                                <Button 
                                    name={task.id}
                                    loading={loading && target === task.id.toString()} // not sure this casting works..
                                    onClick={(e) => handleTaskDelete(e, task.id)} 
                                    floated='right' 
                                    content='Delete' 
                                    color='red' />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
})