"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tradesRouter = void 0;
const express_1 = require("express");
exports.tradesRouter = (0, express_1.Router)();
exports.tradesRouter.get('/', (req, res) => {
    res.json({
        trades: "trades"
    });
});
