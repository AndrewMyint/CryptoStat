import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoApiHeaders = {
  "x-rapidapi-host": process.env.REACT_APP_CRYPTO_RAPIDAPI_HOST,
  "x-access-token": process.env.REACT_APP_COINRANKING_API_V2,
};

const createRequest = (url) => ({ url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({
    //baseUrl: process.env.REACT_APP_COINRANKING_URL_V2,
    baseUrl: `${process.env.REACT_APP_PROXY_URL}${process.env.REACT_APP_COINRANKING_URL_V2}`,
  }),
  endpoints: (builder) => ({
    getGlobalStats: builder.query({
      query: () => createRequest(`/stats`),
    }),
    getCryptos: builder.query({
      query: (count) => createRequest(`/coins?limit=${count}`),
    }),
    getExchanges: builder.query({
      query: () => createRequest("/exchanges"),
    }),
    getExchange: builder.query({
      query: (exchangeId) => createRequest(`/exchange/${exchangeId}`),
    }),
    getCryptoDetails: builder.query({
      query: (coinId) => createRequest(`/coin/${coinId}`),
    }),
    getCryptoHistory: builder.query({
      query: ({ coinId, time }) =>
        createRequest(`coin/${coinId}/history?timePeriod=${time}&referenceCurrencyUuid=yhjMzLPhuIDl
        `),
    }),
  }),
});

export const {
  useGetGlobalStatsQuery,
  useGetCryptosQuery,
  useGetCryptoDetailsQuery,
  useGetExchangesQuery,
  useGetExchangeQuery,
  useGetCryptoHistoryQuery,
} = cryptoApi;
