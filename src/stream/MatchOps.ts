import {terminalOps} from "./TerminalOps";
import {PipelineHelper} from "./PipelineHelper";
import {spliterator} from "../Interface";
import {StreamShape} from "./StreamShape";


export class MatchOps {

    private constructor() {}

    private static MatchOp = class MatchOp<T> implements terminalOps<T, boolean>{

        private readonly shape: StreamShape;

        evaluateSequential<P_IN>(helper: PipelineHelper<T>, spliterator: spliterator<P_IN>): boolean {
            return undefined;
        }

        getOpFlag(): number {
            return 0;
        }

        inputShape(): StreamShape {
            return undefined;
        }

    }
}