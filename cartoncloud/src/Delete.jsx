import React from 'react';
import { Button, Form } from 'reactstrap';

export default class Update extends React.Component {
  constructor() {
    super();

    this.state = {
      deliveryId: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    const deliveryId = this.props.location.pathname.split('/')[2];
    this.setState({ deliveryId });
  }

  componentDidMount() {

  }

  handleSubmit(event) {
    event.preventDefault();

    const { deliveryId } = this.state;

    fetch(`http://localhost:8000/api/deliveries.php?id=${deliveryId}`, {
      method: 'DELETE',
    }).then((response) => {
      if (response.status === 200) {
        this.props.history.push('/');
      } else {
        response.json().then((json) => {
          console.log(json);
        });
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  render() {
    return (
      <section id="create">
        <h1>Delete Delivery</h1>
        <p>Are you sure you want to delete this delivery (<strong>#{this.state.deliveryId}</strong>)?</p>
        <Form onSubmit={this.handleSubmit}>
          <Button color="danger">Delete</Button>
        </Form>
      </section>
    );
  }
}
