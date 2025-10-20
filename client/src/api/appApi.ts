import { createApi } from "@reduxjs/toolkit/query/react";
import { basequery } from "../utils/baseQuery";


export const appApi = createApi({
    reducerPath: "appApi",
    baseQuery: basequery,
    endpoints: (builder) => ({

        getHome: builder.query({
            query: () => "/home",
        }),
        
        shortenUrl: builder.mutation({
            query: (url) => ({
                url: "/shorten",
                method: "POST",
                body: url,
            }),
        }),



    })

    

})

export const { 
    useGetHomeQuery,
    useShortenUrlMutation
} = appApi;


