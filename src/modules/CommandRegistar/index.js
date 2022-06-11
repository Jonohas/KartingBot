import { ModuleBuilder } from 'waffle-manager';
import CommandList from './CommandList.js';
import BaseCommand from './structures/BaseCommand.js';

const name = 'CommandRegistar';

export const ModuleInfo = new ModuleBuilder(name);

export const ModuleInstance = class {

    constructor(main) {
        this.name = name;
        this.config = main.config.mongo;
        this.permissions = main.config.permissions;
        this.log = main.log;

        this.commandList = CommandList.commands;

        Object.assign(this, { BaseCommand });
    }

    //required for Modules.load() using waffle manager
    async init() {
        this.log.info(name.toUpperCase(), `Starting ${name}...`);

        return true;
    }

    //required for Modules.cleanup() using waffle manager
    async cleanup() {}

}