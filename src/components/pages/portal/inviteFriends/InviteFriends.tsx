import { Button, Img, Input, LocaleLink, PageTitle, Svg } from '@components/shared';
import React, { memo, useRef } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Trans, useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { EActionTypes, IStore, ac_sendReferrerLink, ac_showModal, ac_showNotification } from '@store';
import { Form, Formik, FormikProps, FormikValues } from 'formik';
import { FieldValidators } from '@domain';
import { RewardInformationModal } from './components';
import * as Yup from 'yup';
import { ISendReferrerLinkRequest } from '@domain/interfaces';
import { ENotificationType } from '@domain/enums';
import { config } from './';
import './InviteFriends.scss';

export const InviteFriends = memo(function InviteFriends() {
  const { rafId, locale } = useSelector<IStore, { rafId: string; locale: string }>((state) => ({
    rafId: true || state.data.client.profile.raf_id,
    locale: state.app.route.locale,
  }));
  const inviteLinkInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const shareUrl: string = !!rafId ? `${window.location.origin}/${locale}/invite/${rafId}` : '';

  function openRewardsModal() {
    dispatch(ac_showModal(RewardInformationModal, {}, 'reward-information-modal'));
  }

  function copyInviteLink() {
    inviteLinkInputRef.current?.select();
    if (document.execCommand('copy')) {
      dispatch(
        ac_showNotification({
          type: ENotificationType.success,
          message: t('Copied To Clipboard'),
        }),
      );
    } else {
      dispatch(
        ac_showNotification({
          type: ENotificationType.danger,
          message: t('Copying Programmatically Not Supported'),
        }),
      );
    }
  }

  function Submit({ shareEmail: email }: FormikValues) {
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
              message: t('Error'),
            }),
          );
        },
      ),
    );
  }

  return (
    <Container className="invite-friends-wrapper">
      <Row className="justify-content-center">
        <Col xs={12}>
          <PageTitle title={t('Invite Your Friends')} />
        </Col>
        <Col md={10} lg={8} xl={7} className="mb-3">
          <div className="invite__container py-10 px-9">
            <div className="invite__description mb-7">
              <Trans i18nKey="Share Your Passion">
                Share your passion for investing with your friends. Invite your friends to trade at BSFX and earn a
                <span>$200 cash reward</span> for each referral.
              </Trans>
            </div>
            <div className="invite__content">
              {!rafId && (
                <div className="invite__overlay">
                  <p className="mx-auto mb-4">
                    {t('You Need To Have Active Trading Account To Start Referring Friends')}
                  </p>
                  <LocaleLink to="/deposit" className="hovered-underlined">
                    {t('Make A Deposit')}
                  </LocaleLink>
                </div>
              )}
              <div className={classNames('invite__context', !rafId && 'blurred')}>
                <div className="invite__rewards mx-auto mb-9 ">
                  <Svg href="info" className="mr-3" />
                  <a onClick={openRewardsModal} className="hovered-underlined">
                    {t('Reward Information')}
                  </a>
                </div>
                <div className="invite__avatars mb-9">
                  {config.avatarImages.map((img, i) => (
                    <Img key={i} src={img} />
                  ))}
                </div>
                <div className="invite__secure-note mb-0">
                  <Svg href="lock" className="mr-2" />
                  <div>{t('Secure Information')}</div>
                </div>
                <div className="divider my-7" />
                <div className="share-copy-url__title mb-3">{t('Share your invite link:')}</div>
                <div className="share">
                  <div className="share-copy-url">
                    <input className="copy-input mb-0 px-4" readOnly value={shareUrl} ref={inviteLinkInputRef} />
                    <Svg href="copy" className="copy-icon mr-4" onClick={copyInviteLink} />
                  </div>
                  <div className="share-social ml-7">
                    {config.socialNetworks.map((social, s) => (
                      <social.component key={s} url={shareUrl}>
                        <Svg href={social.icon} />
                      </social.component>
                    ))}
                  </div>
                </div>
                <div className="separator py-7">or</div>
                <Formik
                  initialValues={{
                    shareEmail: '',
                  }}
                  validationSchema={Yup.object().shape({
                    shareEmail: FieldValidators.email,
                  })}
                  onSubmit={Submit}
                >
                  {(props: FormikProps<any>) => (
                    <Form className="m-auto form">
                      <div className="share-email">
                        <Input className="share-email__input" label={t('Type Your Friends Email')} name="shareEmail" />
                        <Button
                          className="share-email__submit ml-7"
                          type="submit"
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
