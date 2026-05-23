import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export const useRefreshWarning = (hasUnsavedChanges = true) => {
  const navigate = useNavigate();
  const [showWarning, setShowWarning] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  // Custom popup confirm
  const confirmAction = useCallback(() => {
    if (pendingAction) pendingAction();
    setShowWarning(false);
    setPendingAction(null);
  }, [pendingAction]);

  const cancelAction = useCallback(() => {
    setShowWarning(false);
    setPendingAction(null);
  }, []);

  // Trigger custom popup (for internal navigation)
  const triggerWarning = useCallback((action: () => void) => {
    if (hasUnsavedChanges) {
      setPendingAction(() => action);
      setShowWarning(true);
    } else {
      action();
    }
  }, [hasUnsavedChanges]);

  /**
   * 1️⃣ Handle browser reload / tab close
   */
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!hasUnsavedChanges) return;

      e.preventDefault();
      e.returnValue = ''; // REQUIRED for browser dialog
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [hasUnsavedChanges]);

  /**
   * 2️⃣ Handle F5 / Ctrl+R
   */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === 'F5' ||
        (e.ctrlKey && e.key.toLowerCase() === 'r') ||
        (e.metaKey && e.key.toLowerCase() === 'r')
      ) {
        if (!hasUnsavedChanges) return;

        e.preventDefault();
        setShowWarning(true);
        setPendingAction(() => () => window.location.reload());
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hasUnsavedChanges]);

  return {
    showWarning,
    confirmAction,
    cancelAction,
    triggerWarning,
  };
};
