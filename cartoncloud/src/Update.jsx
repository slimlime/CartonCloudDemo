import React from 'react';
import { Button, Form, FormGroup, FormFeedback, Label, Input, Col } from 'reactstrap';

export default class Update extends React.Component {
  constructor() {
    super();

    this.state = {
      delivery: {
        name: '',
        date: '',
        driver_id: '',
      },
      drivers: [],
      errors: {
        name: '',
        date: '',
        driver_id: '',
      },
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const deliveryId = this.props.location.pathname.split('/')[2];

    fetch(`http://localhost:8000/api/deliveries.php?id=${deliveryId}`)
      .then(results => results.json())
      .then((delivery) => {
        this.setState({ delivery });

        fetch('http://localhost:8000/api/drivers.php')
          .then(results => results.json())
          .then((driverData) => {
            const drivers = Object.keys(driverData).map(key => (
              <option key={key} value={key}>{driverData[key].name}</option>
            ));
            this.setState({ drivers });
          });
      });
  }

  handleChange(event) {
    const { target } = event;
    const { value, name } = target;
    const { delivery } = this.state;

    delivery[name] = value;
    this.setState({ delivery });
  }

  handleSubmit(event) {
    event.preventDefault();

    const formData = this.state.delivery;
    const deliveryId = this.props.location.pathname.split('/')[2];

    fetch(`http://localhost:8000/api/deliveries.php?id=${deliveryId}`, {
      method: 'PUT',
      body: JSON.stringify(formData),
    }).then((response) => {
      if (response.status === 200) {
        this.props.history.push('/');
      } else {
        response.json().then((json) => {
          this.setState({ errors: json.errors });
        });
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  render() {
    return (
      <section id="create">
        <h1>Edit Delivery</h1>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup row>
            <Label for="deliveryDate" sm={2}>Date</Label>
            <Col sm={10}>
              <Input type="date" name="date" id="deliveryDate" disabled value={this.state.delivery.date} />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="deliveryName" sm={2}>Name</Label>
            <Col sm={10}>
              <Input type="text" name="name" id="deliveryName" disabled value={this.state.delivery.name} />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="deliveryDriver" sm={2}>Driver</Label>
            <Col sm={10}>
              <Input type="select" name="driver_id" id="deliveryDriver" className={this.state.errors.driver_id ? 'is-invalid' : ''} value={this.state.delivery.driver_id} onChange={this.handleChange} >
                { this.state.drivers }
              </Input>
              <FormFeedback>{this.state.errors.driver_id}</FormFeedback>
            </Col>
          </FormGroup>
          <Button color="primary">Update</Button>
        </Form>
      </section>
    );
  }
}
