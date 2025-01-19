import { useEffect } from 'react';
import {
  useAppDispatch,
  useAppSelector,
} from '@/app/lib/hooks/features/store/storeHooks';
import { setTab } from '@/app/lib/store/features/ui/uiSlice';
import { LOCALSTORAGE_KEYS } from '@/app/lib/constants/constants';

export const usePersistentTab = () => {
  const dispatch = useAppDispatch();
  const tab = useAppSelector((state) => state.ui.tab);

  // Sync tab with localStorage
  useEffect(() => {
    const storedTab = localStorage.getItem(LOCALSTORAGE_KEYS.CURRENT_TAB);

    if (storedTab !== null) {
      dispatch(setTab(Number(storedTab)));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem(LOCALSTORAGE_KEYS.CURRENT_TAB, String(tab));
  }, [tab]);

  return tab;
};
