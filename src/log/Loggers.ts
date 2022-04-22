import {Path} from "../file/Path";
import {IllegalArgumentException, RuntimeException} from "../Exception";
import {Objects} from "../type/Objects";
import {LogLevel} from "./LogLevel";
import {UUID} from "../utils/UUID";
import {Constructor} from "../Constructor";
import {List, MapEntries} from "../Interface";
import {ArrayList} from "../utils/ArrayList";
import {HashMap} from "../utils/HashMap";
import {Consumer} from "../Consumer";
import {FileRecording, Log, LogRotation} from "./Global";
import {Arrays} from "../type/Arrays";
import {Colorize} from "./Colorize";
import {Collectors} from "../Collectors";
import {System} from "../lang/System";
import {Logger} from "./Logger";
import {File} from "../file/File";
import {FileWriter} from "../file/FileWriter";
import {FileOutputStream} from "../file/FileOutputStream";
import {FileDescriptor} from "../file/FileDescriptor";
import {Files} from "../file/Files";
import {Nested} from "../annotation/Nested";
import {Properties} from "../file/Properties";
import {IOException} from "../file/IOException";
import {Integer} from "../type/Integer";
/***
 * https://github.com/devGnode/logger20js
 *
 * @writer   maroder
 * @version 1.0-R-JSTrip
 */
export abstract class Loggers {
    /**
     * static Pattern
     */
    public static readonly DEFAULT_LOG_PATTERN_MONO: string     = "%time\t%name\t: %type :\t%message";
    public static readonly DEFAULT_LOG_PATTERN_COLORE: string   = "[%hours{cyan}] %T{w?yellow;e?red}/%name - %message";
    public static readonly EXPRESS_MIDDLEWARE_PATTERN: string   = "[%hours{yellow}] %name %protocol{red} - %method %url +%elapsedTime{yellow}";
    public static readonly STATS_MEMORY_PATTERN: string         = "[%hours{cyan}] %T{cyan}/%name{cyan} memory : heap( %heapUsed{yellow}, %heapTotal{yellow} ) : rss( %rss{yellow} ) : external( %external{yellow} )";
    public static readonly CPU_USAGE_PATTERN: string            = "[%hours{cyan}] user CPUTime( %userCPUTime{yellow} ) system CPUTime( %systemCPUTime{yellow} ) maxRss( %maxRSS{yellow} ) ";
    public static readonly VERSION_USAGE_PATTERN: string        = "[%hours{cyan}] version of : node( %node{yellow} ) - v8( %v8{yellow} )";
    /***
     * Static default logger configuration
     */
    protected static parser:string                  = Loggers.DEFAULT_LOG_PATTERN_COLORE;
    protected static logLevel:LogLevel[]            = [LogLevel.ALL];
    /**/
    protected static logStdout:boolean              = true;
    protected static colorize : boolean             = true;
    protected static cleanUpBeforeSave:boolean      = true;

    private static readonly LogRotation = class LogRotate implements LogRotation {

        private readonly timeStamp:Date;

        constructor(date:Date = null) {this.timeStamp = date;}

        public isExpired():boolean{ return this.timeStamp == null ? false : (new Date()).getTime() > this.timeStamp.getTime(); }

        public isValid():boolean{ return this.timeStamp != null; }

        public static getRotateTimestamp( rotate:string = null, date:Date = null ) : Date{
            let tmp : any[],sec : number;
            if((tmp=/^((\d+)d?(\:)*)*((\d+)h?(\:)*)*((\d+)m)*$/.exec(Objects.requireNotNull(rotate)))){
                sec = parseInt(tmp[2]||0)*86400 + parseInt(tmp[5]||0)*3600 + parseInt(tmp[8]||0)*60;
                return new Date((date||new Date()).getTime()+(sec*1000));
            }
            return null;
        }

    };
    /**
     * @type
     */
    private static readonly FileRecorder = class FileRecorder implements FileRecording{

        private path:Path                   = null;
        private fileT:File                  = null;
        private fd:FileDescriptor           = null;

        private fileMaxSize:number          = -1;
        private fileNamePattern:string      = "%date-%id.log";
        private saveLog:boolean             = false;

        private patternRotate:string        = null;
        private logRotate:LogRotation       = new Loggers.LogRotation();

        constructor() {}

        public setFileMaxSize(sizeof:number):void{ this.fileMaxSize=sizeof;}

        public setFileNamePattern(pattern:string):void{ this.fileNamePattern=pattern; }

        public setPath(path:Path):void{
            this.path = path==null ? new Path("./") : path.isAbsolute() ? path : new Path("./").resolve(path);
            if(!this.getPath().toFile().isDirectory()) throw new RuntimeException(`Path of the log directory is invalid '${this.getPath()}'`);
        }

        public saveLogState(state:boolean):void{
            this.saveLog = state||true;
            if( this.saveLog&&this.path==null) this.setPath(null);
        }

        public getPath():Path{
            if(!this.path) this.path = new Path("./");
            return this.path;
        }

        private getFD():FileDescriptor{

            if(this.fd!=null) return this.fd;
            if(!this.getPath().toFile().isDirectory()) throw new RuntimeException(`Path of the log directory is invalid '${this.getPath()}'`);
            this.fileT = this.getPath().resolve(new Path(this.getLoggerFileName())).toFile();
            this.fd = new FileOutputStream(this.fileT,false).getFD();

            return this.fd;
        }

        private fileRotate():void{
            if(this.fd!=null){
                new FileWriter(this.fd).close();
                this.fd = null;
            }
        }


        public setLogRotatePattern(timestamp:string):void{
            this.logRotate = new Loggers.LogRotation(Objects.requireNotNull(Loggers.LogRotation.getRotateTimestamp(timestamp)));
            this.patternRotate = timestamp;
            if(!(/%rotate/.test(this.fileNamePattern))) this.fileNamePattern= "%rotate-"+this.fileNamePattern;
        }

        public isEnableLogRotate():boolean {return this.logRotate.isValid();}

        public isOverflowFile(message:string):boolean{
            let size:number;
            if(this.fileMaxSize==-1) return false;
            return (size=Files.size(this.fileT)) >= this.fileMaxSize || size+message.length >= this.fileMaxSize;
        }

        public canRecord():boolean{return this.path!=null && this.saveLog;}

        public writeLn(message:string):boolean {
            let reload:boolean = false;

            if(this.isOverflowFile(message)){
                if(!this.isEnableLogRotate()) return false;
                reload = true;
            }
            if(this.logRotate.isExpired()) reload = true;
            if(reload){
                this.setLogRotatePattern(this.patternRotate);
                this.fileRotate();
            }
            new FileWriter(this.getFD()).write(message)
            return true;
        }

        private static round( value : any = null ){return value!==null ? (value.toString().length===1?"0"+value:value) : value;}

        private getLoggerFileName():string {
            let data:HashMap<string, Object> = new HashMap(),
                d = new Date(), filename = this.fileNamePattern;

            data.put("id", Loggers.fid);
            data.put("date", d.toLocaleDateString( ).replace(/\//g,"-"));
            data.put("ms", d.getMilliseconds());
            data.put("HH", FileRecorder.round(d.getHours()));
            data.put("mm", FileRecorder.round(d.getMinutes()));
            data.put("ss", FileRecorder.round(d.getSeconds()));
            if(this.logRotate)data.put("rotate", String(d.getTime().toString()||"null"));
            // replace
            data.entrySet().forEach(Consumer.of((o: MapEntries<string, Object>)=>{
                filename = filename.replace(new RegExp(`\%${o.getKey()}`),<string>o.getValue());
            }));

            return filename;
        }
    };
    /**
     * output file Recorder
     */
    protected static fileRecord:FileRecording       = new Loggers.FileRecorder();
    /**
     * output file name
     */
    public static fid:string  = UUID.UUID().toString();
    /***
     * Output log directory
     * @param {Path} path
     */
    public static setOutputLog( path:Path ):void {
        if(!Objects.requireNotNull(path).toFile().isDirectory()) throw new IOException(`${path} is not a directory`);
        this.fileRecord.setPath(path);
    }
    /***
     * Enabled or disabled output
     * stream in the log file.
     * @param save
     */
    public static setSaveLog( save:boolean = false ):void {
        this.fileRecord.saveLogState(Objects.requireNotNull(save));
    }
    /***
     * Logger file limit size in Bytes
     * NULL mean infinite size
     * @param {number} bytes
     */
    public static setFileMaxSize(bytes:number = null) : void {
        this.fileRecord.setFileMaxSize(Objects.requireNotNull(bytes));
    }
    /***
     * TimeStamp pattern :
     * d:mm:ss
     * @param {string} rotate
     */
    public static setLogRotate( rotate:string = null ) : void {
        this.fileRecord.setLogRotatePattern(rotate);
    }
    /***
     * Enabled or disabled console
     * stream output data.
     * @param {boolean} stdout
     */
    public static setLogStdout( stdout:boolean = true ):void {
        console.log("qdsqmskdlmksqmdkmsqkdmsqkdmksmdksqmkd", stdout, Objects.requireNotNull(stdout))
        this.logStdout = Objects.requireNotNull(stdout);
    }
    /***
     * Enabled or disabled console
     * & file stream output data.
     * @param {boolean} stdout
     */
    public static record( stdout:boolean = true ):void {
        this.fileRecord.saveLogState(this.logStdout = Objects.requireNotNull(stdout));
    }
    /***
     * set default pattern for the new
     * instanced loggers
     * @param {string} pattern
     */
    public static setPattern( pattern:string = Loggers.DEFAULT_LOG_PATTERN_MONO ):void {
        this.parser = Objects.requireNotNull(pattern);
    }
    /***
     * Push array LogLevel
     * @param {LogLevel[]} level
     */
    public static level( level:LogLevel[] = [LogLevel.ALL] ) : void {
        this.logLevel = Objects.requireNotNull(level);
    }
    /**
     * Remove a logLevel
     * @param {LogLevel} logLevel
     */
    public static popLevel( logLevel:LogLevel = LogLevel.ALL ) : void{
        let tmp;
        if((tmp=this.logLevel.indexOf(logLevel))>-1){
            this.logLevel = this.logLevel.slice(0,tmp).concat(this.logLevel.slice(tmp+1,this.logLevel.length));
        }
    }
    /**
     * Add a LogLevel
     * @param {LogLevel} logLevel
     */
    public static pushLevel( logLevel:LogLevel = LogLevel.ALL ): void{
        if(this.logLevel.indexOf(Objects.requireNotNull(logLevel))===-1)this.logLevel.push(logLevel);
    }
    /***
     * Define a pattern for the log file name
     * %id          : UUID
     * %date        : Date YYYY-dd-MM
     * %HH          : Hours
     * %mm          : Minutes
     * %ss          : seconds
     * %ms          : Milliseconds
     * %rotate      : TimeStamps rotate Start
     * @param {String} pattern
     */
    public static setLogFilePattern( pattern:string) : void {
        if(Loggers.fileRecord.isEnableLogRotate()&&!(/%rotate/.test(pattern)))
            throw new IllegalArgumentException(`Log rotate is enabled define '%rotate' parser in your pattern !`);
        this.fileRecord.setFileNamePattern(Objects.requireNotNull(pattern));
    }
    /***
     * Enabled or disabled colorization
     * in the output stream
     * @param {boolean} status
     */
    public static setColorize( status:boolean = true ) : void {
        this.colorize = Objects.requireNotNull(status);
    }
    /***
     * If colorization is enabled this option
     * allow to cleanUp string buffer before
     * saving it.
     * in the output stream
     * @param state
     */
    public static setCleanUpBeforeSave( state:boolean = Loggers.cleanUpBeforeSave ) : void {
        this.cleanUpBeforeSave = Objects.requireNotNull(state);
    }
    /***
     * @param {Properties} properties
     */
    public static setConfig(properties:Properties){
        //
        this.setFileMaxSize(Integer.of(properties.getProperty("logger.fileSize","-1")));
        this.setPattern(String(properties.getProperty("logger.pattern",this.DEFAULT_LOG_PATTERN_MONO)));
        this.setLogStdout(Boolean.of(properties.getProperty("logger.enabledStdout", true)));
        this.setColorize(Boolean.of(properties.getProperty("logger.enabledColorization", true)));
        this.setCleanUpBeforeSave(Boolean.of(properties.getProperty("logger.cleanMsgBeforeSave", true)));
        // not null
        if(properties.getProperty("logger.rotate"))this.setLogRotate(String(properties.getProperty("logger.rotate")));
        if(properties.getProperty("logger.fileNamePattern")) this.setLogFilePattern(String(properties.getProperty("logger.fileNamePattern")));
        if(properties.getProperty("logger.outputDirectory")){
            this.setOutputLog(new Path(String(properties.getProperty("logger.outputDirectory"))));
            this.setSaveLog(true);
        }
        // loLevel
        if(properties.getProperty("logger.level")){
            let level:LogLevel[] = (<string>properties.getProperty("logger.level"))
                .explodeAsList(",")
                .stream()
                .map((value:string)=>LogLevel.valueOf(value.trim().toUpperCase()))
                .toArray();
            this.level(level);
        }
    }
    /***
     * @param {string} path
     */
    public static setPropertiesFileName(path:string):void{
        let prop:Properties;

        if(!new File(Objects.requireNotNull(path)).isFile()) throw new IOException(`Logger properties file loader '${path}' is not a file !`);
        prop = new Properties();
        prop.load(Loggers.class().getResourcesAsStream(path));
       this.setConfig(prop);
    }
    /***
     */
    @Nested.NestedClass
    private static readonly LoggerImpl = class LoggerImpl extends Logger implements Log{

        constructor(clazz : Constructor<Object>) {super(clazz);}

        public getPattern():string{ return this.pattern==null?Loggers.parser:this.pattern;}

        protected hasLevel(level:LogLevel):boolean{ return Loggers.logLevel.indexOf(LogLevel.ALL)>-1||Loggers.logLevel.indexOf(level)>-1; }

        protected isColorized():boolean{  return Loggers.colorize || ( Loggers.colorize && this.colorized ); }

        protected stdout(message:string, level:LogLevel, args:Object[] ):void{
            let pattern:string  =  this.getPattern(),
                out : List<string> = new ArrayList(),
                cleanMsg:string, i:number = 0,
                replace:Object[];

            // Pattern detect colorized instruction
            if(!Logger.COLORS_REGEXP.test(pattern))out.add(pattern);
            else{
                // cleanUp for save in log file
                if(Loggers.fileRecord.canRecord()&&Loggers.cleanUpBeforeSave) out.add(this.colorizeString(pattern, level,false));
                out.add(this.colorizeString(pattern, level, this.isColorized()));
            }

            replace = Arrays
                .stream(Array.from(args))
                .map((o:Object)=>typeof o == "string" ? (!this.isColorized() ? new Colorize(o).cleanUp : o) : o )
                .toArray();
            // 1 => pattern without any colour
            // 2 => pattern colored but save not
            // 1 => patter colored
            // clean argv
            if(Loggers.cleanUpBeforeSave&&Loggers.fileRecord.canRecord()){
                cleanMsg = new Colorize(message)
                    .cleanUp.format(
                    ...Arrays
                    .stream(Array.from(args))
                    .map((o:Object)=> new Colorize(typeof o == "string" ? o : o.toString()).cleanUp )
                    .toArray()
                );
            }
            message = message.format(...replace);
            // replace
            out = out
                .stream()
                .map((value:string)=>this.parseString(value, level))
                /***
                 * replace message log here avoid
                 * regexp fall in infinite loop
                 */
                .map((value:string)=>value.replace(/\%error|\%message/gi, (i++) == 0 && Loggers.cleanUpBeforeSave&&Loggers.fileRecord.canRecord() ? cleanMsg : message))
                .collector(Collectors.toList());

            // OUT
            if(Loggers.fileRecord.canRecord())Loggers.fileRecord.writeLn(`${out.get(0)}\n`);
            if(Loggers.logStdout)System.out.println(out.get( out.size()>1? 1 : 0 ));

        }
    };
    /***
     * Logger Factory
     * @param {Constructor<Object>} clazz
     * @return {Log}
     */
    public static factory(clazz:Constructor<Object>):Log{
       return new Loggers.LoggerImpl(clazz);
    }

}
Object.package(this);