interface Task {
  _id:string
  title: string;
  description: string;
  status: string;
  id?: number;
}
interface ToggleModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave?: (task: Task) => void; 
    username?: string;
    _id?: string;
    task?: Task;
  }

  interface ModalProps {
    id?: string;
    isOpen: boolean;
    onClose: () => void;
    onSave?: (task: Task) => void; 
    task?: Task;
  }

  interface FormData {
    username: string;
    password: string;
  }