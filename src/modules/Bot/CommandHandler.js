import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageActionRow, MessageEmbed, MessageSelectMenu, MessageButton } from 'discord.js';
import { Collection } from 'discord.js';
import Modules from 'waffle-manager';

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
            this.ping,
            this.coming
        ];
    }

    get createEvent() {
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
                    option.setName('name')
                        .setDescription('The name to give to the event')
                        .setRequired(true))
                .addStringOption(option =>
                    option.setName('dates')
                        .setDescription('Dates for this event')
                        .setRequired(true)),

            async execute(interaction) {
                let user = interaction.user;
                let eventName = interaction.options._hoistedOptions[0].value;
                let dates = interaction.options._hoistedOptions[1].value;

                const createEmbed = {
                    color: 0x0099ff,
                    title: `${eventName}`,
                    description: `@${user.username}#${user.discriminator} created an event`,
                
                    timestamp: new Date(),
                };

                dates = dates.split(',');

                let selectOptions = [];

                const eventObject = {
                    name: eventName,
                    dates: []
                }
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
                    eventObject.dates.push({
                        label: date.toDateString(),
                        value: date.toISOString(),
                        description: "This is a suggested day for the event",
                        attendants: []
                    })
                }
                await Modules.events.createEvent(eventObject);
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

    get coming() {
        return {
            data: new SlashCommandBuilder()
                .setName('coming')
                .setDescription('Returns a list of people who are coming to the event'),
            async execute(interaction) {
                await interaction.reply('List');
            }
            
        }
    }

}