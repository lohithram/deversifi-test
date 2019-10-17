import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { AreaChart, XAxis, YAxis, Tooltip, Area, CartesianGrid } from 'recharts';

// actions
import { getETHUSDRate } from 'actions/rate-actions';
import { getEthBalances } from 'actions/balance-actions';

const propTypes = {
}

const defaultProps = {
}

class BalanceChart extends React.Component {
  constructor(props) {
    super(props);
    this.addressInput = React.createRef();
    this.onClick = this.onAddressAdd.bind(this);
  }

  componentDidMount() {
    this.props.getETHUSDRate();
    // this.props.getEthBalances();
  }

  onAddressAdd(event) {
    event.preventDefault();
    // offcourse you can employ controlled component or use redux form
    const {value} = this.addressInput.current;
    console.log("Address supplied", value);
    this.props.getEthBalances(value);
  }

  render() {
    const {address} = this.props;
    return (
      <div className="chart">
        <p>
          Account address
          <input ref={this.addressInput}
                  type="text"
                  className=""
                  id="addressInput"
                  placeholder="0x89sdsdksld">
          </input>
          <button className="btn btn-primary btn-sm"
                  onClick={this.onClick}>
            Get balances
          </button>
        </p>
        { address &&
          <h3>
            {`Your account balance for ${address} over last 30 days`}
          </h3>
        }
        <AreaChart width={1000} height={450} data={this.props.data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="date" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area type="monotone" dataKey="balance" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
          <Area type="monotone" dataKey="ETHUSD" stroke="#8877d8" fillOpacity={1} fill="url(#colorPv)" />
        </AreaChart>
      </div>
    );
  }
}

const applyETHUSDConversion = (data, rate) =>
  data.map(({date, balance}) => ({
    date,
    balance,
    ETHUSD: rate ? `${balance*rate}` : ""
  }))

const mapStateToProps = (state) => ({
  address: state.balances.address,
  rates: state.rates.rates,
  data: applyETHUSDConversion(state.balances.balanceByDays, state.rates.rates.ETHUSD)
})

const mapDispatchToProps = (dispatch) => ({
  getETHUSDRate: () => { dispatch(getETHUSDRate()) },
  getEthBalances: (value) => { dispatch(getEthBalances(value)) }
})

BalanceChart.propTypes = propTypes;
BalanceChart.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(BalanceChart)
