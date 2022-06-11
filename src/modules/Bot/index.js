import Modules, { ModuleBuilder } from 'waffle-manager';

import fs from 'node:fs';
import path from 'node:path';


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

        //this.ch = new CommandHandler();
        
        this.eh = new EventHandler(this);
        

        this.client = new Client({ intents: [Intents.FLAGS.GUILDS] });
    }

    init() {
        this.log.info(this.name, 'Started!');

        this.client.commands = new Collection();
        const commands = Modules.CommandRegistar.commandList;

        for (const command of commands) {
            this.client.commands.set(command.name, command.command);
        }


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