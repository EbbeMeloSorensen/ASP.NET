import React from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Item, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import {format} from 'date-fns';

interface Props {
    activity: Activity
}

export default function ActivityListItem({activity}: Props) {
    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item.Content>
                        <Item.Header as={Link} to={`/activities/${activity.id}`}>
                            {activity.title}
                        </Item.Header>
                    </Item.Content>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name='clock' />' {format(activity.date!, 'dd MMM yyyy h:mm aa')}
                    <Icon name='marker' />' {activity.venue}
                </span>
            </Segment>
            <Segment clearing>
                <span>{activity.description}</span>
                <Button
                    as={Link}
                    to={`/activities/${activity.id}`}
                    color='teal'
                    floated='right'
                    content='View'
                />
            </Segment>
        </Segment.Group>
    )
}