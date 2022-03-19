import {Enum} from "../Enum";
/**
 * @StreamShape : Enum
 */
export abstract class StreamShape extends Enum{

    @Enum.args()
    static readonly REFERENCE;

    @Enum.args()
    static readonly INT_VALUE;

}
Object.package(this);