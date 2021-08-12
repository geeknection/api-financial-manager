"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    invalid_fields: 'Invalid fields',
    invalid_session: 'Invalid session',
    validator: {
        password: {
            requireUpperCase: 'Password must contain at least one uppercase letter',
            requireLowerCase: 'Password must contain at least one lowercase letter',
            requireANumber: 'Password must contain at least one number',
            requireSpecialChar: 'Password must contain at least one special character',
        },
        email: {
            invalid: 'This Email is not valid'
        },
        yearsOld: 'You must be over 18 to register',
        emailExist: 'This email already exists',
        loginExist: 'This login already exists',
        incompleteName: 'Incomplete name',
        invalidDescription: 'Invalid description',
        cannotUpdate: 'Could not update',
        invalidIncome: 'Invalid input value. Enter a value equal to or greater than zero.',
        invalidOutflow: 'Invalid output value. Please enter a value equal to or greater than zero.'
    },
    cannotCreateUser: 'Unable to create user',
    auth: {
        userNotFoundInvalidCredentials: 'User not found. Check your login or password.'
    }
};
//# sourceMappingURL=en-us.js.map