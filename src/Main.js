import Modules from 'waffle-manager';
import log from '@/src/util/Logger.js'
import { resolve as resolvePath } from 'path';
import { loadJson } from '@/src/util/Util.js';


export class Main {
    constructor() {
        ['beforeExit', 'SIGTERM', 'SIGINT'].map(signal => process.on(signal, this.cleanup.bind(this)));

        this.config = loadJson('/data/auth.json'); // Path based on root of project
    }

    get log() {
        return log;
    }

    async cleanup() {
        await Modules.cleanup();

        process.exit();
    }

    async init() {
        await Modules.load(this, resolvePath('./src/modules/'));
    }
}