

import { create } from 'zustand'

const useEditStore = create((set) => ({
  editType: '',
  setEditType: (newEditType) => set({ editType: newEditType }),
  subType: '',
  setSubType: (setSubType) => set({ subType: setSubType }),
  elementIndex:-1,
  setElementIndex: (newElementIndex) => set({elementIndex: newElementIndex}),
  currentData:'',
  setCurrentData: (newData) => set({currentData: newData })

}))

export default useEditStore
