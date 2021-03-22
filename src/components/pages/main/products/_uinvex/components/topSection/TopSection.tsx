import { Button, Col, Container, Row, SectionBg } from '@components/shared';
import { EAssetClass } from '@domain/enums';
import { config } from '@pages/main/products';
import { useResponsive } from 'ahooks';
import classNames from 'classnames';
import React, { RefObject, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './TopSection.scss';

export interface IProductsTopSectionProps {
  sectionRefs: { [key: string]: RefObject<any> };
}

export function TopSection({ sectionRefs }: IProductsTopSectionProps) {
  const [activeSection, selectedSection] = useState('forex');
  const responsive = useResponsive();
  let { location, replace }: any = useHistory();

  useEffect(() => {
    if (location.state?.scrollTo) {
      setTimeout(() => {
        navigateToSection(location.state?.scrollTo)();
        const state = { ...location.state };
        delete state.scrollTo;
        replace(location.pathname, state);
      }, 100);
    }
  }, [location]);

  function navigateToSection(type: EAssetClass) {
    return (e?: any) => {
      selectedSection(type);
      sectionRefs[type].current.scrollIntoView({ behavior: 'smooth' });
    };
  }

  return (
    <section className="page-top">
      <SectionBg
        primary="header_bg.jpg"
        secondary={{
          xxs: 'products-page-top-mobile.png',
          md: 'products-page-top-tablet.png',
          lg: 'products-page-top-desktop.png',
        }}
      />
      <Container>
        <Row className="mb-9">
          <Col className="text-center">
            <div className="page-top__title">{config.pageTopTitle}</div>
          </Col>
        </Row>
        {responsive.md ? (
          <Row className="nav-buttons no-gutters mx-auto">
            {config.headerNavigation.map((navBtn, n) => (
              <Col key={n}>
                <Button
                  className={classNames('px-8', navBtn.anchor === activeSection && 'active')}
                  onClick={navigateToSection(navBtn.anchor)}
                >
                  {navBtn.label}
                </Button>
              </Col>
            ))}
          </Row>
        ) : (
          <>
            <Row className="nav-buttons no-gutters mx-auto mb-10">
              {config.headerNavigation.slice(0, 3).map((navBtn, n) => (
                <Col key={n}>
                  <Button
                    className={classNames('px-8', navBtn.anchor === activeSection && 'active')}
                    onClick={navigateToSection(navBtn.anchor)}
                  >
                    {navBtn.label}
                  </Button>
                </Col>
              ))}
            </Row>
            <Row className="nav-buttons no-gutters mx-auto">
              {config.headerNavigation.slice(3, 5).map((navBtn, n) => (
                <Col key={n}>
                  <Button
                    className={classNames('px-8', navBtn.anchor === activeSection && 'active')}
                    onClick={navigateToSection(navBtn.anchor)}
                  >
                    {navBtn.label}
                  </Button>
                </Col>
              ))}
            </Row>
          </>
        )}
      </Container>
    </section>
  );
}
