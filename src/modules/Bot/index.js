import { ModuleBuilder } from 'waffle-manager';

import fs from 'node:fs';
import path from 'node:path';

import { CommandHandler } from './CommandHandler.js';

// Require the necessary discord.js classes
import { Client, Intents, Collection } from 'discord.js';
import { EventHandler } from './EventHandler.js';
const __dirname = path.resolve(path.dirname(''));

const name = 'bot';

export const ModuleInfo = new ModuleBuilder(name).addRequired('mongodb');

export const ModuleInstance = class {

    constructor(main) {
        this.name = name;
        this.config = main.config.bot;
        this.log = main.log;

        this.ch = new CommandHandler();
        this.eh = new EventHandler();
        

        this.client = new Client({ intents: [Intents.FLAGS.GUILDS] });
    }

    init() {
        this.log.info(this.name, 'Started!');

        this.client.commands = this.ch.commands;
        for (const event of this.eh.events) {
            if (event.once) {
                this.client.once(event.name, (...args) => event.execute(...args));
            } else {
                this.client.on(event.name, (...args) => event.execute(...args));
            }
        }

        this.client.login(this.config.token);

        return true;
    }

    cleanup() { }
}