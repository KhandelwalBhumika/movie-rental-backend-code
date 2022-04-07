const mongoose = require('mongoose');

// const ROLE = {
//     ADMIN: 'admin',
//     BASIC: 'basic'
// }

const roleSchema = {
    roleName: {
        type: String
    },
    // ROLE : ROLE,

    userManagement: {
        create: {
            type: Boolean
        },
        edit: {
            type: Boolean
        },
        update: {
            type: Boolean

        },
        delete: {
            type: Boolean
        }
    },

    movieManagement: {
        create: {
            type: Boolean
        },
        edit: {
            type: Boolean
        },
        update: {
            type: Boolean
        },
        delete: {
            type: Boolean
        }
    }
}


module.exports = mongoose.model('Role', roleSchema)





// const ROLES_LIST = {
//     "admin": 5150,
//     "Editor": 1984,
//     "User": 2001
// }

// module.exports = ROLES_LIST