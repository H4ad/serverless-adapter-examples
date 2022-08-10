"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var standalone_1 = require("@trpc/server/adapters/standalone");
var setup_1 = require("./setup");
var listen = (0, standalone_1.createHTTPServer)(__assign({ router: setup_1.appRouter }, setup_1.frameworkOptions)).listen;
var port = +(process.env.PORT || 0) || 3000;
listen(port);
console.log("tRPC started in http://localhost:".concat(port));
