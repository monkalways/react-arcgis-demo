export const SIDEBAR_TOGGLE = 'SIDEBAR_TOGGLE';
export const FILTER_MODAL_SHOW = 'FILTER_MODAL_SHOW';
export const FILTER_MODAL_HIDE = 'FILTER_MODAL_HIDE';

export const toggleSidebar = () => ({
    type: SIDEBAR_TOGGLE
});

export const showFilterModal = () => ({
    type: FILTER_MODAL_SHOW
});

export const hideFilterModal = () => ({
    type: FILTER_MODAL_HIDE
});