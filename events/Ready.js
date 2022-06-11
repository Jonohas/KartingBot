import Modules from 'waffle-manager';

export default class Ready extends Modules.EventHandler.BaseEvent {
    constructor() {
        this.name = "ready";
        this.once = true;
    }

    execute(client) {
        log.info("bot",`Ready! Logged in as ${client.user.tag}`);
    }

}