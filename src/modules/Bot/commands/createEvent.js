const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageEmbed, MessageSelectMenu, MessageButton } = require('discord.js');
// inside a command, event listener, etc.
const exampleEmbed = {
	color: 0x0099ff,
	title: 'New karting event!',
	description: 'Somebody asked to start an event',

	timestamp: new Date(),
};

const row = new MessageActionRow()
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
const row1 = new MessageActionRow()
			.addComponents(
				new MessageButton()
				.setCustomId('secondary')
				.setLabel('Ik kom niet!')
				.setStyle('SECONDARY')
				.setEmoji('❌')
			);


module.exports = {
	
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
		await interaction.reply({embeds: [exampleEmbed], components: [row, row1]});
	},
};