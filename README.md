# Testing environment form Decentralchain
### How to ?

Import package and write typescript/javascript code, interacting with Decentralchain blockchain. Package contains all global type definitions.
#### Example using mocha test runner
```typescript
import '@decentralchain/js-test-env';

env.API_BASE = "http://localhost:6869/";
env.CHAIN_ID = "R";
env.SEED = "Decentralchain private node seed with DCC tokens";

describe('My first test suite', () => {
    const wvs = 10 ** 8;
    before(async function () {
        this.timeout(0);
        await setupAccounts({foo: 0.001 * wvs, bar: 0.001 * wvs});
    });

    it('Assertions', async function () {
        const ttx = transfer({amount: 100000000000000, recipient: address()}, accounts.foo)
        expect(ttx.proofs.length).to.equal(1)
        await expect(broadcast(ttx)).rejectedWith()
    })
    // And define tests inside suites
    // As you can see, we can use async functions to write async tests. sync functions have default timeout = 20s
    it('Aks balance and height', async function () {
        // You can set timeout. If you set it to zero, test won't finish untill function resolves
        this.timeout(0);
        // You can ask balance or currentHeigh
        const b = await balance();
        const h = await currentHeight();
        // Console methods avalilable in test. Everything will be printed in repl
        console.log(b, h)
    })

    it('Assertions', async function () {
        const ttx = transfer({amount: 100000000000000, recipient: address()}, accounts.foo)
        // Synchronous assertion
        expect(ttx.proofs.length).to.equal(1)
        // Async assertion. Expect broadcast to fail
        await expect(broadcast(ttx)).rejectedWith()
    })
})

```

### [Here](https://github.com/Decentral-America/js-test-env/globals.html) you can find list of all globally available functions for ride test environment and REPL 

Keep in mind that by default, if not passed, `chainId`, `seed` and `nodeUrl` are taken from your test env configuration file (or Web IDE settings) 
