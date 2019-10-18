My approach to the test was to first understand the RPCs available and identify the necessary calls to be used.

In my first attempt i managed to identify block numbers for each of the days going back 30 days and use the block number to fetch the account balance for a given address.
This approach blocked the update to the redux store untill all the calls returned.

Second attempt was to use RxJS to stream each retrieval of balance and update the store. This way the chart receives the time series data as and when it becomes available.

The ETHUSD rate is retrieved early on when the app loads and used by the JSX(view layer). I took this approach with a view that showing USD equivalent was presentation logic. If this data had to be shared or persisted it could have been udpated in the reducer itself.

Couldn't get to adding the accounts because of time, but it can be easily done by storing the account balances for unique account address instead of overwriting and adding it up in the UI or in the reducer.

Finally on optimisation.
With my limited knowledge of web3.js and ethereum/blockchain I can suggest that the blocks retrieved for each historic dates can be cached and used for retrieval of balances instead of calculating the block number each time.

I have used Infura endpoint -> mainnet.infura.io/v3/22e9c4b465ff4940b60f556820d180fa
I might have overshot the budget, if you find trouble replace the endpoint with the one below created today.
ropsten.infura.io/v3/9e3a3d1e9e2c498d914c5a2ffb1680e9


To find the block closest to the time, upon finding it takes roughly 15 seconds to create one ethereum block, i make jumps proportional to the difference in current retrieved block timestamp and target time. Code is below. I didn't upload this code because i was getting 'cannot access archive state'. 

```
    while(true) {
      const block = await web3.eth.getBlock(blockNumber);
      const unixTime = Math.floor(date.getTime()/1000);
      if(block.timestamp <= unixTime) {
        let balance = await web3.eth.getBalance(address, blockNumber);
        console.log("Block number", blockNumber)
        console.log("balance", balance)
        balance = web3.utils.fromWei(balance);
        subscriber.next({ts: block.timestamp, date: moment(date).format("MMM DD"), balance}); // emit the data
        if(i<pastNoOfDays) {
          ++i;
          date.setDate(date.getDate()-1);
        } else {
          subscriber.complete();
          break;
        }
      };
      const jumps = Math.floor(Math.abs(block.timestamp - unixTime)/15);
      blockNumber -= (jumps > 0 ? jumps : 5);
    }
```

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
