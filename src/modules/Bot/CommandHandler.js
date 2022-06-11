import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageActionRow, MessageEmbed, MessageSelectMenu, MessageButton } from 'discord.js';

export class CommandHandler {
    constructor(main) {
        this.client = main.client;
        this.log = main.log;
        this.config = main.config;
    }

    get commands() {
        return [
            this.createEvent,
            this.ping
        ]
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
                    option.setName('category')
                        .setDescription('The date of when the event occurs')
                        .setRequired(true)
                        .addChoices( {name: '20/06/2022', value: "20/06/2022"}, {name: '21/06/2022', value: "21/06/2022"})
                ),
            async execute(interaction) {
                console.log(interaction);
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