export class BaseConfiguration {
    NODE_ENV: string;
    IS_DEV: boolean;
    GLOBAL_PREFIX: string;

    constructor() {
        this.NODE_ENV = process.env['NODE_ENV'] || 'development';
        this.IS_DEV = process.env['IS_DEV'] === 'development';
        this.GLOBAL_PREFIX = process.env['GLOBAL_PREFIX'] || 'api/v1';
    }
}
