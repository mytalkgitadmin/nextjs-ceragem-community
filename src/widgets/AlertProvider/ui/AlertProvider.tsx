"use client";
// Alert state management in widgets layer

import Alert from "@/shared/ui/Alert/Alert";
import { useAlertStore } from "@/shared/store/useAlertStore";

export default function AlertProvider() {
  const { alertDialog, closeAlertDialog } = useAlertStore();

  return (
    <Alert
      isOpen={alertDialog.isOpen}
      title={alertDialog.title}
      description={alertDialog.description}
      confirmText={alertDialog.confirmText}
      onConfirm={alertDialog.onConfirm || undefined}
      onOpenChange={(open) => {
        if (!open) {
          closeAlertDialog();
        }
      }}
    />
  );
}
