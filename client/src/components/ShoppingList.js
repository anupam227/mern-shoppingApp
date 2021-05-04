import React, { useEffect } from 'react'
import { Container, ListGroup, ListGroupItem, Button} from 'reactstrap'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { useDispatch, useSelector } from 'react-redux';
import { deleteItem, getItem } from '../actions/itemActions';


const ShoppingList = () => {
    
    const {items} = useSelector(state => state.item);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getItem());
    },[dispatch]) 
    return (
        <Container>
             <ListGroup>
                 <TransitionGroup className="shopping-list">
                     {items.map(({_id, name}) => (
                        <CSSTransition key={_id} timeout={500} classNames="fade">
                            <ListGroupItem>
                                <Button className="remove-btn"
                                color="danger" size="sm"
                                onClick={() => {dispatch(deleteItem(_id))
                                }}>&times;</Button>
                                {name}
                            </ListGroupItem>
                        </CSSTransition> 
                     ))}
                 </TransitionGroup>
             </ListGroup>
        </Container>
    )
}

export default ShoppingList;