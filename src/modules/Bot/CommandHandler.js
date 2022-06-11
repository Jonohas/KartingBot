import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageActionRow, MessageEmbed, MessageSelectMenu, MessageButton } from 'discord.js';
import { Collection } from 'discord.js';

export class CommandHandler {
    constructor() {

    }

    get commands() {

        const commandsCollection = new Collection();

        for (const command of this.commandList) {
            commandsCollection.set(command.data.name, command)
        }
        return commandsCollection;
    }

    get commandList() {
        return [
            this.createEvent,
            this.ping
        ];
    }

    get createEvent() {
        const createEmbed = {
            color: 0x0099ff,
            title: 'New karting event!',
            description: 'Somebody asked to start an event',
        
            timestamp: new Date(),
        };



        const buttonRow = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('secondary')
                        .setLabel('Ik kom niet!')
                        .setStyle('SECONDARY')
                        .setEmoji('❌')
                );

        return {
	
            data: new SlashCommandBuilder()
                .setName('create')
                .setDescription('Creates an event on certain date')
                .addStringOption(option =>
                    option.setName('input')
                        .setDescription('The input to echo back')
                        .setRequired(true)),

            async execute(interaction) {
                let dates = interaction.options._hoistedOptions[0].value;
                dates = dates.split(',');

                let selectOptions = [];
                for (const dateString of dates) {
                    const arr = dateString.split("/");

                    const year = arr[2];
                    const month = arr[1];
                    const day = arr[0];

                    const date = new Date(year, parseInt(month) - 1, day);

                    selectOptions.push({
                        label: date.toDateString(),
                        description: "This is a suggested day for the event",
                        value: date.toISOString()
                    })
                }
                const selectRow = new MessageActionRow()
                    .addComponents(
                        new MessageSelectMenu()
                        .setCustomId('select')
                        .setPlaceholder('Nothing selected')
                        .addOptions(selectOptions),
                    );
                await interaction.reply({embeds: [createEmbed], components: [selectRow, buttonRow]});
            },
        };
    }

    get ping() {
        return {
            data: new SlashCommandBuilder()
                .setName('ping')
                .setDescription('Replies with Pong!'),
            async execute(interaction) {
                await interaction.reply('Pong!');
            },
        }
    }

}