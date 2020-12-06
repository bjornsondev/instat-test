import RootModel from "./store"

export const setupRootStore = () => {
  const rootStore = RootModel.create({
    taskItems: [],
    filterValue: ''
  })
  return { rootStore }
}