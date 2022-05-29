import { observer } from "mobx-react-lite";
import React from "react";
import { Grid } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import TaskDetails from "../details/TaskDetails";
import TaskForm from "../form/TaskForm";
import TaskList from "./TaskList";

export default observer(function TaskDashboard() {

    const {taskStore} = useStore();
    const {selectedTask, editMode} = taskStore;

    return (
        <Grid>
            <Grid.Column width='10'>
                <TaskList />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedTask && !editMode &&
                <TaskDetails />}
                {editMode &&
                <TaskForm />}
            </Grid.Column>
        </Grid>
    )
})