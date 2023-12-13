import {Enum} from "../../Enum";

export class HttpMethod extends Enum{

    @Enum.args(  ) static readonly GET:HttpMethod;
    @Enum.args(  ) static readonly POST:HttpMethod;
    @Enum.args(  ) static readonly PUT:HttpMethod;
    @Enum.args(  ) static readonly PURGE:HttpMethod;
    @Enum.args(  ) static readonly PATCH:HttpMethod;
    @Enum.args(  ) static readonly DELETE:HttpMethod;
    @Enum.args(  ) static readonly HEAD:HttpMethod;
    @Enum.args(  ) static readonly COPY:HttpMethod;
    @Enum.args(  ) static readonly LINK:HttpMethod;
    @Enum.args(  ) static readonly OPTIONS:HttpMethod;

    private constructor() {super();}

    public getMethod():string{ return this.name(); }
}
Object.package(this);