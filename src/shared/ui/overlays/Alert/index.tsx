import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/shared/ui/overlays";
import { useUIStore } from "@/shared/model/useUIStore";

import styles from "./Alert.module.scss";

export default function Alert() {
  const { alertDialog, closeAlertDialog } = useUIStore();

  const handleConfirm = () => {
    if (alertDialog.onConfirm) {
      alertDialog.onConfirm();
    }
    closeAlertDialog();
  };

  const handleCancel = () => {
    closeAlertDialog();
  };

  return (
    <AlertDialog
      open={alertDialog.isOpen}
      onOpenChange={(open) => !open && handleCancel()}
    >
      <AlertDialogContent className={styles.alertContent}>
        <AlertDialogHeader>
          <AlertDialogTitle>{alertDialog.title}</AlertDialogTitle>
          <AlertDialogDescription className={styles.alertDesc}>
            {alertDialog.description}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel}>취소</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>
            {alertDialog.confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
