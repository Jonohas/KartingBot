import { ModuleBuilder } from 'waffle-manager';

import fs from 'node:fs';
import path from 'node:path';

import CommandReader from '../../util/CommandReader.cjs';
const { readCommand } = CommandReader;

import { CommandHandler } from './CommandHandler.js';

// Require the necessary discord.js classes
import { Client, Intents, Collection } from 'discord.js';
const __dirname = path.resolve(path.dirname(''));

const name = 'bot';

export const ModuleInfo = new ModuleBuilder(name).addRequired('mongodb');

export const ModuleInstance = class {

    constructor(main) {
        this.name = name;
        this.config = main.config.bot;
        this.log = main.log;

        this.ch = new CommandHandler(this);
        

        this.client = new Client({ intents: [Intents.FLAGS.GUILDS] });
    }

    init() {
        this.log.info(this.name, 'Started!');

        

        this.client.commands = new Collection();

        for (const c of this.ch.commands) {
            this.client.commands.set(c.data.name, c)
        }


        const eventsPath = path.join(__dirname, 'src/modules/Bot/events');
        const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

        for (const file of eventFiles) {
            const filePath = path.join(eventsPath, file);
            const event = readCommand(filePath);
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