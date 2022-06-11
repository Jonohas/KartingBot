import { ModuleBuilder } from 'waffle-manager';
import EventModel from './EventModel.js';

const name = 'events';

export const ModuleInfo = new ModuleBuilder(name).addRequired('mongodb');

export const ModuleInstance = class {

    constructor(main) {
        this.name = name;
        this.config = main.config.mongo;
        this.log = main.log;
    }

    createEvent(event) {
        return EventModel.createEvent(event);
    }

    deleteEvent(event) {
        return EventModel.deleteUser(user);
    }

    getEvent(q) {
        return EventModel.getEvent(q);
    }

    getById(id) {
        return EventModel.getById(id);
    }

    getEvents(q) {
        return EventModel.getEvents(q);
    }

    updateEvent(event, update) {
        return EventModel.updateEvent(event, update);
    }

    init() { 
        this.log.info(name.toUpperCase(), `Starting ${name}...`);
        return true; 
    }

    cleanup() { }


}