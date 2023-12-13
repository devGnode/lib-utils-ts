import {List} from "../../Interface";
import {Objects} from "../../type/Objects";
import {ArrayList} from "../../utils/ArrayList";
import {HttpMethod} from "./HttpMethod";
import {Nested} from "../../annotation/Nested";
import {IllegalArgumentException} from "../../Exception";
import {Packages} from "../../annotation/Packages";
import {PathParam} from "./PathParam";

const {NestedClass} = Nested;

export interface HttpEndPoint {
    getPath():string
}
export interface HttpEndpointTemplate extends HttpEndPoint{
    is(pathIn:string):boolean
    hasMethod(method:HttpMethod):boolean
    getMethods():List<HttpMethod>
    addMethod(method:HttpMethod):void
    removeMethod(method:HttpMethod):void
    getParams(pathIn:string):Object
}

export interface PathParams {
    getPosition():number
    getName():string
}

//@Packages.Package(__dirname)
export class Endpoint {

    @NestedClass
    private static readonly PathsParams = class PathsParams implements PathParams{

        protected readonly id:number;
        protected readonly name:string;

        public constructor(id:number, name:string) {
            this.id     = id;
            this.name   = name;
        }

        public getPosition(): number {return this.id;}
        public getName():string {return this.name;}
        /***@override*/
        public toString():string{return `Path params( ${this.id}, ${this.name} )`; }
    };

    @NestedClass
    private static readonly EndPoint = class Endpoint implements HttpEndPoint{
        protected readonly path:string;
        public constructor(path:string) {this.path = path;}
        public getPath(): string {return this.path;}
    };

    @NestedClass
    private static readonly EndPointTemplate = class EndPointTemplate extends Endpoint.EndPoint
        implements HttpEndpointTemplate{

        private method:List<HttpMethod>;
        private regExp:RegExp;
        private paramsPath:List<PathParams> =new ArrayList();

        public constructor(method:HttpMethod, path:string) {
            super(path);
            this.method = null;
            this.regExp = this.getRegExp(path);
            if(!Objects.isNull(method))this.getMethod().add(method);
        }

        private getMethod():List<HttpMethod>{
            if(this.method==null) this.method = new ArrayList();
            return this.method;
        }

        public is(pathIn:string):boolean{return Objects.requireNotNull(this.regExp).test(pathIn);}

        public getMethods():List<HttpMethod>{ return this.method; }

        public addMethod(method:HttpMethod):void{this.getMethod().add(method);}

        public removeMethod(method:HttpMethod):void{this.getMethod().remove(method);}

        public hasMethod(method:HttpMethod):boolean{return this.method==null || (this.method && this.method.contains(method)); }

        public getParams(pathIn:string):List<PathParam>{
            let out:List<PathParam> = new ArrayList(),
                current:PathParams, j:number = 0,
                paths:string[] = Objects.requireNotNull(pathIn)
                    .replace(/^\//,"")
                    .replace(/\/$/,"")
                    .split(/\//);

            if(!this.is(pathIn)) return null;
            for(let i = 0, tmp:RegExpExecArray; i < paths.length; i++){
                try{
                    current = this.paramsPath.get(j);
                    if (current.getPosition().equals(i) && (tmp = /(.*)/.exec(paths[i]))) {
                        out.add(new PathParam(current, tmp[1]));
                        j++;
                    }
                }catch (e) {
                    break;
                }
            }
            return out;
        }

        private getRegExp(path:string):RegExp{
            let paths:string[] = Objects.requireNotNull(path)
                .replace(/^\//,"")
                .replace(/\/$/,"")
                .split(/\//);

            if(path.length==0)
                throw new IllegalArgumentException(`Wrong path value !`);

            for(let i = 0, tmp:RegExpExecArray; i < paths.length; i++){
                if((tmp=/\{(\w+)\}/.exec(paths[i]))){
                    paths[i] = "([\^\/]+)";
                    this.paramsPath.add(new Endpoint.PathsParams(i,tmp[1]));
                }
            }

            return new RegExp(`^\/${paths.join("/")}$`);
        }

    };

    /***
     * @param {string} path
     * @return {HttpEndPoint}
     */
    public static endpointIn(path:string):HttpEndPoint{
        return new Endpoint.EndPoint(path);
    }

    public static endpointTemplate(method:HttpMethod, path:string):HttpEndpointTemplate{
        return new Endpoint.EndPointTemplate(method,path);
    }
}