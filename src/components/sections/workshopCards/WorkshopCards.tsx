import { Button, Img, Svg } from '@components/shared';
import { EWorkshopType } from '@domain/enums';
import { useInViewport } from 'ahooks';
import React, { forwardRef, memo, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './WorkshopCards.scss';
export interface IWorkshopCards {
  data: {
    type: EWorkshopType;
    author: {
      img: string;
      name: string;
      title: string;
    };
    schedule: {
      day: string;
      time: string;
    };
    info: {
      title: string;
      description: string;
    };
  }[];
}

export const WorkshopCards = memo(
  forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & IWorkshopCards>(function WorkshopCards(props, ref) {
    const [activeItem, setActiveItem] = useState(0);
    const buttonsRef = Array.from(props.data, () => React.createRef<HTMLButtonElement>());
    const inView = buttonsRef.map((_ref) => useInViewport(_ref));

    useEffect(() => setActiveItem(inView.indexOf(true)), [inView]);

    return (
      <Row className="workshop-cards-row py-5 py-lg-0">
        {props.data.map((workshop, w) => (
          <Col xs={12} md={10} lg={6} key={w} className="mr-5 mr-lg-0">
            <div className="workshop-cards__item">
              <div className="workshop-cards__item-author py-7 py-md-9 px-8">
                <Img src={workshop.author.img} className="item-img mb-md-4 mr-7 mr-md-0" />
                <div className="author-info">
                  <div className="item-name">{workshop.author.name}</div>
                  <div className="item-title mb-7">{workshop.author.title}</div>
                  <div className={`item-type ${workshop.type.toLowerCase()}`}>{workshop.type}</div>
                  <Button className="mt-auto">Register</Button>
                </div>
              </div>
              <div className="workshop-cards__item-content">
                <div className="item-schedule px-8">
                  <div className="item-schedule__day mr-5">
                    <Svg href="calendar.svg" className="mr-1" />
                    {workshop.schedule.day}
                  </div>
                  <div className="item-schedule__time">
                    <Svg href="clock.svg" className="mr-1" />
                    {workshop.schedule.time}
                  </div>
                </div>
                <div className="item-info py-md-7 px-8">
                  <div className="item-info__title mb-3">{workshop.info.title}</div>
                  <div className="item-info__description">{workshop.info.description}</div>
                </div>
              </div>
              <div className="workshop-cards__item-footer d-md-none py-7 px-8 mt-7">
                <Button className="mt-auto" data-wuid={w} ref={buttonsRef[w]}>
                  Register
                </Button>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    );
  }),
);
