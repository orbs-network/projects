const BigNumber = require("bignumber.js");
const ABIs = require("./abis.json");

class LowHealth {

  static displayName = "Low Health";
  static description = "Get notified when health factor is getting low (below 1.1)";

  async onInit(args) {
    this.contract = new args.web3.eth.Contract(
      ABIs.lendingPool,
      "0x10BF9BCFb4fbef40774a8C61ac70b2ab94dd2426"
    );
  }

  async onBlocks(args) {
    const position = await this.contract.methods.getUserAccountData(args.address).call();
    if (new BigNumber(position.healthFactor).dividedBy("1e18").toNumber() < 1.1) return {
      notification: "Health factor dropped below 1.1"
    };
    return {
      notification: "health is " + new BigNumber(position.healthFactor).dividedBy("1e18").toNumber()
    }
  }

}

module.exports = LowHealth;