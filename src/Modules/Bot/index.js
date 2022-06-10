import { ModuleBuilder } from 'waffle-manager';

import fs from 'node:fs';
import path from 'node:path';

// Require the necessary discord.js classes
import { Client, Intents, Collection } from 'discord.js';

const name = 'bot';

export const ModuleInfo = new ModuleBuilder(name).addRequired('mongodb');

export const ModuleInstance = class {

    constructor(main) {
        this.name = name;
        this.config = main.config.bot;
        this.log = main.log;

        this.client = new Client({ intents: [Intents.FLAGS.GUILDS] });
    }

    init() {
        this.client.commands = new Collection();
        const commandsPath = path.join(__dirname, 'commands');
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            const command = require(filePath);
            client.commands.set(command.data.name, command);
        }

        const eventsPath = path.join(__dirname, 'events');
        const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

        for (const file of eventFiles) {
            const filePath = path.join(eventsPath, file);
            const event = require(filePath);
            if (event.once) {
                client.once(event.name, (...args) => event.execute(...args));
            } else {
                client.on(event.name, (...args) => event.execute(...args));
            }
        }

        this.client.login(this.config.bot.token);

        return true;
    }

    cleanup() { }
}