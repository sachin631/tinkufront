"use client";
// import React from 'react';
// import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

// const QueryProvider = ({children}:any) => {
//     const queryClient = new QueryClient()
//   return (
//     <div>
//          <QueryClientProvider client={queryClient}>
//         {children}
//         </QueryClientProvider>
//     </div>
//   )
// }

// export default QueryProvider;

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const QueryProvider = ({ children }: any) => {
  const queryClient = new QueryClient();
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  );
};

export default QueryProvider;
