import { create } from 'zustand'

const useGlobalBxStore = create((set) => ({
  boxType: '',
  setBoxType: (newBoxType) => set({ boxType: newBoxType }),
  isVisible: false,
  setIsVisible: (newIsVisible) => set({isVisible: (newIsVisible)}),
  
}))

export default useGlobalBxStore
