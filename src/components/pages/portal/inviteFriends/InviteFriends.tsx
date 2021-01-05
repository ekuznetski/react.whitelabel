import { FacebookShareButton, LinkedinShareButton, TwitterShareButton } from 'react-share';
import { Button, Img, Input, LocaleLink, PageTitle, Svg } from '@components/shared';
import React, { memo, useEffect, useRef, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Trans, useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { EActionTypes, IStore, ac_sendReferrerLink, ac_showModal, ac_showNotification } from '@store';
import { Form, Formik, FormikContext, FormikProps } from 'formik';
import { FieldValidators } from '@domain';
import { RewardInformationModal } from './components';
import * as Yup from 'yup';
import { ISendReferrerLinkRequest } from '@domain/interfaces';
import { ENotificationType } from '@domain/enums';
import './InviteFriends.scss';
import { config } from './';

export const InviteFriends = memo(function InviteFriends() {
  const { rafId, locale } = useSelector<IStore, { rafId: string; locale: string }>((state) => ({
    rafId: state.data.client.profile.raf_id,
    locale: state.app.route.locale,
  }));
  const [shareUrl, setShareUrl] = useState(`${window.location.origin}/${locale}/invite/HYCP+343129583030`);
  const { t } = useTranslation();
  const copyUrl = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const isActiveAccount = !!rafId;

  useEffect(() => {
    if (isActiveAccount) {
      setShareUrl(`${window.location.origin}/${locale}/invite/${rafId}`);
    }
  }, []);

  function openRewardsModal() {
    dispatch(ac_showModal(RewardInformationModal, {}, 'reward-information-modal'));
  }

  function handleCopy() {
    copyUrl.current?.select();
    document.execCommand('copy');
  }

  function handleSendEmail({ shareEmail: email }: { shareEmail: string }) {
    dispatch(
      ac_sendReferrerLink(
        { email } as ISendReferrerLinkRequest,
        () => {
          dispatch(
            ac_showNotification({
              type: ENotificationType.success,
              message: t('Invitation Successful'),
            }),
          );
        },
        () => {
          dispatch(
            ac_showNotification({
              type: ENotificationType.danger,
              message: 'Error',
            }),
          );
        },
      ),
    );
  }

  return (
    <Container className="invite-friends-wrapper">
      <Row>
        <Col xs={12}>
          <PageTitle title={t('Invite Your Friends')} />
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col lg={7} className="mb-3">
          <div className="invite__container py-10 px-9">
            <div className="invite__description">
              <Trans i18nKey="Share Your Passion">
                Share your passion for investing with your friends. Invite your friends to trade at BSFX and earn a
                <span>$200 cash reward</span> for each referral.
              </Trans>
            </div>
            <div className="invite__content">
              {!isActiveAccount && (
                <div className="invite__overlay">
                  <p>You need to have active trading account to start referring friends</p>
                  <LocaleLink to="/deposit" className="hovered-underlined">
                    {t('Make A Deposit')}
                  </LocaleLink>
                </div>
              )}
              <div className={classNames('invite__context', !isActiveAccount && 'blurred')}>
                <div className="invite__rewards">
                  <Svg href="info" />
                  <a onClick={openRewardsModal} className="hovered-underlined">
                    {t('Reward Information')}
                  </a>
                </div>
                <div className="invite__avatars">
                  {config.avatarImages.map((img) => (
                    <Img src={img} />
                  ))}
                </div>
                <p className="invite__secure-note">
                  <Svg href="lock" />
                  <span>{t('Secure Information')}</span>
                </p>
                <div className="share-copy-url__title">{t('Share your invite link:')}</div>
                <div className="share">
                  <div className="share-copy-url">
                    <Formik
                      initialValues={{
                        shareEmail: '',
                      }}
                      onSubmit={(values) => console.log(values)}
                    >
                      <Input className="copy-input" readOnly name={'shareUrl'} value={shareUrl} ref={copyUrl} />
                    </Formik>
                    <Svg href="copy" />
                    <a onClick={handleCopy} className="hovered-underlined">
                      {t('Copy')}
                    </a>
                  </div>
                  <div className="share-social">
                    <FacebookShareButton url={shareUrl} disabled={!config.shareSites.includes('fb')}>
                      <Svg href="facebook" className="fb" />
                    </FacebookShareButton>
                    <TwitterShareButton url={shareUrl} disabled={!config.shareSites.includes('tw')}>
                      <Svg href="twitter" className="tw" />
                    </TwitterShareButton>
                    <LinkedinShareButton url={shareUrl} disabled={!config.shareSites.includes('ln')}>
                      <Svg href="linkedin" className="ln" />
                    </LinkedinShareButton>
                  </div>
                </div>
                <Formik
                  initialValues={{
                    shareEmail: '',
                  }}
                  validationSchema={Yup.object().shape({
                    shareEmail: FieldValidators.email,
                  })}
                  onSubmit={handleSendEmail}
                >
                  {(props: FormikProps<any>) => (
                    <Form className="m-auto form">
                      <div className="seperator">or</div>
                      <div className="share-email">
                        <Input
                          className="share-email__input"
                          label={t('Type Your Friends Email')}
                          name={'shareEmail'}
                        />
                        <Button
                          className="share-email__submit"
                          type="submit"
                          disabled={!props.isValid || !props.dirty}
                          loadingOnAction={EActionTypes.sendReferrerLink}
                        >
                          {t('Send')}
                        </Button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
});
