import { toast } from "sonner";

export const showSuccess = (title: string, description?: string) => {
  toast.success(title, {
    description,
    duration: 3000,
  });
};

export const showError = (title: string, description?: string) => {
  toast.error(title, {
    description: description || "문제가 발생했습니다. 다시 시도해주세요.",
    duration: 5000,
  });
};

export const showInfo = (title: string, description?: string) => {
  toast.info(title, {
    description,
    duration: 4000,
  });
};

export const showWarning = (title: string, description?: string) => {
  toast.warning(title, {
    description,
    duration: 5000,
  });
};
