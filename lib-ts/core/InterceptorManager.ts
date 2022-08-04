//Interceptor拦截器实现
// export interface interceptorCall

export interface Interceptor {
	fulfilled: Function;
	rejected?: Function;
}

export class InterceptorManager {
	handlers: Array<Interceptor>;

	constructor() {
		this.handlers = [];
	}

	use(fulfilled: Function, rejected?: Function) {
		this.handlers.push({
			fulfilled,
			rejected,
		});
	}

	forEach(fn: Function) {
		for (let handlers of this.handlers) fn(handlers);
	}
}
