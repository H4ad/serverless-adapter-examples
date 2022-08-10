"use strict";
exports.__esModule = true;
exports.handler = void 0;
var serverless_adapter_1 = require("@h4ad/serverless-adapter");
var aws_1 = require("@h4ad/serverless-adapter/lib/adapters/aws");
var trpc_1 = require("@h4ad/serverless-adapter/lib/frameworks/trpc");
var default_1 = require("@h4ad/serverless-adapter/lib/handlers/default");
var promise_1 = require("@h4ad/serverless-adapter/lib/resolvers/promise");
var setup_1 = require("./setup");
var framework = new trpc_1.TrpcFramework(setup_1.frameworkOptions);
exports.handler = serverless_adapter_1.ServerlessAdapter["new"](setup_1.appRouter)
    .setFramework(framework)
    .setHandler(new default_1.DefaultHandler())
    .setResolver(new promise_1.PromiseResolver())
    .addAdapter(new aws_1.ApiGatewayV2Adapter())
    .addAdapter(new aws_1.SQSAdapter())
    .build();
