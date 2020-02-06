import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';



class RegisterModal extends Component {
  state = {
    modal: false,
    name: '',
    email: '',
    password: '',
    msg: null
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  }

  componentDidUpdate(prevProps, nextProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      // Check for register error
      if (error.id === 'REGISTER_FAIL') {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null })
      }
    }
    // If authenticated, close modal 
    if (this.state.modal) {
      if (isAuthenticated) {
        this.toggle();
      }
    }
  }

  toggle = () => {
    // Clear errors
    this.props.clearErrors();
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
    const { name, email, password } = this.state;
    // Create user object
    const newUser = {
      name,
      email,
      password
    }
    // Attempt to register
    this.props.register(newUser)
  }



  render() {
    return (
      <div>
        <NavLink onClick={this.toggle} href="#">Register</NavLink>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Registert</ModalHeader>
          <ModalBody>
            { this.state.msg ? <Alert color="danger">{ this.state.msg }</Alert> : null }
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input
                  onChange={this.onChange}
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name"
                />
              </FormGroup>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  onChange={this.onChange}
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  onChange={this.onChange}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                />
              </FormGroup>
              <Button
              color="dark"
              style={{marginTop: '2rem'}}
              block
              >Register</Button>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }

}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
})

const mapDispatchToProps = dispatch => ({
  register: (newUser) => dispatch(register(newUser)),
  clearErrors: () => dispatch(clearErrors())
})

export default connect(mapStateToProps, mapDispatchToProps)(RegisterModal);
