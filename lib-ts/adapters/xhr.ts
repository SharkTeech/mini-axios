import { requestConfig } from '../defaults';

//XMLHttpRequest方式实现
export function xhrAdapter(config: requestConfig): Promise<unknown> {
	return new Promise((resolve, reject) => {
		const request = new XMLHttpRequest();
		request.open(config.method, config.url);
		request.onreadystatechange = function handleLoad() {
			if (!request || request.readyState !== 4) return;
			if (
				request.status === 0 &&
				!(request.responseURL && request.responseURL.indexOf('file:') === 0)
			)
				return;

			const response = {
				data: request.response,
				status: request.status,
				statusText: request.statusText,
				config: config,
				request: request,
			};

			if (request.readyState === 4) {
				if (
					(request.status >= 200 && request.status < 300) ||
					request.status === 304
				) {
					resolve(response);
				} else
					reject(
						new Error(`'Request failed with status code ${request.status}`)
					);
			}
		};

		if (config.cancelToken) {
			const onCanceled = function () {
				reject('cancel');
				request.abort();
			};
			config.cancelToken.subscribe(onCanceled);
		}

		request.send(config.data);
	});
}
