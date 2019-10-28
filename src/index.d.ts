import {
    IAliasParams,
    IAliasTransaction,
    IBurnParams,
    IBurnTransaction,
    ICancelLeaseParams,
    ICancelLeaseTransaction,
    ICancelOrder,
    ICancelOrderParams,
    IDataParams,
    IDataTransaction,
    IInvokeScriptParams,
    IInvokeScriptTransaction,
    IIssueParams,
    IIssueTransaction,
    ILeaseParams,
    ILeaseTransaction,
    IMassTransferItem,
    IMassTransferParams,
    IMassTransferTransaction,
    IOrderParams,
    IReissueParams,
    IReissueTransaction,
    ISetAssetScriptParams,
    ISetAssetScriptTransaction,
    ISetScriptParams,
    ISetScriptTransaction,
    ISponsorshipParams,
    ISponsorshipTransaction,
    ITransferParams,
    ITransferTransaction,
    TOrder,
    TSeedTypes,
    TTx,
    TTxParams,
    WithId,
    WithTxType,
    INodeRequestOptions,
    IDataEntry, ITransaction
} from '@waves/waves-transactions';

///splice-start
declare global {

    export const env: {
        API_BASE: string,
        SEED: string,
        CHAIN_ID: string,
        accounts: Record<string, string>
    }
   ///splice-end
    /**
     * Contains seeds generated by setupAccounts function
     * E.g:
     * ```ts
     * await setupAccounts({foo:10, bar: 20})
     * console.log(accounts.foo, accounts.bar) // these variables now contain seeds from accounts with 10 and 20 wavelets
     * ```
     */
    export const accounts: Record<string, string>;


/// TRANSACTION CREATORS
    /**
     * Creates alias transaction or signs already formed one. Creates alias for address.
     * Alias could be used in place of address later
     */
    export function alias(params: IAliasParams, seed?: TSeedTypes): IAliasTransaction & WithId

    /**
     * Creates burn transaction or signs already formed one. Burn transaction destroys tokens. You cannot burn WAVES
     */
    export function burn(params: IBurnParams, seed?: TSeedTypes): IBurnTransaction & WithId

    /**
     * Creates cancel-lease transaction or signs already formed one
     */
    export function cancelLease(params: ICancelLeaseParams, seed?: TSeedTypes): ICancelLeaseTransaction & WithId

    /**
     * Creates cancel-order request or signs already formed one
     */
    export function cancelOrder(params: ICancelOrderParams, seed?: TSeedTypes): ICancelOrder

    /**
     * Creates data transaction or signs already formed one
     */
    export function data(params: IDataParams, seed?: TSeedTypes): IDataTransaction & WithId

    /**
     * Creates issue transaction or signs already formed one
     */
    export function issue(params: IIssueParams, seed?: TSeedTypes): IIssueTransaction & WithId

    /**
     * Creates reissue transaction or signs already formed one
     */
    export function reissue(params: IReissueParams, seed?: TSeedTypes): IReissueTransaction & WithId

    /**
     * Creates lease transaction or signs already formed one
     */
    export function lease(params: ILeaseParams, seed?: TSeedTypes): ILeaseTransaction & WithId

    /**
     * Creates mass-transfer transaction or signs already formed one
     */
    export function massTransfer(params: IMassTransferParams, seed?: TSeedTypes): IMassTransferTransaction & WithId

    /**
     * Creates order or signs already formed one
     */
    export function order(params: IOrderParams, seed?: TSeedTypes): TOrder & WithId

    /**
     * Creates transfer transaction or signs already formed one
     */
    export function transfer(params: ITransferParams, seed?: TSeedTypes): ITransferTransaction & WithId

    /**
     * Creates set-script transaction or signs already formed one
     */
    export function setScript(params: ISetScriptParams, seed?: TSeedTypes): ISetScriptTransaction & WithId

    /**
     * Creates set-asset-script transaction or signs already formed one
     */
    export function setAssetScript(params: ISetAssetScriptParams, seed?: TSeedTypes): ISetAssetScriptTransaction & WithId

    /**
     * Creates invoke-script transaction or signs already formed one
     */
    export function invokeScript(params: IInvokeScriptParams, seed?: TSeedTypes): IInvokeScriptTransaction & WithId

    /**
     * Creates sponsorship transaction or signs already formed one
     */
    export function sponsorship(params: ISponsorshipParams, seed?: TSeedTypes): ISponsorshipTransaction & WithId

    /**
     * Signs arbitrary transaction
     */
    export function signTx(params: TTx | (TTxParams & WithTxType), seed?: TSeedTypes): TTx


/// NODE INTERACTION
    /**
     * Resolves when specified txId is mined into the block
     * By default has 20s timeout and uses current environment node
     *
     * ### Usage
     * ```ts
     * const tx = .....
     * await broadcast(tx)
     * await waitForTx(tx.id)
     * ```
     */
    export function waitForTx(txId: string, options?: INodeRequestOptions): Promise<TTx>

    /**
     * Resolves N blocks after specified txId is mined into the block
     * By default has 20s timeout and uses current environment node
     */
    export function waitForTxWithNConfirmations(txId: string, confirmations: number, options?: INodeRequestOptions): Promise<TTx>

    /**
     * Resolves N blocks after current blockchain height
     * By default has 20s timeout and uses current environment node
     */
    export function waitNBlocks(blocksCount: number, options?: INodeRequestOptions): Promise<void>

    /**
     * Current blockchain height
     * By default has 20s timeout and uses current environment node
     */
    export function currentHeight(apiBase?: string): Promise<number>

    /**
     * Resolves after target height has been reached
     * By default has 20s timeout and uses current environment node
     */
    export function waitForHeight(target: number, options?: INodeRequestOptions): Promise<void>

    /**
     * Get transaction by Id. Returns null if no transaction with such id present in blockchain
     */
    export function transactionById(txId: string, apiBase?: string): Promise<ITransaction & WithId & {
        height: number;
    }>;

    /**
     * Get account effective balance
     * By default uses current environment address and node
     */
    export function balance(address?: string, apiBase?: string): Promise<number>

    /**
     * Retrieve information about specific asset account balance
     * By default uses current environment address and node
     */
    export function assetBalance(assetId: string, address?: string, apiBase?: string): Promise<any>

    /**
     * Retrieve full information about waves account balance. Effective, generating etc
     * By default uses current environment address and node
     */
    export function balanceDetails(address?: string, apiBase?: string): Promise<any>

    /**
     * Get full account dictionary
     * By default uses current environment address and node
     */
    export function accountData(address?: string, apiBase?: string): Promise<Record<string, IDataEntry>>

    /**
     * Get data from account dictionary by key
     * By default uses current environment address and node
     */
    export function accountDataByKey(key: string, address?: string, apiBase?: string): Promise<IDataEntry>

    /**
     * Get invokeScript tx state changes
     * By default uses current environment address and node
     */
    export function stateChanges(invokeScriptTxId: string, apiBase?: string): Promise<any>

    /**
     * Sends transaction to waves node
     * By default uses current environment address and node
     */
    export function broadcast(tx: TTx, apiBase?: string): Promise<any>


// UTILITY
    /**
     * Returns file content as string. Either from 'ride' folder or WEB IDE storage
     */
    export function file(name?: string): string

    /**
     * Shorthand for file()
     */
    export function contract(): Promise<string>

    /**
     * Generates key pair from seed
     * By default uses current environment seed
     */
    export function keyPair(seed?: string): { publicKey: string, privateKey: string }

    /**
     * Generates public key from seed
     * By default uses current environment seed
     */
    export function publicKey(seed?: string): string

    /**
     * Generates private key from seed
     * By default uses current environment seed
     */
    export function privateKey(seed?: string): string

    /**
     * Generates address
     * By default uses current environment seed and chainId
     */
    export function address(seed?: string, chainId?: string): string

    /**
     * Returns base64 representations of compiled ride file
     */
    export function compile(code: string): string

    /**
     * Signs arbitrary bytes
     * By default uses current environment seed and chainId
     */
    export function signBytes(bytes: Uint8Array, seed?: string): string


    export interface ISetupAccountsOptions {
        /**
         * Generated accounts have seed like 'name#' + nonce. E.g.: foo#ff4682. By default nonce is chosen randomly
         * you can set nonce to have consistent seeds between tests
         */
        nonce?: string,
        /**
         * Seed phrase for account, from which waves will be transferred to generated accounts.
         * If not set current account will be used
         */
        masterSeed?: string,
    }

    export interface IPayment {
        assetId?: string | null
        amount: number
    }

    export interface IPayment {
        assetId?: string | null
        amount: number
    }

    interface IInvokeArgument {
        /**
         * possible values:   "string" | "number" | "binary" | "boolean"
         */
        type: string,
        value: string | number | boolean
    }

    export interface IInvokeOptions {
        dApp: string
        functionName: string
        arguments?: (number | string | boolean | Uint8Array | number[] | IInvokeArgument)[]
        payment?: IPayment | IPayment[] | number
    }

    /**
     * Creates invoke tx and broadcasts it
     * */
    export function invoke(options: IInvokeOptions, seed?: string, apiBase?: string): Promise<any>;

    /**
     * Generates test accounts with balances. Sends waves to generated accounts from master seed. Saves account seeds `accounts`
     * E.g.: setupAccounts({foo:1000}). Now accounts['foo'] contains seed phrase for account and this account has
     * 1000 wavelets
     * By default uses current environment node and seed as masterSeed
     *
     * ### Usage
     * ```ts
     * const wvs = 10 ** 8
     * describe('some suite', () => {
     *     before(async ()) => {
     *         await setupAccounts({foo: 1 * wvs, bar: 2 * wvs})
     *     })
     *
     *     it('logs balances', async () => {
     *         console.log(await balance(address(accounts.foo)))
     *         console.log(await balance(address(accounts.bar)))
     *     })
     * })
     * ```
     */
    export function setupAccounts(balances: Record<string, number>, options?: ISetupAccountsOptions): Promise<Record<string, string>>

    /**
     * Shorthand for `chai.expect` [[chai]]
     */
    export function expect(target: any, message?: string): any

    /**
     * Waves-crypto library https://www.npmjs.com/package/@waves/waves-crypto
     * Available in global scope:
     * ```js
     * const addressBytes = crypto.base58Decode('3N77yhDrPTdLFjzNPZcBQPZLDg11EHAB7xF')
     * ```
     */
    export module wavesCrypto {

    }


    /**
     * Chai assertion library https://www.chaijs.com/
     * with chaiAsPromised plugin https://www.chaijs.com/plugins/chai-as-promised/
     *  * Available in global scope:
     * ```js
     * chai.expect(2 === 3).to.be.false
     * ```
     * You can always use shorthand for [[expect]]
     */
    export module chai {

    }
}
