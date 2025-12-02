import type { FilesystemOperation } from '@php-wasm/fs-journal';
import type { EmscriptenDownloadMonitor } from '@php-wasm/progress';
import type { MountDevice, SyncProgressCallback } from '@php-wasm/web';
import { createMemoizedFetch } from '@wp-playground/common';
import type { SupportedPHPVersion } from '@php-wasm/universal';
import { PHPWorker } from '@php-wasm/universal';
import type { BlueprintDeclaration } from '@wp-playground/blueprints';
export interface MountDescriptor {
    mountpoint: string;
    device: MountDevice;
    initialSyncDirection: 'opfs-to-memfs' | 'memfs-to-opfs';
}
export type WorkerBootOptions = {
    wpVersion?: string;
    sqliteDriverVersion?: string;
    phpVersion?: SupportedPHPVersion;
    sapiName?: string;
    scope: string;
    withNetworking: boolean;
    mounts?: Array<MountDescriptor>;
    shouldInstallWordPress?: boolean;
    corsProxyUrl?: string;
    /** When true, skip default WP install and run Blueprints v2 in the worker */
    experimentalBlueprintsV2Runner?: boolean;
    /** Blueprint v2 declaration to run in the worker when experimental mode is on */
    blueprint?: BlueprintDeclaration;
};
/** @inheritDoc PHPClient */
export declare abstract class PlaygroundWorkerEndpoint extends PHPWorker {
    booted: boolean;
    /**
     * A string representing the scope of the Playground instance.
     */
    scope: string | undefined;
    /**
     * A string representing the requested version of WordPress.
     */
    requestedWordPressVersion: string | undefined;
    /**
     * A string representing the version of WordPress that was loaded.
     */
    loadedWordPressVersion: string | undefined;
    blueprintMessageListeners: Array<(message: any) => void | Promise<void>>;
    unmounts: Record<string, () => any>;
    private networkTransport;
    protected downloadMonitor: EmscriptenDownloadMonitor;
    protected memoizedFetch: ReturnType<typeof createMemoizedFetch>;
    constructor(monitor: EmscriptenDownloadMonitor);
    protected computeSiteUrl(scope: string): string;
    protected createRequestHandler({ siteUrl, sapiName, corsProxyUrl, knownRemoteAssetPaths, withNetworking, phpVersion, }: {
        siteUrl: string;
        sapiName: string;
        corsProxyUrl?: string;
        knownRemoteAssetPaths: Set<string>;
        withNetworking: boolean;
        phpVersion: SupportedPHPVersion;
    }): Promise<import("@php-wasm/universal").PHPRequestHandler>;
    protected finalizeAfterBoot(requestHandler: any, withNetworking: boolean, knownRemoteAssetPaths: Set<string>): Promise<void>;
    /**
     * @returns WordPress module details, including the static assets directory and default theme.
     */
    getWordPressModuleDetails(): Promise<{
        majorVersion: string | undefined;
        staticAssetsDirectory: string | undefined;
    }>;
    getMinifiedWordPressVersions(): Promise<{
        all: {
            trunk: string;
            beta: string;
            "6.8": string;
            "6.7": string;
            "6.6": string;
            "6.5": string;
            "6.4": string;
            "6.3": string;
        };
        latest: string;
    }>;
    hasOpfsMount(mountpoint: string): Promise<boolean>;
    mountOpfs(options: MountDescriptor, onProgress?: SyncProgressCallback): Promise<void>;
    unmountOpfs(mountpoint: string): Promise<void>;
    backfillStaticFilesRemovedFromMinifiedBuild(): Promise<void>;
    hasCachedStaticFilesRemovedFromMinifiedBuild(): Promise<boolean>;
    onBlueprintMessage(listener: (message: any) => void | Promise<void>): Promise<() => Promise<void>>;
    abstract boot(_: any): Promise<void>;
    /**
     * Pre-fetch the slow initial burst of wp_update_* requests to greatly
     * improve the first wp-admin load time.
     */
    prefetchUpdateChecks(): Promise<void>;
    journalFSEvents(root: string, callback: (op: FilesystemOperation) => void): Promise<() => any>;
    replayFSJournal(events: FilesystemOperation[]): Promise<void>;
}
