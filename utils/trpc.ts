// import { httpBatchLink } from '@trpc/client';
// import { createTRPCNext } from '@trpc/next';
// import type { AppRouter } from '@/backend/routers/root';
// import superjson from "superjson";
// import { getAccessToken } from '@/lib/authorization';
// function getBaseUrl() {
//   if (typeof window !== 'undefined')
//     // browser should use relative path
//     return '';
//   if (process.env.VERCEL_URL)
//     // reference for vercel.com
//     return `https://${process.env.VERCEL_URL}`;
//   if (process.env.RENDER_INTERNAL_HOSTNAME)
//     // reference for render.com
//     return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`;
//   // assume localhost
//   return `http://localhost:${process.env.PORT ?? 3000}`;
// }
// export const trpc = createTRPCNext<AppRouter>({
//   config({ctx}) {
//     return {
//       queryClientConfig: {
//         defaultOptions: {
//           queries: {
//             refetchOnWindowFocus: false,
//             cacheTime: Infinity,
//             staleTime: Infinity,
//           },
//         },
//       },
//       links: [
//         httpBatchLink({
//           /**
//            * If you want to use SSR, you need to use the server's full URL
//            * @link https://trpc.io/docs/ssr
//            **/
//           url: `${getBaseUrl()}/api/trpc`,
//           // You can pass any HTTP headers you wish here
//           async headers() {
//             return {
//               authorization:'Bearer '+getAccessToken(),
//               // authorization: getAuthCookie(),
//             };
//           },
//         }),
//       ],
//       transformer: superjson,
//     };
//   },
//   /**
//    * @link https://trpc.io/docs/ssr
//    **/
//   ssr: false,
// });

import { AppRouter } from "@/backend/routers/root";
import { createTRPCReact } from "@trpc/react-query";

export const trpc = createTRPCReact<AppRouter>();