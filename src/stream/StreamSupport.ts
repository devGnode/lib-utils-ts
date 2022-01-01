console.log("STREAMSUPPORT - d ")
import {IntPipelineImpl} from "./IntPipeline";
import {intStream, spliterator, Stream, supplier} from "../Interface";
import {Spliterator} from "../Spliterator";
import {ReferencePipelineImpl} from "./ReferencePipeline";
/***
 * @StreamSupport
 */
export abstract class StreamSupport {
    /***
     * @stream
     * @returns {Stream}
     */
    public static stream<T>(spliterator:Spliterator<T>|supplier<spliterator<T>>):Stream<T>{
        return new ReferencePipelineImpl.Head(spliterator);
    }
    /***
     * @intStream
     * @returns {intStream}
     * @toImplement sourceFlag
     */
    public static intStream(spliterator:Spliterator<number>|supplier<spliterator<number>> ):intStream{
       return new IntPipelineImpl.Head<number>(Object.requireNotNull(spliterator),0);
    }

}