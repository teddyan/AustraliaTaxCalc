import React, { Component } from 'react';

class TaxResults extends Component {
  constructor(props) {
    super(props);

    this.state = {
      country: localStorage.getItem('country'),
      incomeY: localStorage.getItem('incomeY'),
      income: this.separatorNum(localStorage.getItem('income')),
      estimatedTaxableIncome: '0',
      taxGroup1: '$0',
      taxGroup2: '$0',
      taxGroup3: '$0',
      taxGroup4: '$0',
      taxGroup5: '$0'
    };
  }
  //Clear the LocalStorage data when you press Go back to previous page.
  GoBackToPreviousPage = e => {
    localStorage.clear();
    e.preventDefault();
    var path = {
      pathname: '/'
    };

    this.props.history.push(path);
  };

  //split the number every three digits.
  separatorNum(num) {
    var n = num.toString().split('.');
    n[0] = n[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return n.join('.');
  }

  //remove the eventlistener
  componentWillMount() {
    window.removeEventListener('popstate', this.GoBackToPreviousPage, false);
  }

  //Eventlistener if users use the browser's button to go back.
  componentDidMount() {
    if (window.history && window.history.pushState) {
      window.addEventListener('popstate', this.GoBackToPreviousPage, false);
    }

    //Calculate the taxable income
    var amount = localStorage.getItem('income');

    if (amount >= 180000) {
      this.setState({
        taxGroup1: '$0',
        taxGroup2: '$5,092',
        taxGroup3: '$29,467',
        taxGroup4: '$51,667',
        taxGroup5:
          '$' +
          this.separatorNum(parseFloat((amount - 180000) * 0.45).toFixed(0)),
        estimatedTaxableIncome: this.separatorNum(
          parseFloat((amount - 180000) * 0.45 + 51667 + 29467 + 5092).toFixed(0)
        )
      });
    }
    if (amount >= 120001 && amount <= 180000) {
      this.setState({
        taxGroup1: '$0',
        taxGroup2: '$5,092',
        taxGroup3: '$29,467',
        taxGroup4:
          '$' +
          this.separatorNum(parseFloat((amount - 120000) * 0.37).toFixed(0)),
        taxGroup5: '$0',
        estimatedTaxableIncome: this.separatorNum(
          parseFloat((amount - 120000) * 0.37 + 29467 + 5092).toFixed(0)
        )
      });
    }
    if (amount >= 45000 && amount <= 120000) {
      this.setState({
        taxGroup1: '$0',
        taxGroup2: '$5,092',
        taxGroup3:
          '$' +
          this.separatorNum(parseFloat((amount - 45000) * 0.325).toFixed(0)),
        taxGroup4: '$0',
        taxGroup5: '$0',
        estimatedTaxableIncome: this.separatorNum(
          parseFloat((amount - 45000) * 0.325 + 5092).toFixed(0)
        )
      });
    }
    if (amount >= 18200 && amount <= 45000) {
      this.setState({
        taxGroup1: '$0',
        taxGroup2:
          '$' +
          this.separatorNum(parseFloat((amount - 18200) * 0.19).toFixed(0)),
        taxGroup3: '$0',
        taxGroup4: '$0',
        taxGroup5: '$0',
        estimatedTaxableIncome: this.separatorNum(
          parseFloat((amount - 18200) * 0.19).toFixed(0)
        )
      });
    }
    if (amount <= 18200) {
      this.setState({
        taxGroup1: '$0',
        taxGroup2: '$0',
        taxGroup3: '$0',
        taxGroup4: '$0',
        taxGroup5: '$0',
        estimatedTaxableIncome: '0'
      });
    }
  }
  render() {
    return (
      <div class="card">
        <div class="ResultBox">
          <p class="Heading2"> Your tax results </p>
          <div class="FormTitleText">Select your country of residence *</div>
          <select class="FormFilled" disabled="disabled">
            <option> {this.state.country} </option>
          </select>
          <div class="FormTitleText"> Select an income year * </div>
          <select class="FormFilled" disabled="disabled">
            <option> {this.state.incomeY} </option>
          </select>
          <div class="FormTitleText">
            Enter your total income for the income year *
          </div>
          <div class="DollarSignR"> $ </div>
          <div class="FloatNumberR"> .00 </div>
          <input
            class="FormDollarFilled"
            readonly="readonly"
            value={this.state.income}
            name="income"
            disabled="disabled"
          />
          <p class="GoBackPScreen">
            <a herf="/" onClick={this.GoBackToPreviousPage}>
              Go back to previous screen
            </a>
          </p>
        </div>
        <div class="CardRight">
          <div class="Heading" />
          <div class="Sub-Heading" />
          <div class="moon" />
          <div class="Planetoid" />
          <div class="Results">
            <div class="TaxableIncome">
              <p> Your estimated taxable income is: </p>
              <div>
                <p>
                  $ {this.state.estimatedTaxableIncome}
                  .00
                </p>
              </div>
            </div>
            <div class="Breakdown">
              <p> Breakdown </p>
            </div>
            <div class="Brackets-1">
              <div class="Group"> {this.state.taxGroup1} </div>
              <div>
                Tax Brackets <br />
                $0 - $18, 200
              </div>
            </div>
            <div class="Brackets-2">
              <div class="Group"> {this.state.taxGroup2} </div>
              <div>
                Tax Brackets <br />
                $18, 201 - $45, 000
              </div>
            </div>
            <div class="Brackets-3">
              <div class="Group"> {this.state.taxGroup3} </div>
              <div>
                Tax Brackets <br />
                $45, 001 - $120,000
              </div>
            </div>
            <div class="Brackets-4">
              <div class="Group"> {this.state.taxGroup4} </div>
              <div>
                Tax Brackets <br />
                $120,001 - $180, 000
              </div>
            </div>
            <div class="Brackets-5">
              <div class="Group"> {this.state.taxGroup5} </div>
              <div>
                Tax Brackets <br />
                $180,000+
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TaxResults;
