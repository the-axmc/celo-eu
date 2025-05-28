'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Layout from '../components/Layout';

import {
  DynamicContextProvider,
  DynamicWidget,
} from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";

const queryClient = new QueryClient();

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <DynamicContextProvider
        settings={{
          environmentId: "3b3b560c-1755-446b-9353-2205f31a2498",
          walletConnectors: [EthereumWalletConnectors],
        }}
      >
        <Layout>
          {children}
          <DynamicWidget />
        </Layout>
      </DynamicContextProvider>
    </QueryClientProvider>
  );
}
