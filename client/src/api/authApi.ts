import { createApi } from "@reduxjs/toolkit/query/react";
import { basequery } from "../utils/baseQuery";


export const appApi = createApi({
    reducerPath: "authApi",
    baseQuery: basequery,
    endpoints: (builder) => ({
        validateUser: builder.query({
            query: () => "/auth/validate",
            
        })
    })

    

})

export const { useValidateUserQuery } = appApi;


