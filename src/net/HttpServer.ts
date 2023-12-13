import {InetSocketAddr} from "./InetSocketAddr";


export abstract class HttpServer{

    private inet:InetSocketAddr;


    protected constructor(inet:InetSocketAddr, port:number) {
    }

    public static create():HttpServer{
        return null;
    }

    
    
}
Object.package(this);