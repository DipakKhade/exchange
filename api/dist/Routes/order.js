"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRouter = void 0;
const express_1 = require("express");
const types_1 = require("../lib/types");
const Redismanager_1 = require("../lib/Redismanager");
exports.OrderRouter = (0, express_1.Router)();
exports.OrderRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { market, price, quantity, side, userId } = req.body;
    console.log("place order==>", { market, price, quantity, side, userId });
    yield Redismanager_1.RedisManger.getInstance().sendAndAwait({
        type: types_1.CREATE_ORDER,
        data: {
            market, price, quantity, side, userId
        }
    });
}));
exports.OrderRouter.delete('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId, market } = req.body;
    console.log("delete_order ==>", { orderId, market });
    yield Redismanager_1.RedisManger.getInstance().sendAndAwait({
        type: types_1.CANCEL_ORDER,
        data: { orderId, market }
    });
}));
exports.OrderRouter.get('/open', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //passing a userid and market in query
    const { userId, market } = req.query;
    yield Redismanager_1.RedisManger.getInstance().sendAndAwait({
        type: types_1.GET_OPEN_ORDERS,
        data: {
            userId: userId,
            market: market
        }
    });
}));
