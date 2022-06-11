

import { ModuleBuilder } from 'waffle-manager';
import EventList from './EventList.js';
import BaseEvent from './structures/BaseEvent.js';

const name = 'EventHandler';

export const ModuleInfo = new ModuleBuilder(name);

export const ModuleInstance = class {

    constructor(main) {
        this.name = name;
        this.config = main.config.mongo;
        this.log = main.log;

        this.eventList = EventList.events;

        Object.assign(this, { BaseEvent });
    }

    //required for Modules.load() using waffle manager
    async init() {
        this.log.info(name.toUpperCase(), `Starting ${name}...`);

        return true;
    }

    //required for Modules.cleanup() using waffle manager
    async cleanup() {}

}