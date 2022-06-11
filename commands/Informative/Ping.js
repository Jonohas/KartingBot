
import { SlashCommandBuilder } from '@discordjs/builders';
import Modules from 'waffle-manager';

export default class Ping extends Modules.CommandRegistar.BaseCommand {
    constructor(main) {
        super();
        this._m = main;

        this.name = "ping";
        this.description = "Replies with Pong!";
    }

    async execute(interaction) {
        await interaction.reply('Pong!');
    }

    get command() {
        return {
            data: new SlashCommandBuilder()
                .setName(this.name)
                .setDescription(this.description),

            execute: this.execute.bind(this)
        }
    }
}