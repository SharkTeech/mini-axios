import { defaultConfig } from '../default';
import { mergeConfig } from '../mergeConfig';

export class Axios {
	constructor(config) {
		const requsetConfig = mergeConfig(defaultConfig, config);
		this.url = requsetConfig.url;
		this.method = requsetConfig.method;
	}
}
