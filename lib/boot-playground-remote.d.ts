import type { PlaygroundWorkerEndpoint, WorkerBootOptions, MountDescriptor } from './playground-worker-endpoint';
export type { MountDescriptor, WorkerBootOptions };
import type { WebClientMixin } from './playground-client';
export declare const serviceWorkerUrl: URL;
export declare function bootPlaygroundRemote(): Promise<import("@php-wasm/universal").PublicAPI<WebClientMixin, import("@php-wasm/universal").RemoteAPI<PlaygroundWorkerEndpoint>>>;
