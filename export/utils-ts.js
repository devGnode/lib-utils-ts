const  {Define} = require("../src/Define");
const {Stream,AbstractObjectStream,ObjectStream} = require("../src/Stream");
const {Optional}  = require("../src/Optional");
const {Iterator,ListIterator} = require("../src/Iterator");
const {IndexOfBoundException,NullPointerException,NoSuchElementException,RuntimeException}  = require("../src/Exception");
const {
    AbstractCollection, AbstractList, AbstractSet,
    SetList, MapEntry, AbstractMap,ArrayList, HashMap
} = require('../src/List');

module.exports = {
    AbstractCollection:AbstractCollection,
    AbstractList:AbstractList,
    AbstractSet:AbstractSet,
    SetList:SetList,
    MapEntry:MapEntry,
    AbstractMap:AbstractMap,
    ArrayList:ArrayList,
    HashMap:HashMap,
    Iterator:Iterator,
    ListIterator:ListIterator,
    Optional:Optional,

    AbstractObjectStream:AbstractObjectStream,
    Stream:Stream,
    ObjectStream:ObjectStream,

    Define:Define,

    IndexOfBoundException:IndexOfBoundException,
    NullPointerException:NullPointerException,
    NoSuchElementException:NoSuchElementException,
    RuntimeException:RuntimeException
};