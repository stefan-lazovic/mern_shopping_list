import React from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { deleteItem } from '../actions/itemActions';

const ShoppingList = (props) => {
  const { items } = props.item;
  const { deleteItem } = props;

  return (
    <Container>
      <ListGroup>
        <TransitionGroup className="shopping-list">
          {
            items.map(({ id, name }) => (
              <CSSTransition key={id} timeout={500} classNames="fade">
                <ListGroupItem>
                  <Button
                    className="remove-btn"
                    color="danger"
                    size="sm"
                    onClick={() => deleteItem(id)}
                  >&times;</Button>
                  {name}
                </ListGroupItem>
              </CSSTransition>
            ))
          }
        </TransitionGroup>
      </ListGroup>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  item: state.item
})

const mapDispatchToProps = (dispatch) => ({
  deleteItem: (itemId) => dispatch(deleteItem(itemId))
})

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingList);
