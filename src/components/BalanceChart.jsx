import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { AreaChart, XAxis, YAxis, Tooltip, Area, CartesianGrid } from 'recharts';

// actions
import { getEthBalances } from 'actions/balance-actions';

const propTypes = {
}

const defaultProps = {
}

class BalanceChart extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // this.props.getAccounts();
    this.props.getEthBalances();
  }

  render() {
    return (
      <div>
        <h3>
          Your account balance over last 30 days
        </h3>
        <AreaChart width={1000} height={450} data={this.props.data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="date" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area type="monotone" dataKey="balance" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
        </AreaChart>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.balances.balanceByDays
})

const mapDispatchToProps = (dispatch) => ({
  // getAccounts: () => { dispatch(getAccounts()) },
  getEthBalances: () => { dispatch(getEthBalances()) }
})

BalanceChart.propTypes = propTypes;
BalanceChart.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(BalanceChart)
