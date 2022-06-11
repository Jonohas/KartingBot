import CommandList from '@/src/modules/CommandRegistar/CommandList.js';
import { loadJson } from './src/util/Util.js';

let commands = [];

for (const command of CommandList.commands) {
	commands.push(command.command.data);
}

import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';

const { bot } = loadJson('/data/auth.json');

const rest = new REST({ version: '10' }).setToken(bot.token);

rest.put(Routes.applicationGuildCommands(bot.clientId, bot.guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);