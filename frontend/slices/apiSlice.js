import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../src/constants";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),

  tagTypes: ["Products", "Order", "User"], // used to define the types of data that we will be fetching from the API

  endpoints: (builder) => ({})
});
