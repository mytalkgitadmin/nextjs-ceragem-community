import Icons from "@/shared/ui/Icons";
import { memo } from "react";

import styles from "./ProfileViewer.module.scss";

const ProfileError = memo(() => {
  return (
    <div className={styles.error}>
      <Icons name="alert" />
      <span>오류가 발생하였습니다</span>
    </div>
  );
});

ProfileError.displayName = "ProfileError";

export default ProfileError;
