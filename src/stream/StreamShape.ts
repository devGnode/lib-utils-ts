import {Enum} from "../Enum";
/**
 * @StreamShape : Enum
 */
export abstract class StreamShape extends Enum{

    @Enum.args("REFERENCE")
    static REFERENCE;

    @Enum.args("INT_VALUE")
    static INT_VALUE;

    private readonly value:string;

    protected constructor(value:string) {super(); this.value=value;}

}