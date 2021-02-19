const ALL_CONTACTS = "ALL_CONTACTS"
const REMOVE_CONTACT = "REMOVE_CONTACT"
const OPEN_MORE = "OPEN_MORE"

let store = {
    _state: {
        contacts: []
    },
    getState() {
        return this._state
    },
    _render() {
        console.log('render')
    },
    subscriber(app) {
       
        this._render = app
    },
    dispatch (action)  {
        // console.log(action())
        this._state = contactsReducer(this._state, action)
        // this._state = contactsReducer(this._state, action)
        this._render()
    }
   
}

let contactsReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_CONTACT': {
            // console.log(state.contacts)
            return {
                ...state,
                contacts: [...state.contacts, action.contact]
            }
        }
        case ALL_CONTACTS : {
            // debugger
            return {
                ...state,
                contacts: [...action.contacts]
            }
        }
        case REMOVE_CONTACT: {
            let contactsCopy = [...state.contacts]
            let index = contactsCopy.findIndex(i => i.id === action.id)
            contactsCopy.splice(index,1)
            return {
                ...state,
                contacts: contactsCopy
            }
        }
        case OPEN_MORE: {
    
            let contactsCopy = [...state.contacts];
            let index = contactsCopy.findIndex(i => i.id === action.id)
            contactsCopy.forEach(i => i.openMore = true)
            contactsCopy[index].openMore = !action.bool
            return {
                ...state,
                contacts: contactsCopy
            }
        }
        default: return state
    }
}

export const openMoreAC = (id, bool) => ({type: OPEN_MORE, id, bool})
export const addAllContacts = (contacts) => ({type: ALL_CONTACTS, contacts})
export const addContactActionCreator = (contact) => ({type: "ADD_CONTACT", contact})
export const removeContact = (id) => ({type: REMOVE_CONTACT, id})

export default store