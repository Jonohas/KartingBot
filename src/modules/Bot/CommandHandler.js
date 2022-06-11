import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageActionRow, MessageEmbed, MessageSelectMenu, MessageButton } from 'discord.js';
import { Collection } from 'discord.js';

export class CommandHandler {
    constructor(main) {
        this.client = main.client;
        this.log = main.log;
        this.config = main.config;
    }

    get commands() {
        const commands = [
            this.createEvent,
            this.ping
        ]
        const commandsCollection = new Collection();

        for (const command of commands) {
            commandsCollection.set(command.data.name, command)
        }
        return commandsCollection;
    }

    get createEvent() {
        const createEmbed = {
            color: 0x0099ff,
            title: 'New karting event!',
            description: 'Somebody asked to start an event',
        
            timestamp: new Date(),
        };

        const selectRow = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                .setCustomId('select')
                .setPlaceholder('Nothing selected')
                .addOptions([
                    {
                        label: 'Select me',
                        description: 'This is a description',
                        value: 'first_option',
                    },
                    {
                        label: 'You can select me too',
                        description: 'This is also a description',
                        value: 'second_option',
                    },
                ]),
            );

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