import {Enum} from "../../Enum";
import {IllegalArgumentException} from "../../Exception";
/***
 * @writer   maroder
 * @version 1.0-R-JSTrip
 */
export class UNICODE extends Enum{

    @Enum.args() static readonly BASE_LATIN:UNICODE;
    @Enum.args() static readonly LATIN_2:UNICODE;
    @Enum.args() static readonly LATIN_EXT_A:UNICODE;
    @Enum.args() static readonly LATIN_EXT_B:UNICODE;
    @Enum.args() static readonly LATIN_EXT:UNICODE;
    @Enum.args() static readonly __:UNICODE;
    @Enum.args() static readonly DIACRITICS:UNICODE;
    @Enum.args() static readonly GREEK:UNICODE;
    @Enum.args() static readonly  CYRILLIC:UNICODE;
    @Enum.args() static readonly CYRILLIC_EXT:UNICODE;
    @Enum.args() static readonly ARMENIAN:UNICODE;
    @Enum.args() static readonly YIDDISH:UNICODE;
    @Enum.args() static readonly ARABIC:UNICODE;
    @Enum.args() static readonly SYRIAN:UNICODE;
    @Enum.args() static readonly ARABIC_EXT:UNICODE;
    @Enum.args() static readonly TANA:UNICODE;
    @Enum.args() static readonly NKO:UNICODE;
    @Enum.args() static readonly SAMARITAN:UNICODE;
    @Enum.args() static readonly MANDEAN:UNICODE;
    @Enum.args() static readonly SYRIAN_EXT:UNICODE;
    @Enum.args() static readonly ARABIC_EXT_A:UNICODE;
    @Enum.args() static readonly DEVANAGARI:UNICODE;
    @Enum.args() static readonly BENGALI:UNICODE;
    @Enum.args() static readonly GOURMUKHI:UNICODE;
    @Enum.args() static readonly GUJARATI:UNICODE;
    @Enum.args() static readonly ORIYA:UNICODE;
    @Enum.args() static readonly TAMIL:UNICODE;
    @Enum.args() static readonly TELUGU:UNICODE;
    @Enum.args() static readonly KANNARA:UNICODE;
    @Enum.args() static readonly MALAYALAM:UNICODE;
    @Enum.args() static readonly SINHALESE:UNICODE;
    @Enum.args() static readonly THAI:UNICODE;
    @Enum.args() static readonly LAO:UNICODE;
    @Enum.args() static readonly TIBETAN:UNICODE;

    public static getUnicodeByOrdinal(code:number):UNICODE{
        let unicode:UNICODE[] = UNICODE.class<UNICODE>().getEnumConstants();
        if(unicode[code]==null) throw new IllegalArgumentException();
        return unicode[code];
    }

    public toString(): string {return "Encoding UTF-8 "+super.toString();}
}
Object.package(this);