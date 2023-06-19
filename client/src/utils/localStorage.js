export const addUserToLocalStorage = (user) => {
    localStorage.setItem('user', JSON.stringify(user))
}

export const removeUserFromLocalStorage = () => {
    localStorage.removeItem('user')
}


export const getUserFromLocalStorage = () => {
    const userJSON = localStorage.getItem('user');
    if (userJSON) {
        try {
            return JSON.parse(userJSON);
        } catch (error) {
            console.error('Error parsing user data from local storage:', error);
            return null; // or any default value you want to return in case of parsing error
        }
    }
    return null; // or any default value if 'user' key is not found in local storage
};
