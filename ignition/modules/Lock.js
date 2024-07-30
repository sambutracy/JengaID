const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
module.exports = buildModule("jengaID", (m) => {
  const jengaID = m.contract("jengaID");
  return { jengaID };
});
