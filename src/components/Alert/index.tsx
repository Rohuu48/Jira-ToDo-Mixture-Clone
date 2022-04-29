import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription
} from '@chakra-ui/react';
import useAlert from 'hooks/useAlert';
import { useMemo } from 'react';
import InsertInDom from '../InsertInDom';
import './alert.scss';

type AlertProps = {
  status?: 'success' | 'info' | 'warning' | 'error';
  title?: string;
  description?: string;
};

const AlertContainer = () => {
  const { alertsList, hideAlert } = useAlert();
  const alertsData = useMemo(() => {
    return Object.values(alertsList).map(
      ({ status, title, description }: AlertProps) => {
        //   To do
        /**
         * vertical position : one of ['top', 'bottom']
         * horizontal position : one of ['left', 'right']
         */

        return { status, title, description };
      }
    );
  }, [alertsList]);

  return alertsData && alertsData.length > 0 ? (
    <div className="alert-container">
      {alertsData.map((alert: AlertProps) => {
        const { status, title, description } = alert;

        return (
          <Alert status={status}>
            <AlertIcon />
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription>{description}</AlertDescription>
          </Alert>
        );
      })}
    </div>
  ) : null;
};

export default AlertContainer;
