import Web3 from 'web3';

const web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/22e9c4b465ff4940b60f556820d180fa"));
// const web3 = new Web3(new Web3.providers.HttpProvider("http://rpc.ethapi.org:8545"));
// const web3 =  new Web3(Web3.givenProvider || "ws://localhost:8546");
// web3.eth.getBlock("latest", (error, result) => {
//   console.log('error:', error);
//   console.log('results', result);
// });

export const getEthBalanceService = () => (
  new Promise((resolve, reject) => {
    web3.eth.getBlock("latest", (error, result) => {
      console.log('error:', error);
      console.log('results', result);
      if(error)
        reject(error);
      if(result)
        resolve(result);
    });
  })
)

export const getAccountsService = (address = "0x407d73d8a49eeb85d32cf465507dd71d507100c1") => (
  web3.eth.getBalance(address)
)

export const getHistoricalAccountsService = async (address = "0x407d73d8a49eeb85d32cf465507dd71d507100c1") => {

  const balanceByDays = [];
  const blocksByDays = await retrieveBlocks();

  for(var i=0; i<blocksByDays.length; ++i) {
    const balance = await web3.eth.getBalance(address, blocksByDays[i].blockNumber);
    balanceByDays.push({date: blocksByDays[i].date, balance});
  }
  return balanceByDays;
}



// calculate blocks to be used for the past 30 days
// array of shape [{date: "Tue Oct 15 2019", blockNumber: 64038}]
const retrieveBlocks = async (pastNoOfDays = 30) => {
  var i = 0;
  var date = new Date();
  date.setDate(date.getDate()-pastNoOfDays); // go back 30 days
  const blocksByDate = []; // return value

  let blockNumber = await web3.eth.getBlockNumber();
  console.log("Latest block", blockNumber);

  while(true) {
    const block = await web3.eth.getBlock(blockNumber);
    if(block.timestamp < date.getTime()) {
      blocksByDate.push({date: date.toDateString(), blockNumber})
      if(i<pastNoOfDays) {
        ++i;
        date.setDate(date.getDate()+1);
      } else {
        console.log("Blocks", blocksByDate);
        break;
      }
    };
    --blockNumber;
  }

  return blocksByDate;
}
