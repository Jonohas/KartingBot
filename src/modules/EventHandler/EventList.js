import Ready from '@/events/Ready.js';

export default class EventList {

    static events = [
        new Ready(this)
    ]

}