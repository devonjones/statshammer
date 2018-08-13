/* eslint "import/no-webpack-loader-syntax": 0 */
import thunk from 'redux-thunk'
import logger from 'redux-logger';
import { applyMiddleware } from 'redux'
import createWorkerMiddleWare from 'redux-worker-middleware'
let StatsWorker = require('worker-loader!../workers/stats.worker')
const statsWorkerMiddleware = createWorkerMiddleWare(StatsWorker())
export default applyMiddleware(
	thunk,
	logger,
	statsWorkerMiddleware
)
