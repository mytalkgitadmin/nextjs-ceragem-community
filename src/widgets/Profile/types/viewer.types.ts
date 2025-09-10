import { History } from '@/features/viewer/types';

export interface ProfileViewerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  accountId: number;
  profileImageUrl: string;
}
export interface ProfileGalleryProps {
  histories: ProcessedHistory[];
  onImageClick: (index: number) => void;
}

export interface ProcessedHistory extends History {
  processedImageUrl: string;
}
