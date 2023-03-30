import {SortDirection, MarketplaceEventType} from "../model/variables"
import axios, {AxiosRequestConfig} from "axios";

export default class ObjktApi {
    private readonly objktUrl: string = 'https://data.objkt.com/v3/graphql';
    private readonly config: AxiosRequestConfig = {
        headers: {
            "Content-Type": 'application/json',
            "Accept": '*',
        }
    };

    async getRecentlyPurchasedTokens() {
        const query = `
          query GetTokens($limit: Int!, $order_by: [event_order_by!], $where: event_bool_exp!) {
          event(
            order_by: $order_by
            limit: $limit
            where: $where
            ) {
            fa_contract
            token {
              token_id
            }
          }
        }`;

        const variables = {
            limit: 120,
            order_by: [
                { id: SortDirection.DESCENDING },
                { timestamp: SortDirection.DESCENDING },
            ],
            where: { marketplace_event_type: { _eq: MarketplaceEventType.LIST_BUY } },
        };

        const response = await axios.post(this.objktUrl, {query, variables}, this.config);
        const token = response.data.data.event;

        const result = token.map(item => {
            return { fa_contract: item.fa_contract, token_id: item.token.token_id };
        }).filter((item, index, array) => {
            return index === array.findIndex(obj => {
                return JSON.stringify(obj) === JSON.stringify(item);
            });
        });

        console.log(result);
        return result;
    }
}