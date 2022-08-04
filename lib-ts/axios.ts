import { Axios } from './core/axios';
import { defaultConfig, requestDefaultConfig } from './defaults';
import { CancelToken } from './cancel/cancelToken';

function createInstance(defaultConfig: requestDefaultConfig) {
	interface axios {
		defaultConfig: requestDefaultConfig;
		interceptors: Object;
		request: Function;
	}

	const context = new Axios(defaultConfig) as axios;

	//实现实例能当做方法使用并能调用实例方法
	const instance = context.request.bind(context);

	// Object.entries(context).forEach(entry => {
	// 	if (typeof entry[1] === 'function')
	// 		instance[entry[0]] = entry[1].bind(context);
	// 	else instance[entry[0]] = entry[1];
	// });
	instance['interceptors'] = context['interceptors'];

	return instance;
}

const axios = createInstance(defaultConfig);

axios.CancelToken = CancelToken;

export { axios };
