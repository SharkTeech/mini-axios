import {
	requestDefaultConfig,
	requestUserConfig,
	getDefaultAdapter,
} from '../defaults';
import { mergeConfig } from '../mergeConfig';
import { Interceptor, InterceptorManager } from './InterceptorManager';

interface interceptors {
	request: InterceptorManager;
	response: InterceptorManager;
}

export class Axios {
	defaultConfig: requestDefaultConfig;
	interceptors: interceptors;

	constructor(defaultConfig: requestDefaultConfig) {
		this.defaultConfig = defaultConfig;
		this.interceptors = {
			request: new InterceptorManager(),
			response: new InterceptorManager(),
		};
	}

	request(userConfig: requestUserConfig) {
		const config = mergeConfig(this.defaultConfig, userConfig);
		const adapter = getDefaultAdapter();

		//请求拦截器链
		const requestInterceptorChain: Array<Function | undefined> = [];
		this.interceptors.request.forEach((interceptor: Interceptor) => {
			requestInterceptorChain.unshift(
				interceptor.fulfilled,
				interceptor.rejected
			);
		});

		//响应拦截器链
		const responseInterceptorChain: Array<Function | undefined> = [];
		this.interceptors.response.forEach((interceptor: Interceptor) => {
			responseInterceptorChain.push(
				interceptor.fulfilled,
				interceptor.rejected
			);
		});

		//生成执行链
		let chain = requestInterceptorChain.concat([adapter, undefined]);
		chain = chain.concat(responseInterceptorChain);

		let promise: any = Promise.resolve(config);

		while (chain.length) {
			promise = promise.then(chain.shift(), chain.shift());
		}

		return promise;
	}
}
