import { Button, Svg, Modal, ModalTitle, ModalContext, ModalNav } from '@components/shared';
import classNames from 'classnames';
import React, { memo } from 'react';
import './WithdrawalHistoryItem.scss';
import { ETaskStatus } from '@domain/enums';
import { MWithdrawalHistoryItem } from '@domain/models';

export const WithdrawalHistoryItem = memo(function WithdrawalHistoryItem(props: MWithdrawalHistoryItem) {
	const [isModalOpen, setModalOpen] = React.useState(false);

	return (
		<div className={classNames('withdrawal-history-item mb-10', props.status.toLowerCase())}>
			<div className="withdrawal-info ">
				<div className="withdrawal-item__icon px-6">
					<Svg href="shrimp.svg" height={18} />
				</div>
				<div className="withdrawal-item__amount px-6">
					<div className="item-cel__title mb-2">Requested</div>
					<div className="item-cel__content">
						<Svg href={props.currency.toLowerCase() + '.svg'} className="mr-1" height={14} />
						{props.amount}
					</div>
				</div>
				<div className="withdrawal-item__date px-6">
					<div className="item-cel__title mb-2">Date</div>
					<div className="item-cel__content">{props.issueDate.format('MM.DD.YYYY')}</div>
				</div>
				<div className="withdrawal-item__accountId px-6">
					<div className="item-cel__title mb-2">Account</div>
					<div className="item-cel__content">{props.accountId}</div>
				</div>
				<div className="withdrawal-item__status px-6">
					<div className="item-cel__title mb-2">Status</div>
					<div className="item-cel__content">{props.status}</div>
				</div>
			</div>
			{props.status === ETaskStatus.pending && (
				<div className="withdrawal-option p-6">
					<Button className="noBg" onClick={() => setModalOpen(true)}>
						Cancel Withdrawal
					</Button>
				</div>
			)}
			{(props.status === ETaskStatus.success || props.status === ETaskStatus.inProgress) && !!props.items?.length && (
				<div className="withdrawal-itemsTable mt-4">
					<div className="withdrawal-table__row header">
						<div className="withdrawal-cell">Date</div>
						<div className="withdrawal-cell">Reference</div>
						<div className="withdrawal-cell">Payment Method</div>
						<div className="withdrawal-cell">Amount</div>
					</div>
					{props.items?.map((item, i) => (
						<div key={i} className="withdrawal-table__row content">
							<div className="withdrawal-cell">{item.issueDate.format('MM.DD.YYYY')}</div>
							<div className="withdrawal-cell">{item.reference}</div>
							<div className="withdrawal-cell">{item.paymentMethod}</div>
							<div className="withdrawal-cell">
								<Svg href={props.currency.toLowerCase() + '.svg'} height={14} />
								{item.amount}
							</div>
						</div>
					))}
					<div className="withdrawal-table__row footer">
						Total Amount:
						<Svg href={props.currency.toLowerCase() + '.svg'} className="ml-1" height={14} />
						{props.items?.reduce((acc, item) => acc + item.amount, 0)}
					</div>
				</div>
			)}
			<Modal className="withdrawal-history-item__modal" isOpen={isModalOpen} isOpenDispatcher={setModalOpen}>
				<ModalTitle title="Confirmation" subTitle="Please confirm withdrawal cancellation" />
				<ModalContext>
					<Svg href="shrimp.svg" width={100} className="p-7" />
				</ModalContext>
				<ModalNav>
					<Button
						className="mr-5"
						onClick={() => {
							alert('Call `withdrawals/cancel` API.');
							setModalOpen(false);
						}}
					>
						Confirm
					</Button>
					<Button className="noBg" onClick={() => setModalOpen(false)}>
						Cancel
					</Button>
				</ModalNav>
			</Modal>
		</div>
	);
});
