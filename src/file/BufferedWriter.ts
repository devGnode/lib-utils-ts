import {Writer} from "./Writer";

export class BufferedWriter extends Writer{

    constructor() {
        super();
    }

    close(): void {
    }

    flush(): void {
    }

    writeBytes(buffer: string[] | string, off?: number, len?: number): void {
    }

}
Object.package(this);