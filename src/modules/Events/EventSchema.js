import Modules from 'waffle-manager';
import mongoose from 'mongoose';


const date = new mongoose.Schema({
    label: { type: String },
    description: {type: String},
    value: {type: Date},
    attendants: [{type: String}]
})

const event = new mongoose.Schema({
    name: { type: String, unique: true, required: 'Name is required'},
    dates: [date],
    notComming: [{type: String}]
});

export default {
    EventSchema: event,
    EventModel: mongoose.model('events', event)
};