"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink, getFetch, loggerLink } from "@trpc/client";
import { useState } from "react";
import superjson from "superjson";
import { trpc } from "./trpc";
import { getAccessToken } from "@/lib/authorization";
import { Provider } from "react-redux";
import { store } from "@/store/store";
function getBaseUrl() {
	if (typeof window !== "undefined")
		// browser should use relative path
		return "";
	if (process.env.VERCEL_URL)
		// reference for vercel.com
		return `https://${process.env.VERCEL_URL}`;
	if (process.env.RENDER_INTERNAL_HOSTNAME)
		// reference for render.com
		return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`;
	// assume localhost
	return `http://localhost:${process.env.PORT ?? 3000}`;
}
export const TrpcReduxProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: { queries: { staleTime: 5000 } },
			})
	);

	const [trpcClient] = useState(() =>
		trpc.createClient({
			links: [
				httpBatchLink({
					/**
					 * If you want to use SSR, you need to use the server's full URL
					 * @link https://trpc.io/docs/ssr
					 **/
					url: `${getBaseUrl()}/api/trpc`,
					// You can pass any HTTP headers you wish here
					async headers() {
						return {
							authorization: "Bearer " + getAccessToken(),
							// authorization: getAuthCookie(),
						};
					},
				}),
				loggerLink({
					enabled: () => true,
				}),
			],
			transformer: superjson,
		})
	);
	return (
		<trpc.Provider client={trpcClient} queryClient={queryClient}>
			<Provider store={store}>
				<QueryClientProvider client={queryClient}>
					{children}
					{/* <ReactQueryDevtools /> */}
				</QueryClientProvider>
			</Provider>
		</trpc.Provider>
	);
};
