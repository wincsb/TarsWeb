// **********************************************************************
// Parsed By TarsParser(3.0.8), Generated By tools(20200627)
// TarsParser Maintained By <TARS> and tools Maintained By <superzheng>
// Generated from "BenchmarkNode.tars" by Structure Mode
// **********************************************************************

/* eslint-disable */

"use strict";

var assert    = require("assert");
var TarsStream = require("@tars/stream");

var _hasOwnProperty = Object.prototype.hasOwnProperty;

var bm = bm || {};
module.exports.bm = bm;

bm.BMErrCode = {
    "BM_SERVER_ERR_PARAM" : -10000,
    "BM_ADMIN_ERR_NOTFIND" : -10001,
    "BM_ADMIN_ERR_RUNNING" : -10002,
    "BM_ADMIN_ERR_STARTUP" : -10003,
    "BM_ADMIN_ERR_SHUTDOWN" : -10004,
    "BM_ADMIN_ERR_ENCODE" : -10005,
    "BM_ADMIN_ERR_DECODE" : -10006,
    "BM_ADMIN_ERR_SOCKET" : -10007,
    "BM_ADMIN_ERR_TASK" : -10008,
    "BM_ADMIN_ERR_PROTO" : -10009,
    "BM_NODE_ERR_RUNNING" : -20001,
    "BM_NODE_ERR_RESOURCE" : -20002,
    "BM_NODE_ERR_CASEMATCH" : -20003,
    "BM_NODE_ERR_CONNECTION" : -20004,
    "BM_NODE_ERR_ENDPOINT" : -20005,
    "BM_NODE_ERR_RPCCALL" : -20006
};
bm.BMErrCode._classname = "bm.BMErrCode";
bm.BMErrCode._write = function(os, tag, val) { return os.writeInt32(tag, val); };
bm.BMErrCode._read  = function(is, tag, def) { return is.readInt32(tag, true, def); };

bm.TaskState = {
    "TS_IDLE" : 0,
    "TS_RUNNING" : 1,
    "TS_FINISHED" : 2
};
bm.TaskState._classname = "bm.TaskState";
bm.TaskState._write = function(os, tag, val) { return os.writeInt32(tag, val); };
bm.TaskState._read  = function(is, tag, def) { return is.readInt32(tag, true, def); };

bm.ResultStat = function() {
    this.time_stamp = 0;
    this.ret_map = new TarsStream.Map(TarsStream.Int32, TarsStream.Int64);
    this.cost_map = new TarsStream.Map(TarsStream.Int32, TarsStream.Int64);
    this.total_request = 0;
    this.succ_request = 0;
    this.fail_request = 0;
    this.max_time = 0;
    this.min_time = 1000;
    this.total_time = 0;
    this.p999_time = 0;
    this.p99_time = 0;
    this.p90_time = 0;
    this.send_bytes = 0;
    this.recv_bytes = 0;
    this.avg_speed = 0;
    this._classname = "bm.ResultStat";
};
bm.ResultStat._classname = "bm.ResultStat";
bm.ResultStat._write = function (os, tag, value) { os.writeStruct(tag, value); };
bm.ResultStat._read  = function (is, tag, def) { return is.readStruct(tag, true, def); };
bm.ResultStat._readFrom = function (is) {
    var tmp = new bm.ResultStat;
    tmp.time_stamp = is.readInt64(0, false, 0);
    tmp.ret_map = is.readMap(1, false, TarsStream.Map(TarsStream.Int32, TarsStream.Int64));
    tmp.cost_map = is.readMap(2, false, TarsStream.Map(TarsStream.Int32, TarsStream.Int64));
    tmp.total_request = is.readInt64(3, false, 0);
    tmp.succ_request = is.readInt64(4, false, 0);
    tmp.fail_request = is.readInt64(5, false, 0);
    tmp.max_time = is.readDouble(6, false, 0);
    tmp.min_time = is.readDouble(7, false, 1000);
    tmp.total_time = is.readDouble(8, false, 0);
    tmp.p999_time = is.readDouble(9, false, 0);
    tmp.p99_time = is.readDouble(10, false, 0);
    tmp.p90_time = is.readDouble(11, false, 0);
    tmp.send_bytes = is.readInt64(12, false, 0);
    tmp.recv_bytes = is.readInt64(13, false, 0);
    tmp.avg_speed = is.readInt32(14, false, 0);
    return tmp;
};
bm.ResultStat.prototype._writeTo = function (os) {
    os.writeInt64(0, this.time_stamp);
    os.writeMap(1, this.ret_map);
    os.writeMap(2, this.cost_map);
    os.writeInt64(3, this.total_request);
    os.writeInt64(4, this.succ_request);
    os.writeInt64(5, this.fail_request);
    os.writeDouble(6, this.max_time);
    os.writeDouble(7, this.min_time);
    os.writeDouble(8, this.total_time);
    os.writeDouble(9, this.p999_time);
    os.writeDouble(10, this.p99_time);
    os.writeDouble(11, this.p90_time);
    os.writeInt64(12, this.send_bytes);
    os.writeInt64(13, this.recv_bytes);
    os.writeInt32(14, this.avg_speed);
};
bm.ResultStat.prototype._equal = function () {
    assert.fail("this structure not define key operation");
};
bm.ResultStat.prototype._genKey = function () {
    if (!this._proto_struct_name_) {
        this._proto_struct_name_ = "STRUCT" + Math.random();
    }
    return this._proto_struct_name_;
};
bm.ResultStat.prototype.toObject = function() { 
    return {
        "time_stamp" : this.time_stamp,
        "ret_map" : this.ret_map.toObject(),
        "cost_map" : this.cost_map.toObject(),
        "total_request" : this.total_request,
        "succ_request" : this.succ_request,
        "fail_request" : this.fail_request,
        "max_time" : this.max_time,
        "min_time" : this.min_time,
        "total_time" : this.total_time,
        "p999_time" : this.p999_time,
        "p99_time" : this.p99_time,
        "p90_time" : this.p90_time,
        "send_bytes" : this.send_bytes,
        "recv_bytes" : this.recv_bytes,
        "avg_speed" : this.avg_speed
    };
};
bm.ResultStat.prototype.readFromObject = function(json) { 
    _hasOwnProperty.call(json, "time_stamp") && (this.time_stamp = json.time_stamp);
    _hasOwnProperty.call(json, "ret_map") && (this.ret_map.readFromObject(json.ret_map));
    _hasOwnProperty.call(json, "cost_map") && (this.cost_map.readFromObject(json.cost_map));
    _hasOwnProperty.call(json, "total_request") && (this.total_request = json.total_request);
    _hasOwnProperty.call(json, "succ_request") && (this.succ_request = json.succ_request);
    _hasOwnProperty.call(json, "fail_request") && (this.fail_request = json.fail_request);
    _hasOwnProperty.call(json, "max_time") && (this.max_time = json.max_time);
    _hasOwnProperty.call(json, "min_time") && (this.min_time = json.min_time);
    _hasOwnProperty.call(json, "total_time") && (this.total_time = json.total_time);
    _hasOwnProperty.call(json, "p999_time") && (this.p999_time = json.p999_time);
    _hasOwnProperty.call(json, "p99_time") && (this.p99_time = json.p99_time);
    _hasOwnProperty.call(json, "p90_time") && (this.p90_time = json.p90_time);
    _hasOwnProperty.call(json, "send_bytes") && (this.send_bytes = json.send_bytes);
    _hasOwnProperty.call(json, "recv_bytes") && (this.recv_bytes = json.recv_bytes);
    _hasOwnProperty.call(json, "avg_speed") && (this.avg_speed = json.avg_speed);
    return this;
};
bm.ResultStat.prototype.toBinBuffer = function () {
    var os = new TarsStream.TarsOutputStream();
    this._writeTo(os);
    return os.getBinBuffer();
};
bm.ResultStat.new = function () {
    return new bm.ResultStat();
};
bm.ResultStat.create = function (is) {
    return bm.ResultStat._readFrom(is);
};

bm.ExecItem = function() {
    this.proto = "";
    this.service = "";
    this.threads = 0;
    this.links = 0;
    this.speed = 0;
    this._classname = "bm.ExecItem";
};
bm.ExecItem._classname = "bm.ExecItem";
bm.ExecItem._write = function (os, tag, value) { os.writeStruct(tag, value); };
bm.ExecItem._read  = function (is, tag, def) { return is.readStruct(tag, true, def); };
bm.ExecItem._readFrom = function (is) {
    var tmp = new bm.ExecItem;
    tmp.proto = is.readString(0, false, "");
    tmp.service = is.readString(1, false, "");
    tmp.threads = is.readInt32(2, false, 0);
    tmp.links = is.readInt32(3, false, 0);
    tmp.speed = is.readInt32(4, false, 0);
    return tmp;
};
bm.ExecItem.prototype._writeTo = function (os) {
    os.writeString(0, this.proto);
    os.writeString(1, this.service);
    os.writeInt32(2, this.threads);
    os.writeInt32(3, this.links);
    os.writeInt32(4, this.speed);
};
bm.ExecItem.prototype._equal = function () {
    assert.fail("this structure not define key operation");
};
bm.ExecItem.prototype._genKey = function () {
    if (!this._proto_struct_name_) {
        this._proto_struct_name_ = "STRUCT" + Math.random();
    }
    return this._proto_struct_name_;
};
bm.ExecItem.prototype.toObject = function() { 
    return {
        "proto" : this.proto,
        "service" : this.service,
        "threads" : this.threads,
        "links" : this.links,
        "speed" : this.speed
    };
};
bm.ExecItem.prototype.readFromObject = function(json) { 
    _hasOwnProperty.call(json, "proto") && (this.proto = json.proto);
    _hasOwnProperty.call(json, "service") && (this.service = json.service);
    _hasOwnProperty.call(json, "threads") && (this.threads = json.threads);
    _hasOwnProperty.call(json, "links") && (this.links = json.links);
    _hasOwnProperty.call(json, "speed") && (this.speed = json.speed);
    return this;
};
bm.ExecItem.prototype.toBinBuffer = function () {
    var os = new TarsStream.TarsOutputStream();
    this._writeTo(os);
    return os.getBinBuffer();
};
bm.ExecItem.new = function () {
    return new bm.ExecItem();
};
bm.ExecItem.create = function (is) {
    return bm.ExecItem._readFrom(is);
};

bm.NodeStat = function() {
    this.ipaddr = "";
    this.max_speed = 0;
    this.max_threads = 0;
    this.left_speed = 0;
    this.left_threads = 0;
    this.executors = new TarsStream.List(bm.ExecItem);
    this._classname = "bm.NodeStat";
};
bm.NodeStat._classname = "bm.NodeStat";
bm.NodeStat._write = function (os, tag, value) { os.writeStruct(tag, value); };
bm.NodeStat._read  = function (is, tag, def) { return is.readStruct(tag, true, def); };
bm.NodeStat._readFrom = function (is) {
    var tmp = new bm.NodeStat;
    tmp.ipaddr = is.readString(0, false, "");
    tmp.max_speed = is.readInt32(1, false, 0);
    tmp.max_threads = is.readInt32(2, false, 0);
    tmp.left_speed = is.readInt32(3, false, 0);
    tmp.left_threads = is.readInt32(4, false, 0);
    tmp.executors = is.readList(5, false, TarsStream.List(bm.ExecItem));
    return tmp;
};
bm.NodeStat.prototype._writeTo = function (os) {
    os.writeString(0, this.ipaddr);
    os.writeInt32(1, this.max_speed);
    os.writeInt32(2, this.max_threads);
    os.writeInt32(3, this.left_speed);
    os.writeInt32(4, this.left_threads);
    os.writeList(5, this.executors);
};
bm.NodeStat.prototype._equal = function (anItem) {
    return this.ipaddr === anItem.ipaddr;
};
bm.NodeStat.prototype._genKey = function () {
    if (!this._proto_struct_name_) {
        this._proto_struct_name_ = "STRUCT" + Math.random();
    }
    return this._proto_struct_name_;
};
bm.NodeStat.prototype.toObject = function() { 
    return {
        "ipaddr" : this.ipaddr,
        "max_speed" : this.max_speed,
        "max_threads" : this.max_threads,
        "left_speed" : this.left_speed,
        "left_threads" : this.left_threads,
        "executors" : this.executors.toObject()
    };
};
bm.NodeStat.prototype.readFromObject = function(json) { 
    _hasOwnProperty.call(json, "ipaddr") && (this.ipaddr = json.ipaddr);
    _hasOwnProperty.call(json, "max_speed") && (this.max_speed = json.max_speed);
    _hasOwnProperty.call(json, "max_threads") && (this.max_threads = json.max_threads);
    _hasOwnProperty.call(json, "left_speed") && (this.left_speed = json.left_speed);
    _hasOwnProperty.call(json, "left_threads") && (this.left_threads = json.left_threads);
    _hasOwnProperty.call(json, "executors") && (this.executors.readFromObject(json.executors));
    return this;
};
bm.NodeStat.prototype.toBinBuffer = function () {
    var os = new TarsStream.TarsOutputStream();
    this._writeTo(os);
    return os.getBinBuffer();
};
bm.NodeStat.new = function () {
    return new bm.NodeStat();
};
bm.NodeStat.create = function (is) {
    return bm.NodeStat._readFrom(is);
};

bm.QueryRsp = function() {
    this.stat = new bm.ResultStat;
    this.ipaddr = "";
    this._classname = "bm.QueryRsp";
};
bm.QueryRsp._classname = "bm.QueryRsp";
bm.QueryRsp._write = function (os, tag, value) { os.writeStruct(tag, value); };
bm.QueryRsp._read  = function (is, tag, def) { return is.readStruct(tag, true, def); };
bm.QueryRsp._readFrom = function (is) {
    var tmp = new bm.QueryRsp;
    tmp.stat = is.readStruct(0, false, bm.ResultStat);
    tmp.ipaddr = is.readString(1, false, "");
    return tmp;
};
bm.QueryRsp.prototype._writeTo = function (os) {
    os.writeStruct(0, this.stat);
    os.writeString(1, this.ipaddr);
};
bm.QueryRsp.prototype._equal = function () {
    assert.fail("this structure not define key operation");
};
bm.QueryRsp.prototype._genKey = function () {
    if (!this._proto_struct_name_) {
        this._proto_struct_name_ = "STRUCT" + Math.random();
    }
    return this._proto_struct_name_;
};
bm.QueryRsp.prototype.toObject = function() { 
    return {
        "stat" : this.stat.toObject(),
        "ipaddr" : this.ipaddr
    };
};
bm.QueryRsp.prototype.readFromObject = function(json) { 
    _hasOwnProperty.call(json, "stat") && (this.stat.readFromObject(json.stat));
    _hasOwnProperty.call(json, "ipaddr") && (this.ipaddr = json.ipaddr);
    return this;
};
bm.QueryRsp.prototype.toBinBuffer = function () {
    var os = new TarsStream.TarsOutputStream();
    this._writeTo(os);
    return os.getBinBuffer();
};
bm.QueryRsp.new = function () {
    return new bm.QueryRsp();
};
bm.QueryRsp.create = function (is) {
    return bm.QueryRsp._readFrom(is);
};

bm.TaskConf = function() {
    this.proto = "";
    this.service = "";
    this.paralist = new TarsStream.List(TarsStream.String);
    this.endpoints = new TarsStream.List(TarsStream.String);
    this.links = 0;
    this.speed = 0;
    this.runflag = 0;
    this._classname = "bm.TaskConf";
};
bm.TaskConf._classname = "bm.TaskConf";
bm.TaskConf._write = function (os, tag, value) { os.writeStruct(tag, value); };
bm.TaskConf._read  = function (is, tag, def) { return is.readStruct(tag, true, def); };
bm.TaskConf._readFrom = function (is) {
    var tmp = new bm.TaskConf;
    tmp.proto = is.readString(0, false, "");
    tmp.service = is.readString(1, false, "");
    tmp.paralist = is.readList(2, false, TarsStream.List(TarsStream.String));
    tmp.endpoints = is.readList(3, false, TarsStream.List(TarsStream.String));
    tmp.links = is.readInt32(4, false, 0);
    tmp.speed = is.readInt32(5, false, 0);
    tmp.runflag = is.readInt32(6, false, 0);
    return tmp;
};
bm.TaskConf.prototype._writeTo = function (os) {
    os.writeString(0, this.proto);
    os.writeString(1, this.service);
    os.writeList(2, this.paralist);
    os.writeList(3, this.endpoints);
    os.writeInt32(4, this.links);
    os.writeInt32(5, this.speed);
    os.writeInt32(6, this.runflag);
};
bm.TaskConf.prototype._equal = function (anItem) {
    return this.proto === anItem.proto && 
        this.service === anItem.service;
};
bm.TaskConf.prototype._genKey = function () {
    if (!this._proto_struct_name_) {
        this._proto_struct_name_ = "STRUCT" + Math.random();
    }
    return this._proto_struct_name_;
};
bm.TaskConf.prototype.toObject = function() { 
    return {
        "proto" : this.proto,
        "service" : this.service,
        "paralist" : this.paralist.toObject(),
        "endpoints" : this.endpoints.toObject(),
        "links" : this.links,
        "speed" : this.speed,
        "runflag" : this.runflag
    };
};
bm.TaskConf.prototype.readFromObject = function(json) { 
    _hasOwnProperty.call(json, "proto") && (this.proto = json.proto);
    _hasOwnProperty.call(json, "service") && (this.service = json.service);
    _hasOwnProperty.call(json, "paralist") && (this.paralist.readFromObject(json.paralist));
    _hasOwnProperty.call(json, "endpoints") && (this.endpoints.readFromObject(json.endpoints));
    _hasOwnProperty.call(json, "links") && (this.links = json.links);
    _hasOwnProperty.call(json, "speed") && (this.speed = json.speed);
    _hasOwnProperty.call(json, "runflag") && (this.runflag = json.runflag);
    return this;
};
bm.TaskConf.prototype.toBinBuffer = function () {
    var os = new TarsStream.TarsOutputStream();
    this._writeTo(os);
    return os.getBinBuffer();
};
bm.TaskConf.new = function () {
    return new bm.TaskConf();
};
bm.TaskConf.create = function (is) {
    return bm.TaskConf._readFrom(is);
};


