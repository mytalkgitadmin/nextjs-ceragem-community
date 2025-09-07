type OverlayCloser = () => void;

const overlayClosers = new Set<OverlayCloser>();

export const registerOverlayCloser = (fn: OverlayCloser) => {
  overlayClosers.add(fn);
  return () => overlayClosers.delete(fn);
};

export const closeAllOverlays = () => {
  overlayClosers.forEach((fn) => fn());
};

export const clearOverlayClosers = () => {
  overlayClosers.clear();
};
