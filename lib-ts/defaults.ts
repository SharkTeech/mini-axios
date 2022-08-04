import { xhrAdapter } from './adapters/xhr';
import { CancelToken } from './cancel/cancelToken';

export enum requestMethods {
	'get' = 'get',
	'push' = 'push',
	'GET' = 'get',
	'POST' = 'post',
}

export interface requestDefaultConfig {
	method: requestMethods;
	data?: any;
	cancelToken?: CancelToken;
}

export interface requestUserConfig {
	baseUrl?: string;
	url: string;
	method?: requestMethods;
	data?: any;
	cancelToken?: CancelToken;
}

export interface requestConfig {
	url: string;
	method: requestMethods;
	data: any;
	cancelToken?: CancelToken;
}

export const defaultConfig: requestDefaultConfig = {
	method: requestMethods.GET,
};

export function getDefaultAdapter() {
	let adapter!: Function;
	if (typeof XMLHttpRequest !== 'undefined') adapter = xhrAdapter;
	return adapter;
}
