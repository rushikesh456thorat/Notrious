import { create } from 'zustand'

const usePageStore = create((set) => ({
  productUrl: '',
  setProductUrl: (newProductUrl) => set({ productUrl: newProductUrl }),
  status: '',
  setStatus: (newStatus) => set({status: (newStatus)}),
  productTitle: '',
  setProductTitle: (newProductTitle) => set({ productTitle: newProductTitle}),
  
}))

export default usePageStore