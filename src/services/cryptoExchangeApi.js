import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoExchangeHeaders = {
  "X-RapidAPI-Key": process.env.REACT_APP_COINGECKO_API,
  "X-RapidAPI-Host": process.env.REACT_APP_COINGECKO_RAPIDAPI_HOST ,
};

const createRequestForExchanges = (url) => ({
  url,
  headers: cryptoExchangeHeaders,
});

export const cryptoExchangeApi = createApi({
  reducerPath: "cryptoExchangeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_COINGECKO_URL,
    // baseUrl: `${process.env.REACT_APP_PROXY_URL}${process.env.REACT_APP_COINRANKING_URL_V2}`,
  }),
  endpoints: (builder) => ({
    getExchanges: builder.query({
      query: () => createRequestForExchanges("/exchanges"),
    }),
    getExchange: builder.query({
      query: (exchangeId) =>
        createRequestForExchanges(`/exchanges/${exchangeId}`),
    }),
  }),
});

export const { useGetExchangesQuery, useGetExchangeQuery, useLazyGetExchangeQuery } = cryptoExchangeApi;
