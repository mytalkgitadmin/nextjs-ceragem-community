import { Icons } from "@/shared/ui/icon";
import { memo } from "react";

import styles from "../index.module.scss";

const ProfileError = memo(() => {
  return (
    <div className={styles.error}>
      <Icons name="alert" />
      <span>오류가 발생하였습니다</span>
    </div>
  );
});

export default ProfileError;
