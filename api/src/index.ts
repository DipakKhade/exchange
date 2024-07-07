
import express ,{json,Express}from 'express';
import cors from 'cors';
import { OrderRouter } from './Routes/order';
import { depthRouter } from './Routes/depth';
import { KlinesRouter } from './Routes/kline';
import { tradesRouter } from './Routes/trades';
import { tickerRouter } from './Routes/ticker';

const app:Express=express();
app.use(cors());
app.use(json());


app.use('/api/v1/order',OrderRouter)
app.use('/api/v1/depth',depthRouter)
app.use('/api/v1/kilnes',KlinesRouter)
app.use('/api/v1/trades',tradesRouter)
app.use('/api/v1/tickers',tickerRouter)