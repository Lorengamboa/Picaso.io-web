import {
    MODAL_CLOSE,
    MODAL_OPEN
} from "./actions";

export function openModal(state, payload) {
    const {modalType, modalProps} = payload;
    return {modalType, modalProps};
}

export function closeModal(state, payload) {
    return null;
}
