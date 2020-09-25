import { INotificationState } from '@domain/interfaces';
import { ac_hideNotification, IStore } from '@store';
import { useInterval } from 'ahooks';
import classNames from 'classnames';
import React, { useEffect } from 'react';
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
	const _timeout = notificationProps.timeout || 3000;
	const _tick = 20;

	useInterval(() => {
		if (progress >= 100) {
			setInterval(null);
			setProgress(0);
			dispatch(ac_hideNotification());
		} else {
			setProgress(progress + 100 / (_timeout / _tick));
		}
	}, interval);

	useEffect(() => {
		if (notificationProps.visible) setInterval(_tick);
	}, [notificationProps.timeout]);

	return (
		<div
			className={classNames(
				'notification-wrapper',
				notificationProps.type,
				notificationProps.visible && 'open',
				props.fixed && 'fixed',
			)}
		>
			{notificationProps.visible ? notificationProps.context : null}
			<div className={classNames('notification-progress')} style={{ width: progress + '%' }} />
		</div>
	);
}
