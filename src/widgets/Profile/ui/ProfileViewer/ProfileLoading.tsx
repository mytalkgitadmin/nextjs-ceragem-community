import { memo } from "react";
import Loading from "@/shared/ui/Loading";

import styles from "./ProfileViewer.module.scss";

const ProfileLoading = memo(() => {
  return <Loading className={styles.primary} />;
});

ProfileLoading.displayName = "ProfileLoading";

export default ProfileLoading;
