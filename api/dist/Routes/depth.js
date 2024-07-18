"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.depthRouter = void 0;
const express_1 = require("express");
const Redismanager_1 = require("../lib/Redismanager");
const types_1 = require("../lib/types");
exports.depthRouter = (0, express_1.Router)();
//api/v1/order/depth
exports.depthRouter.get('/', function (req, res) {
    const { symbol } = req.query;
    const r = Redismanager_1.RedisManger.getInstance().sendAndAwait({
        type: types_1.GET_DEPTH,
        data: {
            market: symbol
        }
    });
    //@ts-ignore
    res.json(r.payload);
});
