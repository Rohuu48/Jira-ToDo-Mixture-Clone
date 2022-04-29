import { useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { generateRandomId } from 'helper';
import { getAlerts } from 'selectors/alert';
import { DE_ACTIVATE_ALERT, ACTIVATE_ALERT } from 'actionTypes/alert';

interface IshowAlert {
  title: string;
  description: string;
  status?: 'success' | 'info' | 'warning' | 'error';
  maxTime?: number;
  fixed?: boolean;
}

type RsetTimeout = ReturnType<typeof setTimeout>;
type timerType = {
  [key: string]: RsetTimeout | null;
};

const useAlert = () => {
  const timerRef = useRef<timerType>({});
  const dispatch = useDispatch();
  const alertsList = useSelector(getAlerts);

  const hideAlert = useCallback(
    (id: string) => {
      if (timerRef.current[id]) {
        clearTimeout(timerRef.current[id] as RsetTimeout);
        timerRef.current[id] = null;
      }
      dispatch({
        type: DE_ACTIVATE_ALERT,
        data: { id }
      });
    },
    [dispatch]
  );

  const showAlert = useCallback(
    ({
      status,
      title,
      description,
      maxTime = 3000,
      fixed = false
    }: IshowAlert): string => {
      const id = generateRandomId();
      dispatch({
        type: ACTIVATE_ALERT,
        data: {
          status,
          title,
          description,
          id
        }
      });

      if (!fixed) {
        const timer = setTimeout(() => {
          hideAlert(id);
        }, maxTime);
        timerRef.current[id] = timer;
      }
      return id;
    },
    [dispatch, hideAlert]
  );

  return {
    showAlert,
    hideAlert,
    alertsList
  };
};

export default useAlert;
