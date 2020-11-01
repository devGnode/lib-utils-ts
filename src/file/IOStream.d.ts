/// <reference types="node" />
import { fileStream, List, reader, writer } from "../Interface";
import { Path } from "./Path";
import "../globalUtils";
import { Iterator } from "../Iterator";
export declare abstract class AbstractIOFile implements fileStream {
    protected file: string;
    protected constructor(file: string);
    getPath(): string;
    getFileName(): string;
    static exists(path: Path): boolean;
    static getFileSize(filename?: string): number;
}
export declare class InputStreamReader extends AbstractIOFile implements reader {
    protected data: string[];
    protected index: number;
    protected constructor(file: string);
    size(): number;
    reset(): void;
    read(): string;
    getLines(): List<string>;
    getIterator(): Iterator<string>;
    toString(): string;
}
export declare class FileReader extends InputStreamReader {
    constructor(file: string);
}
export declare class OutputStreamWriter extends AbstractIOFile implements writer {
    protected flag: string;
    protected truncate: boolean;
    constructor(file: string, flag?: string, truncate?: boolean);
    setTruncate(state: boolean): void;
    setFlag(flag: string): void;
    write(data: string, truncate?: boolean, encoding?: BufferEncoding, create?: boolean): void;
}
export declare class FileWriter extends OutputStreamWriter {
    constructor(file: string, flag?: string, truncate?: boolean);
}
