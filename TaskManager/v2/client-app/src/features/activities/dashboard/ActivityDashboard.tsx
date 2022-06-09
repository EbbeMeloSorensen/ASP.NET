import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import { useStore } from "../../../app/stores/store";
import ActivityFilters from "./ActivityFilters";
import ActivityList from "./ActivityList";

export default observer(function ActivityDashboard() {
    const {activityStore} = useStore();
    const {loadActivities, activityRegistry} = activityStore;
  
    useEffect(() => {
      if (activityRegistry.size <= 1) {
          console.log("activityRegistry.size <= 1, therefore retrieving tasks");
        loadActivities();
      }
      else {
        console.log("activityRegistry.size > 1, therefore NOT retrieving tasks");
      }
    }, [activityRegistry.size, loadActivities])
      
    if (activityStore.loadingInitial) return <LoadingComponent content='Loading tasks...' />    
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList />
            </Grid.Column>
            <Grid.Column width='6'>
                <ActivityFilters />
            </Grid.Column>
        </Grid>
    )
})