import ObjktApi from "./api/objkt";
import TzktApi from "./api/tzkt";

class Main {
    private readonly objktApi: ObjktApi = new ObjktApi();
    private readonly tzktApi: TzktApi = new TzktApi();

    async init() {

        const tokens = await this.objktApi.getRecentlyPurchasedTokens();

        for (const token of tokens) {
            console.log(await this.tzktApi.getTokensInformation(token))
        }
    }
}

const main: Main = new Main();

main.init().then(() => console.log('App executed'));