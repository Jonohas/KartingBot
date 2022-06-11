import Modules from 'waffle-manager';
import log from '@/src/util/Logger.js'
export class EventHandler {
    constructor(main) {
        this.log = main.log;
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
                        let userId = interaction.user.id;
                        let eventName = interaction.message.embeds[0].title;

                        let event = await Modules.events.getEvent({name:eventName});
                        
                        for (const d of event.dates) {

                            if (d.attendants.includes(userId)) {
                                var filtered = event.notComming.filter(function(value, index, arr){ 
                                    return value != userId;
                                });
                                d.attendants = filtered;
                            }
                        }
                        
                        event.notComming.push(userId);
                        let ue = await Modules.events.updateEvent({name: eventName}, event);
                        
                        await interaction.reply({content: `Tis al goed saai mens!`, ephemeral: true});
                    }

                }
        
                if (interaction.isSelectMenu()) {
                    if (interaction.message.interaction.commandName === "create") {
                        let userId = interaction.user.id;
                        let eventName = interaction.message.embeds[0].title;

                        let event = await Modules.events.getEvent({name:eventName});

                        if (event.notComming.includes(userId)) {
                            var filtered = event.notComming.filter(function(value, index, arr){ 
                                return value != userId;
                            });
                            event.notComming = filtered;
                        }

                        for (const d of event.dates) {
                            if (new Date(d.value).toDateString() == new Date(interaction.values[0]).toDateString()){
                                d.attendants.push(userId);
                            }
                        }
                        let ue = await Modules.events.updateEvent({name: eventName}, event);
                        
                        await interaction.update({components: [], ephemeral: true});
                    }
                }
            },
        }
    }

    get ready() {
        return {
            name: 'ready',
            once: true,
            execute(client) {
                log.info("bot",`Ready! Logged in as ${client.user.tag}`);
            },
        }
    }

}