import React, { Component } from 'react';
import { withRouter, ReactDOM } from 'react-router-dom';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';


class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            country: 'Australia',
            incomeY: '2020 - 2021',
            income: '0'
        };
        this.CountryChange = this.CountryChange.bind(this);
        this.IncomeYChange = this.IncomeYChange.bind(this);
        this.IncomeChange = this.IncomeChange.bind(this);
    }

    //When submit the form, localStorage will check every data is new and redirect to TaxResults
    onSubmitHandler = e => {
        localStorage.setItem('country', this.state.country);
        localStorage.setItem('incomeY', this.state.incomeY);
        localStorage.setItem('income', this.state.income);
        e.preventDefault();

        var path = {
            pathname: '/TaxResults'
        };

        this.props.history.push(path);
    };

    //onChangeEvent and it will modify country's value.
    CountryChange(event) {
        this.setState({ country: event.target.value });
    }

    //onChangeEvent and it will modify IncomeYear's value.
    IncomeYChange(event) {
        localStorage.setItem('country', this.state.country);
        this.setState({ incomeY: event.target.value });
    }

    //onChangeEvent and it will modify Income's value.
    IncomeChange(event) {
        localStorage.setItem('incomeY', this.state.incomeY);
        this.setState({ income: event.target.value });
    }
    render() {
        return ( 
            <div class="card">
             
              
            <div class="CardLeft">
              <div class="Heading">
                <p>Tax Calc</p>
                </div>
          <div class="Sub-Heading">
            <p>The free and simple online tax calculator. </p>
          </div>
          <div class="tednology" />
          <div class="Planetoid" />
        </div>
        <div class="InfoBox">
          <form>
            <p class="Heading2"> Calculate your tax </p>
            <div class="info">
              <div class="InfoI">
              <div class="InfoText"><InfoOutlinedIcon style={{width: '16px', height:'16px'}}></InfoOutlinedIcon>&nbsp;&nbsp;&nbsp; Fields marked with * are mandatory </div></div>　
            </div>
            <div class="FormTitleText">Select your country of residence *</div>
            <select class="FormInputs" onChange={this.CountryChange}>
              <option value="Australia" SELECTED>
                Australia
              </option>
              
            </select>
            <div class="FormTitleText"> Select an income year * </div>
            <select class="FormInputs" onChange={this.IncomeYChange}>
              <option value="1" SELECTED>
                2020 - 2021
              </option>
              <option value="2019 - 2020"> 2019 - 2020 </option>
             
            </select>
            <div class="FormTitleText">
              Enter your total income for the income year *
            </div>
            <div class="DollarSign">$</div>
            <div class="FloatNumber">.00</div>
            <input
              onChange={this.IncomeChange}
              class="FormDollar"
              type="number"
              placeholder="Amount"
              required
              name="price"
              title="Currency"
              pattern="^\d+(?:\.\d{1,2})?$"
            />
            <button
              class="FormButton"
              type="submit"
              onClick={this.onSubmitHandler}
            >
              Calculate
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(MainPage);