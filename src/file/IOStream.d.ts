/// <reference types="node" />
import { List } from "../Interface";
import { Path } from "./Path";
export interface reader {
    read(): string;
    getLines(): List<string>;
}
export interface writer {
    write(l: string): void;
}
export interface fileStream {
    getPath(): string;
    getFileName(): string;
}
export declare class InputStreamReader implements reader, fileStream {
    protected file: string;
    protected data: string[];
    protected index: number;
    protected constructor(file: string);
    read(): string;
    getPath(): string;
    getLines(): List<string>;
    toString(): string;
    getFileName(): string;
}
/***
 *
 */
export declare class FileReaderA extends InputStreamReader {
    constructor(file: string);
}
/***
 */
export declare class OutputStreamWriter implements writer, fileStream {
    protected file: string;
    protected flag: string;
    constructor(file: string, flag?: string);
    write(data: string, truncate?: boolean, encoding?: BufferEncoding, create?: boolean): void;
    static exists(path: Path): boolean;
    getPath(): string;
    getFileName(): string;
}
export declare class FileWriter extends OutputStreamWriter {
    constructor(file: string);
}
