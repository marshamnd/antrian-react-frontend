import { create } from "zustand";
const useTrigger = create((set) => ({
  trigger: 0,
  setTrigger: (updateFn) =>
    set((state) => ({ trigger: updateFn(state.trigger) })),
}));

export default useTrigger;
