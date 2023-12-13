import {Enum} from "../Enum";
/**
 * @StreamShape : Enum
 */
export abstract class StreamShape extends Enum{

    @Enum.args()
    static readonly REFERENCE:StreamShape;

    @Enum.args()
    static readonly INT_VALUE:StreamShape;

}
Object.package(this);