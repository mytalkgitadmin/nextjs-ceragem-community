import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/shared/ui/alert-dialog';
import { useUIStore } from '@/shared/store/useUIStore';

import styles from './Alert.module.scss';

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
        {/* header */}
        <AlertDialogHeader>
          <AlertDialogTitle>{alertDialog.title}</AlertDialogTitle>
          <AlertDialogDescription className={styles.alertDesc}>
            {alertDialog.description}
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* footer */}
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
