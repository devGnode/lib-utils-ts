import "../globalUtils";
import { fileStream } from "../Interface";
export declare class Path implements fileStream {
    private readonly path;
    private readonly file;
    private readonly ext;
    constructor(pathA: string);
    get(): string;
    getPath(): string;
    getFileName(): string;
}
