import {IntPipelineImpl} from "./IntPipeline";
import {intStream, spliterator, Stream, supplier} from "../Interface";
import {Spliterator} from "../utils/Spliterator";
import {ReferencePipelineImpl} from "./ReferencePipeline";
import {Objects} from "../type/Objects";
/***
 * @StreamSupport
 */
export abstract class StreamSupport {
    /***
     * @stream
     * @returns {Stream}
     */
    public static stream<T>(spliterator:Spliterator<T>|supplier<spliterator<T>>):Stream<T>{
        return new ReferencePipelineImpl.Head(spliterator, 0);
    }
    /***
     * @intStream
     * @returns {intStream}
     * @toImplement sourceFlag
     */
    public static intStream(spliterator:Spliterator<number>|supplier<spliterator<number>> ):intStream{
       return new IntPipelineImpl.Head<number>(Objects.requireNotNull(spliterator),0);
    }

}
Object.package(this);