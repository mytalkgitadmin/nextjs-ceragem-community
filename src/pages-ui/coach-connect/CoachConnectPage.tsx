"use client";

import { ProfileViewer } from "@/domains-ui/profile";

export interface CoachConnectPageProps {
  onConnect: () => void;
}

export function CoachConnectPage({ onConnect }: CoachConnectPageProps) {
  return (
    <div>
      <ProfileViewer type="coach-connect" onCoachConnect={onConnect} />
    </div>
  );
}
