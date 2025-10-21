import { createApi } from "@reduxjs/toolkit/query/react";
import { basequery } from "../utils/baseQuery";


export const appApi = createApi({
    reducerPath: "appApi",
    baseQuery: basequery,
    tagTypes: ["Urls", "List"],
    endpoints: (builder) => ({

        getHome: builder.query({
            query: () => ({
                url: "/home",
                method: "GET",
            }),
            providesTags: ["Urls"],
        }),

        shortenUrl: builder.mutation({
            query: (url) => ({
                url: "/shorten",
                method: "POST",
                body: url,
            }),
            invalidatesTags: ["Urls"],
        }),

        getDashboard: builder.query({
            query: () => ({
                url: "/dashboard",
                method: "GET",
            }),
            providesTags: ["Urls"],
        }),

        getMyLinks: builder.query({
            query: () => ({
                url: "/my-links",
                method: "GET",
            }),
            providesTags: ["List"],
        }),

        editLink: builder.mutation({
            query: (data) => ({
                url: `/my-links/${data._id}`,
                method: "PATCH",
                body: {
                    title: data.title,
                    shortCode: data.shortCode
                },
            }),
            invalidatesTags: ["List"],
        }),

        deleteLink: builder.mutation({
            query: (id) => ({
                url: `/my-links/${id}/delete`,
                method: "DELETE",
            }),
            invalidatesTags: ["List"],
        }),

        hideLink: builder.mutation({
            query: (id) => ({
                url: `/my-links/${id}/toggle-visibility`,
                method: "PATCH",
            }),
            invalidatesTags: ["List"],
        }),

        resolveUrl: builder.query({
            query: (id) => ({
                url: `/${id}`,
                method: "GET",
            }),
        })
    })
})

export const {
    useGetHomeQuery,
    useShortenUrlMutation,
    useGetDashboardQuery,
    useGetMyLinksQuery,
    useEditLinkMutation,
    useDeleteLinkMutation,
    useHideLinkMutation,
    useResolveUrlQuery
} = appApi;


