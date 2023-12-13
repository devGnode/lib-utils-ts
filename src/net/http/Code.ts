import {Enum} from "../../Enum";

export class Code extends Enum{
    //2xx
    @Enum.args(200) static readonly HTTP_OK:Code;
    @Enum.args(201) static readonly HTTP_CREATED:Code;
    @Enum.args(202) static readonly HTTP_ACCEPTED:Code;
    @Enum.args(204) static readonly HTTP_NO_CONTENT:Code;
    @Enum.args(205) static readonly HTTP_RESET_CONTENT:Code;
    // 3xx
    @Enum.args(300) static readonly HTTP_MULTIPLE_CHOICES:Code;
    @Enum.args(301) static readonly HTTP_MOVE_PERMANENTLY:Code;
    @Enum.args(302) static readonly HTTP_FOUND:Code;
    @Enum.args(304) static readonly HTTP_NOT_MODIFIED:Code;
    @Enum.args(305) static readonly HTTP_USE_PROXY:Code;
    @Enum.args(310) static readonly HTTP_TOO_MANY_REDIRECTS:Code;
    // 4xx
    @Enum.args(400) static readonly HTTP_BAD_REQUEST:Code;
    @Enum.args(401) static readonly HTTP_UNAUTHORIZED:Code;
    @Enum.args(403) static readonly HTTP_FORBIDEN:Code;
    @Enum.args(404) static readonly HTTP_NOT_FOUND:Code;
    @Enum.args(405) static readonly HTTP_NOT_ALLOWED:Code;
    @Enum.args(406) static readonly HTTP_NOT_ACCEPTABLE:Code;
    // 5xx
    @Enum.args(500) static readonly HTTP_INTERNAL_SERVER_ERROR:Code;
    @Enum.args(502) static readonly HTTP_BAD_GATEWAY:Code;
    @Enum.args(503) static readonly HTTP_SERVICE_UNAVAILABLE:Code;
    @Enum.args(520) static readonly HTTP_UNKNOWN_ERROR:Code;

    private readonly code:number;

    private constructor(code:number) {super();this.code = code;}

    /***
     * Return status code
     * @return {number}
     */
    public get():number{ return this.code; }

    /**@override*/
    public toString(): string {
        return super
            .toString()
            .replace(/\_|HTTP/gi," ")
            .trimStart();
    }
}
Object.package(this);