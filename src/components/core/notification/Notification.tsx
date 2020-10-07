import { Svg } from '@components/shared';
import { INotificationState } from '@domain/interfaces';
import { ac_hideNotification, IStore } from '@store';
import { useInterval } from 'ahooks';
import classNames from 'classnames';
import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import './Notification.scss';

interface INotificationStateProps {
  notificationProps: INotificationState;
}

interface INotification {
  fixed: boolean;
}

export function Notification(props: INotification) {
  const { notificationProps } = useSelector<IStore, INotificationStateProps>((state) => ({
    notificationProps: state.app.notification,
  }));
  const dispatch = useDispatch();
  const [progress, setProgress] = React.useState(0);
  const [interval, setInterval] = React.useState<number | null>(null);
  const _timeout = notificationProps.timeout === null ? null : notificationProps.timeout || 10000; // if null don't show progress bar
  const _tick = 20;

  useInterval(() => {
    if (progress >= 100) {
      closeNotification();
    } else if (_timeout !== null) {
      setProgress(progress + 100 / (_timeout / _tick));
    }
  }, interval);

  useEffect(() => {
    if (notificationProps.visible && _timeout !== null) setInterval(_tick);
  }, [notificationProps.timeout]);

  function closeNotification() {
    setInterval(null);
    setProgress(0);
    dispatch(ac_hideNotification());
  }

  return (
    <div
      className={classNames(
        'notification-wrapper',
        notificationProps.type,
        notificationProps.visible && 'open',
        props.fixed && 'fixed',
      )}
    >
      <Container>
        <Row>
          <Col xs={12} className="notification-context px-13">
            {notificationProps.visible ? notificationProps.context : null}
          </Col>
        </Row>
      </Container>
      <div className="notification-progress" style={{ width: progress + '%' }} />
      <Svg
        href="close.svg"
        className="notification-close"
        height={18}
        onClick={(e: any) => {
          e.stopPropagation();
          closeNotification();
        }}
      />
    </div>
  );
}
