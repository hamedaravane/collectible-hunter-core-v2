import axios from "axios";

export default class TzktApi {
    private readonly tzktApi: string = 'https://api.tzkt.io';

    async getTokensInformation(token) {
        const response = await axios.get(`${this.tzktApi}/v1/tokens?tokenId=${token.token_id}&contract=${token.fa_contract}`);
        return response.data;
    }

    async getTokensTransfers(tokenId) {
        const response = await axios.get(`${this.tzktApi}/v1/tokens/transfers?token.id=${tokenId}`);
    }
}