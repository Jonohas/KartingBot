import Event from './EventSchema.js';
const EventModel = Event.EventModel;

/**
 * 
 * @param {Object} e 
 * @returns {EventModel}
 */
export const createEvent = (e) => {
    return new EventModel(e).save();
};

/**
 * @param {Object} user 
 * @returns {EventModel}
 */
export const deleteEvent = (e) => {
    return EventModel.findOneAndDelete(e).exec();
};

/**
 * Find a user based on a user object
 * @param {Object} q 
 * @param {Boolean} getPassword 
 * @returns {EventModel}
 */
export const getEvent = (q) => {
    return EventModel
        .findOne(q, '-__v')
        .exec();
};

export const getById = (id) => {
    return EventModel.findById(id, '-__v').exec();
}

/**
 * 
 * @param {Object} q query
 * @returns {Array<EventModel>}
 */
export const getEvents = (q) => {
    return EventModel
        .find(q, '-__v')
        .exec();
};

export const updateEvent = (q, update) => {
    return EventModel.findOneAndUpdate(q, update, { new: true }).exec();
};


export default {
    createEvent,
    deleteEvent,
    getEvent,
    getEvents,
    updateEvent,
    getById
};