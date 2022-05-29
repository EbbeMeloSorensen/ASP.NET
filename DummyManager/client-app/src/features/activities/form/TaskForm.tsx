import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function ActivityForm() {
    const {taskStore} = useStore();
    const {selectedTask, closeForm, createTask, updateTask, loading} = taskStore;

    const initialState = selectedTask ?? {
        id: 0,
        title: '',
        description: '',
        deadline: '',
        completed: 'N'
    }

    const [task, setTask] = useState(initialState);

    function handleSubmit() {
        task.id === 0 ? createTask(task) : updateTask(task);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;
        setTask({...task, [name]: value})
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' value={task.title} name='title' onChange={handleInputChange}/>
                <Form.TextArea placeholder='Description' value={task.description} name='description' onChange={handleInputChange}/>
                <Form.Input type='date' placeholder='Deadline' value={task.deadline} name='deadline' onChange={handleInputChange} />
                <Button loading={loading} floated='right' positive type='submit' content='Submit' />
                <Button onClick={closeForm} floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
})