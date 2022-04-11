import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from '../../store'

export interface ModalState {
    activeModal: string | null
}

const initialState: ModalState = {
  activeModal: null
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    toggleModal: (state, action: PayloadAction<string>) => {
      if (state.activeModal === action.payload) {
        state.activeModal = null
      } else {
        state.activeModal = action.payload
      }
    }
  }
})

// Actions
export const { toggleModal } = modalSlice.actions

// Selectors
export const selectActiveModal = (state: RootState) => state.modal.activeModal

export default modalSlice.reducer
