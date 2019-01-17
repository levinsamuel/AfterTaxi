import React from 'react';
import {Table, Row} from 'reactstrap';

class Result extends React.Component {

  render () {

    const ests = this.props.estimates;

    if (ests) {

      const mapEstimates = ests.map(est => {
        const ogCost = (est.estimated_cost_cents_max / 100).toFixed(2)
        const disc = (est.estimated_cost_cents_max * 3 / 400).toFixed(2)
        return (
          <tr>
            <th>{est.display_name}</th>
            <td>{`$${ogCost}`}</td>
            <td>{`$${disc}`}</td>
          </tr>
        )
      });

      return (
        <div className="results">
          <Row>
            <h3>Your Discounts</h3>
            <Table striped style={{textAlign: 'left'}}>
              <thead>
                <tr>
                  <th>Service</th>
                  <th>Original Price Estimate</th>
                  <th>AfterTaxi Discounted Price</th>
                </tr>
              </thead>
              <tbody>
                {mapEstimates}
              </tbody>
            </Table>
          </Row>
        </div>
      )
    } else {
      return (
        <div></div>
      )
    }
  }
}

export default Result;
