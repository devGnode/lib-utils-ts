import {Define} from "./Define";
import {comparable, comparator,comparatorFn} from "./Interface";
import {AComparator} from "./Comparator";
import {RuntimeException} from "./Exception";
import {Collection} from "./Collection";
/*
 * Copyright (c) 2012, 2013, Oracle and/or its affiliates. All rights reserved.
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * This code is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License version 2 only, as
 * published by the Free Software Foundation.  Oracle designates this
 * particular file as subject to the "Classpath" exception as provided
 * by Oracle in the LICENSE file that accompanied this code.
 *
 * This code is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License
 * version 2 for more details (a copy is included in the LICENSE file that
 * accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version
 * 2 along with this work; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA.
 *
 * Please contact Oracle, 500 Oracle Parkway, Redwood Shores, CA 94065 USA
 * or visit www.oracle.com if you need additional information or have any
 * questions.
 */
/****
 *  1 . By chance, I managed to see the source code so I have decided to stay ISO code
 */
type reversed       = { new<T>(compare: comparator<T>): comparator<T> };
type NullComparator<T> = {  new<T>(nullFirst:boolean, comparator: comparator<T>): comparator<T> };
/****
 *
 */
export abstract class Comparators<T> {
    /****
     *
     */
    private constructor() { throw new RuntimeException("no usage inside !"); }
    /****
     *
     */
    public static reversed:reversed = class Reversed<T> implements comparator<T>{
        private readonly comparator: comparator<T>;

        constructor(comparator:comparator<T>) {this.comparator = comparator;}

        public compare(o1: T, o2: T): number {
            return Object.isNull(this.comparator) ? 0 : -this.comparator.compare(o1,o2);
        }

        public reversed<T>(): comparator<T>{return <comparator<T>><comparator<Object>>Comparators.naturalOrder;}

        public thenComparing<U extends T>( other: comparator<T> ):Reversed<T>{
            return new Reversed<T>( Object.isNull(other) ? other : this.comparator );
        }

        public thenComparingFn<T, U extends comparable<U>>(comparatorFn: comparatorFn<T, U>, comparator: comparator<T>): comparator<T> {
            return undefined;
        }
    }
    /***
     *
     */
    public static naturalOrder:comparator<comparable<Object>> = new class NaturalOrder<T> implements comparator<comparable<Object>>{

        public compare(o1: comparable<Object>, o2: comparable<Object>): number {
            return o1.compareTo(o2);
        }

        public reversed<T extends comparable<T>>(): comparator<comparable<T>> {return Collection.reverseOrder<T>();}

    };
    /****
     *
     */
    public static NullComparator:NullComparator<Object> = class NullComparators<T> implements comparator<T>{

        private readonly nullFirst:boolean;
        private readonly comparator: comparator<T>;

        constructor(nullFirst:boolean, comparator:comparator<T>) {
            this.nullFirst  = nullFirst;
            this.comparator = comparator;
        }

        public compare(o1: T, o2: T): number {
            let a:Define<T> = Define.of(o1),
                b:Define<T> = Define.of(o2);
            if(a.isNull()) return b.isNull() ? 0 : ( this.nullFirst ? -1 : 1 );
            else if( b.isNull() ){
                return this.nullFirst ? 1 : -1;
            }else{
                return Define.of(this.comparator ).isNull() ? 0 : this.comparator.compare(o1,o2);
            }
        }

        /*public reversed<U extends T>(): comparator<T>{
          //  return new NullComparators<T>(!this.nullFirst, Object.isNull(this.comparator) ? null : this.comparator.reversed());
        }*/

        public thenComparing<U extends T>( other: comparator<T> ):NullComparators<T>{
             Object.requireNotNull(other);
            return new NullComparators<T>(this.nullFirst, Object.isNull(other) ? other : this.comparator );
        }

        public thenComparingFn<T, U extends comparable<U>>(comparatorFn: comparatorFn<T, U>, comparator: comparator<T>): comparator<T> {
            return undefined;
        }

    }
    /***/
}