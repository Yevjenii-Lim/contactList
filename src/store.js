const ALL_CONTACTS = "ALL_CONTACTS"

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
        default: return state
    }
}

export const addAllContacts = (contacts) => ({type: ALL_CONTACTS, contacts})
export const addContactActionCreator = (contact) => ({type: "ADD_CONTACT", contact})

export default store