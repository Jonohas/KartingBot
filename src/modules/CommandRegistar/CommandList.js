import Ping from '@/commands/Informative/Ping.js';

export default class CommandList {

    static commands = [
        new Ping(this)
    ]

}