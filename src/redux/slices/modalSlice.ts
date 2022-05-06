import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from '../../store'

export interface ModalState {
    activeModal: string | null
    modalData: Object
}

const initialState: ModalState = {
  activeModal: null,
  modalData: {}
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    toggleModal: (state, action: PayloadAction<{ activeModal: string, modalData?: Object}>) => {
      if (state.activeModal === action.payload.activeModal) {
        state.activeModal = null
        state.modalData = {}
      } else {
        state.activeModal = action.payload.activeModal
        state.modalData = action.payload.modalData || {}
      }
    }
  }
})

// Actions
export const { toggleModal } = modalSlice.actions

// Selectors
export const selectActiveModal = (state: RootState) => state.modal.activeModal
export const selectModalData = (state: RootState) => state.modal.modalData

export default modalSlice.reducer
