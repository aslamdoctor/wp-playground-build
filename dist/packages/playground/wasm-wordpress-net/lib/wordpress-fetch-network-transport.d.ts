import type { UniversalPHP } from '@php-wasm/universal';
export interface RequestData {
    url: string;
    method?: string;
    headers?: Record<string, string>;
    data?: string;
}
export interface RequestMessage {
    type: 'request';
    data: RequestData;
}
export interface SetupFetchNetworkTransportOptions {
    corsProxyUrl?: string;
}
/**
 * Allow WordPress to make network requests via the fetch API.
 * On the WordPress side, this is handled by Requests_Transport_Fetch
 *
 * This function also implements a caching layer for pre-fetched admin requests
 * to improve wp-admin load performance.
 *
 * Usage:
 *
 * ```ts
 * const transport = new FetchNetworkTransport(playground);
 * await transport.setup( php );
 *
 * // The transport is disabled by default, let's enable it:
 * await transport.enable( php );
 * ```
 *
 * @param playground the Playground instance to set up with network support.
 */
export declare class WordPressFetchNetworkTransport {
    private options;
    private preloadedResponseCache;
    constructor(options?: SetupFetchNetworkTransportOptions);
    /**
     * Enable or disable network requests
     */
    setEnabled(playground: UniversalPHP, enabled: boolean): Promise<void>;
    /**
     * Set up the message handler for network requests. This only sets up the
     * message handler, it does not enable the transport. You will still need
     * to call `transport.setEnabled(php, true)` to enable it.
     */
    setupMessageHandler(playground: UniversalPHP): Promise<() => Promise<void>>;
    /**
     * Parallelizes the slow initial burst of api.w.org/update_check requests
     * that's sent on the first wp-admin load. Instead of issuing them one by one
     * and making the user wait a few seconds, we pre-fetch them in parallel.
     *
     * The approach:
     * 1. Call wp_update_* functions and intercept the HTTP requests they make
     * 2. Store the intercepted request details
     * 3. Make parallel fetch requests to get responses
     * 4. Cache the responses for later use by the network transport.
     * 5. When the user makes the actual requests later, serve from cache instead.
     */
    prefetchUpdateChecks(playground: UniversalPHP): Promise<Promise<any>[]>;
}
export declare function handleRequest(data: RequestData, fetchFn?: typeof fetch): Promise<Uint8Array>;
