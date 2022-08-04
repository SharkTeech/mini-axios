//cancelToken实现
export class CancelToken {
	_listeners: Array<Function>;

	constructor(executor: Function) {
		executor(() => {
			for (let listener of this._listeners) listener();
		});
		this._listeners = [];
	}

	subscribe(onCanceled: Function) {
		this._listeners.push(onCanceled);
	}
}
