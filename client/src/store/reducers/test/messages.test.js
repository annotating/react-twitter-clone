import {messages} from '../messages';
import {LOAD_MESSAGES, REMOVE_MESSAGE} from '../../actionTypes';

describe('messages reducer', () => {
    test('returns initial state', () => {
        expect(messages(undefined, {})).toEqual([]);
    })
    
    test('adds messages', () => {
        let action = {
            type: LOAD_MESSAGES,
            messages: [{text: 'test'}, {text: 'blurb'}]
        }
        let afterState = expect(undefined, action);
        expect(afterState.size).toEqual(action.messages.size);
    })
    
    test('removes message', () => {
        let beforeState = {messages: [{_id: 17}, {_id: 21}, {_id: 33}, {_id: 42}]};
        let action = {
            type: REMOVE_MESSAGE,
            id: 33
        }
        let afterState = messages(beforeState, action);
        expect(afterState.map(obj => obj._id)).not.toContain(action.id);
    })
})

