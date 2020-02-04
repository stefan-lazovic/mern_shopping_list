import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { addItem } from '../actions/itemActions';

class ItemModal extends Component {
  state = {
    modal: false,
    name: ''
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    })
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      name: this.state.name
    }
    // add item via addItem action
    this.props.item(newItem);
    // close modal
    this.toggle();
  }



  render() {
    return (
      <div>
        <Button
          color="dark"
          style={{marginBottom: '2rem'}}
          onClick={this.toggle}
        >Add Item</Button>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add To Shopping List</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="item">Item</Label>
                <Input
                  onChange={this.onChange}
                  type="text"
                  name="name"
                  id="item"
                  placeholder="Add shopping item"
                />
              </FormGroup>
              <Button
              color="dark"
              style={{marginTop: '2rem'}}
              block
              >Add Item</Button>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }

}

const mapDispatchToProps = dispatch => ({
  item: (item) => dispatch(addItem(item))
})

export default connect(null, mapDispatchToProps)(ItemModal);
