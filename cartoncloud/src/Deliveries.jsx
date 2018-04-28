import React from 'react';
import { Table } from 'reactstrap';
import { Link } from 'react-router-dom';

export default class Deliveries extends React.Component {
  constructor() {
    super();

    this.state = {
      deliveries: [],
      drivers: [],
    };
  }

  componentDidMount() {
    fetch('http://localhost:8000/api/drivers.php')
      .then(results => results.json())
      .then((data) => {
        this.setState({ drivers: data });
        fetch('http://localhost:8000/api/deliveries.php')
          .then(results => results.json())
          .then((deliveryData) => {
            const { drivers } = this.state;
            const deliveries = Object.keys(deliveryData).map((key) => {
              return (
                <tr key={key}>
                  <th scope="row">{key}</th>
                  <td>{deliveryData[key].date}</td>
                  <td>{deliveryData[key].name}</td>
                  <td>{drivers[deliveryData[key].driver_id].name}</td>
                  <td className="text-right delivery-options">
                    <a href={`/update/${key}`} className="btn btn-outline-primary" color="primary">Edit</a>
                    <a href={`/delete/${key}`} className="btn btn-outline-danger" color="danger">Delete</a>
                  </td>
                </tr>
              );
            });
            this.setState({ deliveries });
          });
      });
  }

  render() {
    return (
      <section id="deliveries">
        <h1>Deliveries</h1>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>Name</th>
              <th>Driver</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {this.state.deliveries}
          </tbody>
        </Table>
      </section>
    );
  }
}
