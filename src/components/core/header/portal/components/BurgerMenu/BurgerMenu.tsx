import React from 'react';
import { IMenuConfig } from '@domain/interfaces';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Svg } from '@components/shared';
import { Link, NavLink } from 'react-router-dom';
import './BurgerMenu.scss';
import classNames from 'classnames';

type IBurgerMenu = {
	menuConfig: IMenuConfig;
	closeBurgerMenu: () => void;
	className: string;
};

export function BurgerMenu({ menuConfig, closeBurgerMenu, className }: IBurgerMenu) {
	return (
		<div className={classNames('header-burger-menu', className)}>
			<Container className="pt-16 h-100">
				<Row className="h-100">
					<Col xs={12}>
						{menuConfig.map((menuItem, index) => (
							<div key={index} className="menu__item">
								{menuItem.path ? (
									<NavLink exact to={menuItem.path} onClick={closeBurgerMenu}>
										{menuItem.icon?.length && <Svg href={menuItem.icon} className="mr-4" />}
										{menuItem.title}
									</NavLink>
								) : (
									<a onClick={closeBurgerMenu}>
										{menuItem.icon?.length && <Svg href={menuItem.icon} className="mr-4" />}
										{menuItem.title}
									</a>
								)}
							</div>
						))}
					</Col>
					<Button className="mt-auto">
						<Link to="/deposit" className="px-5">
							Deposit
							<Svg href="coins.svg" className="ml-auto" />
						</Link>
					</Button>
				</Row>
			</Container>
		</div>
	);
}
