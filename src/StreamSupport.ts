import {IntPipelineImpl} from "./stream/IntPipeline";
import {intStream, spliterator, supplier} from "./Interface";
import {Spliterator} from "./Spliterator";
import {Spliterators} from "./Spliterators";


export abstract class StreamSupport {
    /***
     * @param {Spliterator<number>} spliterator
     * @returns {intStream}
     */
    public static intStream(spliterator:Spliterator<number>|supplier<spliterator<number>> ):intStream{
       return new IntPipelineImpl.Head<number>(spliterator);
    }

}