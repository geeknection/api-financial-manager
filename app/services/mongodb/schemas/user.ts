import MongoConnection from "../connection";

interface User {
    login: string;
    email: string;
    name: string;
    password: string;
    birthDate: string;
}

const Users = new MongoConnection.Schema<User>({
    login: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    birthDate: {
        type: String,
        required: true
    }
}, {
    collection: 'Users'
});

const UsersSchema = MongoConnection.model<User>('Users', Users, 'Users');

export default UsersSchema;