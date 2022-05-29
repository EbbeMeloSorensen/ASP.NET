import React from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';
import { useStore } from '../stores/store';

export default function NavBar() {
    const {taskStore} = useStore();

    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item>
                    <img src="/assets/logo.png" alt="logo" style={{marginRight: '10px'}} />
                    Task Manager
                </Menu.Item>
                <Menu.Item name='Tasks' />
                <Menu.Item>
                    <Button onClick={() => taskStore.openForm()} positive content='Create Task' />
                </Menu.Item>
            </Container>
        </Menu>
    )
}