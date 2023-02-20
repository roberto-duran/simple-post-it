'use client'

import { QueryClient, QueryClientProvider} from "react-query";
import React from "react";
import {Toaster} from "react-hot-toast";
interface Props {
    children?: React.ReactNode
}

const queryClient = new QueryClient();

const QueryWrapper = ({children}: Props) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <Toaster />
        </QueryClientProvider>
    );
}

export default QueryWrapper;
