import {CLOSE_MODAL, CLOSE_POPOUT, GO_BACK, OPEN_MODAL, OPEN_POPOUT, SET_PAGE, SET_STORY} from './actionTypes';

export const setStory = (story, initial_panel) => (
    {
        type: SET_STORY,
        payload: {
            story: story,
            initial_panel: initial_panel,
        }
    }
);

export const setPage = (view, panel) => (
    {
        type: SET_PAGE,
        payload: {
            view: view,
            panel: panel
        }
    }
);

export const goBack = () => (
    {
        type: GO_BACK
    }
);

export const openPopout = (popout) => (
    {
        type: OPEN_POPOUT,
        payload: {
            popout: popout
        }
    }
);

export const closePopout = () => (
    {
        type: CLOSE_POPOUT
    }
);

export const openModal = (id) => (
    {
        type: OPEN_MODAL,
        payload: {
            id
        }
    }
);

export const closeModal = () => (
    {
        type: CLOSE_MODAL
    }
);
