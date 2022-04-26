const augment = require('./augment').default;
let globalObj;
try {
    globalObj = Function('return this')();
} catch (e) {
    globalObj = window;
}
augment(globalObj);
globalObj.env = {
    API_BASE: 'https://testnet-node.decentralchain.io',
    SEED: 'default seed',
    CHAIN_ID: '!',
    timeout: 20000
};
