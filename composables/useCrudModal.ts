import type { Milestone } from "~/types/milestone";
import type { Operation } from "~/types/operation";

const open = ref<boolean>(false);
const type = ref<Operation>('create');
const selected = ref<Milestone | undefined>();

export const useCrudModal = () => {

  const showModal = (m?: Milestone | undefined, t: Operation = 'create') => {
    selected.value = undefined;
    if (m) {
      selected.value = {
        ...m, 
      };
    }
    type.value = t;
    open.value = true;
  };

  const showCreateModal = () => showModal();
  const showEditModal = (milestone: Milestone) => showModal(milestone, 'edit');
  const closeModal = () => {
    selected.value = undefined;
    open.value = false;
  };

  return {
    open,
    type,
    selected,
    showCreateModal,
    showEditModal,
    closeModal,
  };
};
