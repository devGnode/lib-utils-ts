# lib-utils-ts
###Get started on JavaSTrip

For enabled this Framework you need to follow this steps.
In first import this framework to your project from npm registry.

`npm i lib-utils-ts` >= 3.0.0

Others importation :

* `npm i @types/node`
* `npm i typescript`
* `npm i ts-node`

### Enabled feature

* In your current tsconfig.ts file enabled the `experimentalDecorators` property at `true` like below :

``````json
{
  "experimentalDecorators": true
}
``````
* In your **Main.ts** class import `lib-utils-ts/src/globalUtils.ts`

### Write a class

* The first character of your class name should be in upper case
* File name will have same named of the exportable defined class
* When you create a new class file, define just one exportable class
* When you have ending a class file call this `Package(this)` function at end of the file

```````typescript
import {Package} from "lib-utils-ts/src/package/Package";

export class Test {
    /* some code ... */
}

Package(this);
```````
## Running App

### Class Runner

`````typescript
import {Package} from "lib-utils-ts/src/Package/Package";
import "lib-utils-ts/src/globalUtils"

export class Run{

    public static Main(args:Object[]):void{

        System.out.Println(args.toString() + new Run().toString() );

    }

}
Package(this);
`````
And then create file pointer for your runner at your root project. And named this file **Run** :

- `Run.ts`

````typescript
/***
 * Import Run File
 */
import "lib-utils-ts/src/Run"
````

### Shell

When you run your application you will need to create shell environment variables

* `PROJECT_ROOT` : Path of your root project
* `PROJECT_SRC`  : Target source directory
* `PROJECT_RESOURCES` : Resources target directory
* `PROJECT_CLASS_MAIN`: Package to launch

you can initialize a shell launcher like this.

```````shell
#!/bin/sh

# Runner File
RUNNER=Run.ts

# ENV
export PROJECT_ROOT=$PWD
export PROJECT_SRC=$PWD/src
export PROJECT_RESOURCES=$PWD/src/resources
export PROJECT_CLASS_MAIN=src.fr.app.Run

# --main              : Class to Run.
# --arguments         : Arguments of your app. -Dfoo=bar -foo="foo bar" -foo='foo bar' -foo=12
# --mode              : *Main or instance.
# --project-root      : Path directory of your project.
# --project-src       : Source directory.
# --project-resources : resources directory
# --quiet             : *false output no log
#
ts-node $RUNNER --quiet \
    --main=$PROJECT_CLASS_MAIN \
    --arguments=\"$@\" \
    --project-root=\"$PWD\" \
    --project-src=\"$PWD/src\" \
    --project-resources=\"$PWD/src/resources\" \
    --mode=main
```````

#### Launch

`````shell
$ sh launcher.sh -Dargs=true -Dfoo=bar 
`````

### Project structure

Example of project structure :

`````text
App-dir
|
|___ nodes_modules/
|
|____ src/
|       |
|       |____ tld.package.app/
|       |               |
|       |               |___ Runner.ts
|       |
|       |___ resources
|       
|___ package.json
|
|___ tsconfig.json
|
|___ launcher.sh
|
|___ Run.ts
`````