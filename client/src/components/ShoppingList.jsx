import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';
import PropTypes from 'prop-types';

class ShoppingList extends Component {
  static propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
  }

  componentDidMount() {
    this.props.getItems();
  }

  render() {
    const { items } = this.props.item;
    return (
      <Container>
        <ListGroup>
          <TransitionGroup className="shopping-list">
            {
              items.map(({ _id, name }) => (
                <CSSTransition key={_id} timeout={500} classNames="fade">
                  <ListGroupItem>
                    {
                    this.props.isAuthenticated
                    ? <Button
                        className="remove-btn"
                        color="danger"
                        size="sm"
                        onClick={() => this.props.deleteItem(_id)}
                      >&times;</Button>
                    : null
                    }
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

}

const mapStateToProps = (state) => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated
})

const mapDispatchToProps = (dispatch) => ({
  getItems: () => dispatch(getItems()),
  deleteItem: (itemId) => dispatch(deleteItem(itemId))
})

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingList);
