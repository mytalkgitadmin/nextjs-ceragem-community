import { memo } from "react";
import { Loading } from "@/shared/ui/media";

import styles from "./ProfileDetailDialog.module.scss";

const ProfileLoading = memo(() => {
  return <Loading className={styles.primary} />;
});

export default ProfileLoading;
