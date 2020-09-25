import { useResponsive } from 'ahooks';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { TabsProvider } from './tabs-context';
import './Tabs.scss';

export interface ITabs {
	labels?: { value: string | React.ReactFragment; anchor: string }[];
	content?: { value: string | React.ReactFragment; anchor: string }[];
	activeTab?: string; // anchor
	className?: string;
	isVertical?: boolean;
}

export interface ITab {
	label: { value: string | React.ReactFragment; anchor: string };
	content: { value: string | React.ReactFragment; anchor: string };
	name: string; // anchor
	className?: string;
}

interface TabsState {
	activeTabProps: { tabHeight?: number; anchor: string };
	lineProps: { navLineWidth?: number; navLineLeft?: number };
}

export function Tabs({ labels, content, activeTab, className, isVertical = false }: ITabs) {
	const [activeTabProps, setActiveTabProps] = useState<TabsState['activeTabProps']>();
	const [lineProps, setLineProps] = useState<TabsState['lineProps']>();
	const viewportSize = useResponsive();
	const tabsContentRef: { [k: string]: HTMLDivElement | null } = {};
	let activeNavTabLink: HTMLDivElement | null = null;

	window.onload = function () {
		setLineProps({
			navLineWidth: activeNavTabLink?.clientWidth,
			navLineLeft: activeNavTabLink?.offsetLeft,
		});
	};

	useEffect(() => {
		setLineProps({
			navLineWidth: activeNavTabLink?.clientWidth,
			navLineLeft: activeNavTabLink?.offsetLeft,
		});
	}, [activeTabProps?.anchor, viewportSize]);

	function switchTab(anchor: string) {
		setActiveTabProps({ anchor, tabHeight: tabsContentRef[anchor]?.clientHeight });
	}

	return (
		<TabsProvider>
			{(state, dispatch) => {
				const _labels = labels || state.labels;
				const _content = content || state.content;
				useEffect(() => {
					switchTab(activeTab || labels[0].anchor);
				}, []);

				return (
					<div className={classNames('common-tabs', isVertical && 'vertical', className)}>
						<div className={classNames('common-tabs__navigation', !isVertical && 'mb-9')}>
							{labels.map((label, l) => (
								<div
									key={l}
									id={label.anchor}
									className={classNames(
										'tab__link',
										activeTabProps?.anchor === label.anchor && 'active',
										!isVertical && 'mr-7',
									)}
									onClick={() => switchTab(label.anchor)}
									ref={(ref) => activeTabProps?.anchor === label.anchor && (activeNavTabLink = ref)}
								>
									{label.value}
								</div>
							))}
							{activeTabProps && !isVertical && (
								<div
									className="active-tab-line"
									style={{ left: lineProps?.navLineLeft, width: lineProps?.navLineWidth }}
								/>
							)}
						</div>
						<div className="common-tabs__container">
							{content.map((content, c) =>
								content.anchor === activeTabProps?.anchor ? (
									<div
										key={c}
										id={content.anchor}
										className={`tab__content ${activeTabProps?.anchor === content.anchor ? 'active' : ''}`}
										ref={(ref) => (tabsContentRef[content.anchor] = ref)}
									>
										{content.value}
									</div>
								) : null,
							)}
						</div>
					</div>
				);
			}}
		</TabsProvider>
	);
}

export function Tab({ label, content, name, className }: ITab) {}
