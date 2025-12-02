import type { ProgressTracker } from '@php-wasm/progress';
import type { PlaygroundClient, StartPlaygroundOptions } from '.';
export declare class BlueprintsV2Handler {
    private readonly options;
    constructor(options: StartPlaygroundOptions);
    bootPlayground(iframe: HTMLIFrameElement, progressTracker: ProgressTracker): Promise<PlaygroundClient>;
}
