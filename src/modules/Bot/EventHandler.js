
export class EventHandler {
    constructor() {

    }

    get events() {
        const events = [
            this.interactionCreate,
            this.ready
        ];

        return events;
    }

    get interactionCreate() {
        return {
            name: 'interactionCreate',
            
            async execute(interaction) {
                const client = interaction.client;
        
                if (interaction.isCommand()) {
                    const command = client.commands.get(interaction.commandName);
        
                    if (!command) return;
                
                    try {
                        await command.execute(interaction);
                    } catch (error) {
                        console.error(error);
                        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
                    }
                }
        
                if (interaction.isButton()) {
                    if (interaction.message.interaction.commandName === "create") {
                        console.log(interaction);
                        await interaction.reply({content: `Ik niet button pressed! ${interaction.message.id}`, ephemeral: true});
                    }

                }
        
                if (interaction.isSelectMenu()) {
                    await interaction.reply({ content: 'Something was selected!', ephemeral: true });
                }
            },
        }
    }

    get ready() {
        return {
            name: 'ready',
            once: true,
            execute(client) {
                console.log(`Ready! Logged in as ${client.user.tag}`);
            },
        }
    }

}