import {
	requestDefaultConfig,
	requestUserConfig,
	requestConfig,
} from './defaults';

export function mergeConfig(
	config1: requestDefaultConfig,
	config2: requestUserConfig
): requestConfig {
	const config: requestConfig = {
		url: config2.url, // 接口
		method: config2.method || config1.method, // 请求方法
		data: config2.data || config1.data, // 请求数据
		// params: config2.params || config1.params, // 请求参数
		// adapter: config2.adapter || config1.adapter, // 适配器
		// transformRequest: config2.transformRequest || config1.transformRequest, // 请求数据转换
		// transformResponse: config2.transformResponse || config1.transformResponse, // 响应数据转换
		cancelToken: config2.cancelToken || config1.cancelToken, // 取消请求
		// validateStatus: config2.validateStatus || config1.validateStatus, // 有效状态码
	};

	return config;
}
