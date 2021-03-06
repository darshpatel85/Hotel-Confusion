import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl.js';
export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
})

export const postComment = (dishId, rating, author, comment) => (dispatch) => {

    const newComment = {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    };
    newComment.date = new Date().toISOString();

    return fetch(baseUrl + 'comments', {
        method: "POST",
        body: JSON.stringify(newComment),
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                throw error;
            })
        .then(response => response.json())
        .then(response => dispatch(addComment(response)))
        .catch(error => { console.log('post comments', error.message); alert('Your comment could not be posted\nError: ' + error.message); });
};

export const postFeedback = (firstname, lastname, telnum, email, agree, contactType,message) => (dispatch) => {
    var newFeedback = {
        firstname: firstname,
        lastname: lastname,
        telnum: telnum,
        email: email,
        agree: agree,
        contactType: contactType,
        message: message,
    };
    newFeedback.date = new Date().toISOString();
    return fetch(baseUrl + 'feedback', {
        method: "POST",
        body: JSON.stringify(newFeedback),
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                throw error;
            })
        .then(response => response.json())
        .then(responce => alert(JSON.stringify(responce)))
        .catch(error => { console.log('Feedback/ :', error.message); alert('Your feedback could not be posted\nError: ' + error.message); });
};

export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading(true));

    return fetch(baseUrl + 'dishes').then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ' : ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
        error => {
            var err = new Error(error.message);
            throw err;
        }).then(response => response.json())
        .then(dishes => dispatch(addDishes(dishes)))
        .catch(err => dispatch(dishesFailed(err.message)));
}
export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (err) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: err
});

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});

export const fetchPromos = () => (dispatch) => {
    dispatch(promosLoading(true));

    return fetch(baseUrl + 'promotions').then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ' : ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
        error => {
            var err = new Error(error.message);
            throw err;
        }).then(response => response.json())
        .then(promos => dispatch(addPromos(promos)))
        .catch(err => dispatch(promosFailed(err.message)));
}
export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (err) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: err
});

export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
});

export const fetchComments = () => (dispatch) => {
    return fetch(baseUrl + 'comments').then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ' : ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
        error => {
            var err = new Error(error.message);
            throw err;
        }).then(response => response.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(err => dispatch(commentsFailed(err.message)));
}

export const commentsFailed = (err) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: err
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});


export const fetchLeaders = () => (dispatch) => {
    dispatch(leadersLoading(true));

    return fetch(baseUrl + 'leaders').then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ' : ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
        error => {
            var err = new Error(error.message);
            throw err;
        }).then(response => response.json())
        .then(Leaders => dispatch(addLeaders(Leaders)))
        .catch(err => dispatch(leadersFailed(err.message)));
}
export const leadersLoading = () => ({
    type: ActionTypes.LEADERS_LOADING
});

export const leadersFailed = (err) => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: err
});

export const addLeaders = (leaders) => ({
    type: ActionTypes.ADD_LEADERS,
    payload: leaders
});