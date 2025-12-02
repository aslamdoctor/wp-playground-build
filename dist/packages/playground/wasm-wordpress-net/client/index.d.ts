export * from '@wp-playground/blueprints';
export type { HTTPMethod, PHPRunOptions, PHPRequest, PHPResponse, UniversalPHP, PHPOutput, PHPResponseData, ErrnoError, PHPRequestHandler, PHPRequestHandlerConfiguration, PHPRequestHeaders, SupportedPHPVersion, RmDirOptions, RuntimeType, } from '@php-wasm/universal';
export { setPhpIniEntries, SupportedPHPVersions, SupportedPHPVersionsList, LatestSupportedPHPVersion, } from '@php-wasm/universal';
export { phpVar, phpVars } from '@php-wasm/util';
export type { PlaygroundClient, MountDescriptor };
import type { BlueprintV1, BlueprintV1Declaration, OnStepCompleted } from '@wp-playground/blueprints';
import { ProgressTracker } from '@php-wasm/progress';
import type { MountDescriptor, PlaygroundClient } from '@wp-playground/remote';
export interface StartPlaygroundOptions {
    iframe: HTMLIFrameElement;
    remoteUrl: string;
    progressTracker?: ProgressTracker;
    disableProgressBar?: boolean;
    blueprint?: BlueprintV1;
    /**
     * Prefer experimental Blueprints v2 PHP runner instead of TypeScript steps
     */
    experimentalBlueprintsV2Runner?: boolean;
    onBlueprintStepCompleted?: OnStepCompleted;
    onBlueprintValidated?: (blueprint: BlueprintV1Declaration) => void;
    /**
     * Called when the playground client is connected, but before the blueprint
     * steps are run.
     *
     * @param playground
     * @returns
     */
    onClientConnected?: (playground: PlaygroundClient) => void;
    /**
     * The SAPI name PHP will use.
     * @internal
     * @private
     */
    sapiName?: string;
    mounts?: Array<MountDescriptor>;
    shouldInstallWordPress?: boolean;
    /**
     * The string prefix used in the site URL served by the currently
     * running remote.html. E.g. for a prefix like `/scope:playground/`,
     * the scope would be `playground`. See the `@php-wasm/scopes` package
     * for more details.
     */
    scope?: string;
    /**
     * Proxy URL to use for cross-origin requests.
     *
     * For example, if corsProxy is set to "https://cors.wordpress.net/proxy.php",
     * then the CORS requests to https://github.com/WordPress/wordpress-playground.git would actually
     * be made to https://cors.wordpress.net/proxy.php?https://github.com/WordPress/wordpress-playground.git.
     *
     * The Blueprints library will arbitrarily choose which requests to proxy. If you need
     * to proxy every single request, do not use this option. Instead, you should preprocess
     * your Blueprint to replace all cross-origin URLs with the proxy URL.
     */
    corsProxy?: string;
    /**
     * Additional headers to pass to git operations.
     * A function that returns headers based on the URL being accessed.
     */
    gitAdditionalHeadersCallback?: (url: string) => Record<string, string>;
    /**
     * The version of the SQLite driver to use.
     * Defaults to the latest development version.
     */
    sqliteDriverVersion?: string;
}
/**
 * Loads playground in iframe and returns a PlaygroundClient instance.
 *
 * @param iframe Any iframe with Playground's remote.html loaded.
 * @param options Options for loading the playground.
 * @returns A PlaygroundClient instance.
 */
export declare function startPlaygroundWeb(options: StartPlaygroundOptions): Promise<PlaygroundClient>;
