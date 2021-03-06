import { observer } from 'mobx-react-lite';
import React from 'react'
import { Activity } from './../../../app/models/activity';
import { Segment, Image, Item, Header, Button } from 'semantic-ui-react';

const activityImageStyle = {
    filter: 'brightness(30%)',
    height: '500px'
};

const activityImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

interface Props {
    activity: Activity;
}
export default observer(function ActivityDetailedHeader({activity}: Props){
    return(
        <Segment.Group>
            <Segment basic attached='top' style={{padding: '0'}}>
                <Image src={`${process.env.PUBLIC_URL}/assets/categoryImages/${activity.category}.jpg`} fluid style={activityImageStyle} />
                <Segment style={activityImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header 
                                    size='huge'
                                    content={activity.title}
                                    style={{color: 'white'}}
                                />
                                <p>{activity.date}</p>
                                <p>
                                    Hosted by <strong>Vano</strong>
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                <Button color='teal'>Join Activity</Button>
                <Button>Cancel Activity</Button>
                <Button color='orange' floated='right'>
                    Manage Event
                </Button>
            </Segment>
        </Segment.Group>
    )
})