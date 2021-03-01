import { useResponsive, useSetState } from 'ahooks';
import path from 'path';
import React, { memo, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Img } from '../img/Img';
import './SectionBg.scss';

type bg = string | { xxs?: string; xs?: string; sm?: string; md?: string; lg?: string; xl?: string };
interface ISectionBg {
  primary: bg;
  secondary?: bg;
  secondaryType?: 'bg' | 'image';
}

export const SectionBg = memo(function SectionBg({ primary, secondary, secondaryType = 'bg' }: ISectionBg) {
  const responsive = useResponsive();
  const [images, seImages] = useSetState(calcImages());

  useEffect(() => {
    seImages(calcImages());
  }, [primary, secondary, responsive]);

  function calcImages() {
    function responsiveImg(images: any) {
      return Object.keys(responsive)
        .reverse()
        .map((key) => responsive[key] && images[key])
        .filter((image) => !!image)[0];
    }

    const _primaryImg = primary ? typeof primary == 'string' ? primary : responsiveImg(primary) : '';
    const _secondaryImg = secondary ? typeof secondary == 'string' ? secondary : responsiveImg(secondary) : '';

    return {
      primary: _primaryImg,
      secondary: _secondaryImg,
    };
  }

  return (
    <div
      className="section-bg"
      style={{ background: `url(${`assets/${path.basename(images.primary)}`}) 50% 50% no-repeat` }}
    >
      {!!images.secondary && secondaryType == 'bg' ? (
        <div
          className="secondary-bg"
          style={{ background: `url(${`assets/${path.basename(images.secondary)}`}) 50% 50% no-repeat` }}
        />
      ) : (
        <Container>
          <Row>
            <Col>
              <Img className="secondary-img" src={images.secondary} />
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
});
