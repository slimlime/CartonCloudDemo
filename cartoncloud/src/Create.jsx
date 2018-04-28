import React from 'react';
import { Button, Form, FormGroup, Label, Input, Col, FormFeedback } from 'reactstrap';

export default class Create extends React.Component {
  constructor() {
    super();

    this.state = {
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
    fetch('http://localhost:8000/api/drivers.php')
      .then(results => results.json())
      .then((driverData) => {
        const drivers = Object.keys(driverData).map((key, driver) => {
          return (
            <option key={key} value={key}>{driverData[key].name}</option>
          );
        });
        this.setState({ drivers });
      });
  }

  handleChange(event) {
    const { target } = event;
    const { value, name } = target;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const formData = this.state;

    fetch('http://localhost:8000/api/deliveries.php', {
      method: 'POST',
      body: JSON.stringify(formData),
    }).then((response) => {
      if (response.status === 201) {
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
        <h1>Create Delivery</h1>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup row>
            <Label for="deliveryDate" sm={2}>Date</Label>
            <Col sm={10}>
              <Input type="date" name="date" id="deliveryDate" className={this.state.errors.date ? 'is-invalid' : ''} onChange={this.handleChange} />
              <FormFeedback>{this.state.errors.date}</FormFeedback>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="deliveryName" sm={2}>Name</Label>
            <Col sm={10}>
              <Input type="text" name="name" id="deliveryName" className={this.state.errors.name ? 'is-invalid' : ''} onChange={this.handleChange} />
              <FormFeedback>{this.state.errors.name}</FormFeedback>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="deliveryDriver" sm={2}>Driver</Label>
            <Col sm={10}>
              <Input type="select" name="driver_id" id="deliveryDriver" className={this.state.errors.driver_id ? 'is-invalid' : ''} onChange={this.handleChange} >
                <option value="">- Select One -</option>
                { this.state.drivers }
              </Input>
              <FormFeedback>{this.state.errors.driver_id}</FormFeedback>
            </Col>
          </FormGroup>
          <Button color="primary">Create</Button>
        </Form>
      </section>
    );
  }
}