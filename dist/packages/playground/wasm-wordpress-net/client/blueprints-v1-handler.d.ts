import type { ProgressTracker } from '@php-wasm/progress';
import { type PlaygroundClient, type StartPlaygroundOptions } from '.';
export declare class BlueprintsV1Handler {
    private readonly options;
    constructor(options: StartPlaygroundOptions);
    bootPlayground(iframe: HTMLIFrameElement, progressTracker: ProgressTracker): Promise<PlaygroundClient>;
}
