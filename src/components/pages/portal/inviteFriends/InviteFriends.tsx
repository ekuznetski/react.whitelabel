import { FacebookShareButton, LinkedinShareButton, TwitterShareButton } from 'react-share';
import { Button, Img, Input, LocaleLink, PageTitle, Svg } from '@components/shared';
import React, { memo, useEffect, useRef, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Trans, useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { EActionTypes, IStore, ac_sendReferrerLink, ac_showModal, ac_showNotification } from '@store';
import { Form, Formik, FormikProps, useFormikContext } from 'formik';
import { FieldValidators } from '@domain';
import { RewardInformationModal } from './components';
import './InviteFriends.scss';
import * as Yup from 'yup';
import { ISendReferrerLinkRequest } from '@domain/interfaces';
import { ENotificationType } from '@domain/enums';

export const InviteFriends = memo(function InviteFriends() {
  const { rafId, locale } = useSelector<IStore, { rafId: string; locale: string }>((state) => ({
    rafId: state.data.client.profile.raf_id,
    locale: state.app.route.locale,
  }));
  const [shareUrl, setShareUrl] = useState('');
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
              innerText: t('Invitation Successful'),
            }),
          );
        },
        () => {
          dispatch(
            ac_showNotification({
              type: ENotificationType.danger,
              innerText: 'Error',
            }),
          );
        },
      ),
    );
  }

  return (
    <Container className="client-invite-friends-page-wrapper">
      <Row>
        <Col xs={12}>
          <PageTitle title={t('Invite Your Friends')} />
        </Col>
      </Row>
      <Row className="invite-panel-container">
        <Col lg={7} className="mb-3">
          <div className="invite-panel py-10 px-9">
            <div className="invite-panel-title">{t('Invest with those you know')}</div>
            <div className="invite-panel-description">
              <Trans i18nKey="Share Your Passion">
                Share your passion for investing with your friends. Invite your friends to trade at BSFX and earn a
                <span>$200 cash reward</span> for each referral.
              </Trans>
            </div>
            <div className="invite-panel-hidden">
              {!isActiveAccount && (
                <div className="invite-panel-deposit">
                  <p>You need to have active trading account to start referring friends</p>
                  <LocaleLink to="/deposit" className="px-5">
                    {t('Deposit')}
                  </LocaleLink>
                </div>
              )}
              <div className={classNames('invite-panel-box', !isActiveAccount && 'blurred')}>
                <div className="invite-panel-rewards">
                  <Svg href="info" />
                  <a onClick={openRewardsModal} className="hovered-underlined">
                    {t('Reward Information')}
                  </a>
                </div>
                <div className="invite-panel-avatars">
                  <Img src="share-avatar-1.png" />
                  <Img src="share-avatar-2.png" />
                  <Img src="share-avatar-1.png" />
                  <Img src="share-avatar-2.png" />
                  <Img src="share-avatar-1.png" />
                  <Img src="share-avatar-2.png" />
                </div>
                <p className="invite-panel-note">
                  <span>{t('Secure Information')}</span>
                </p>
                <div className="invite-panel-inputs">
                  <Formik
                    initialValues={{
                      copy: '',
                      shareEmail: '',
                    }}
                    validationSchema={Yup.object().shape({
                      shareEmail: FieldValidators.email,
                    })}
                    onSubmit={handleSendEmail}
                  >
                    {(props: FormikProps<any>) => (
                      <Form className="m-auto form">
                        <div className="inputs-share-links">
                          <div className="inputs-share-copy">
                            <Input className="copy-input" readOnly name={'shareUrl'} value={shareUrl} ref={copyUrl} />
                            <Svg href="upload_other" height={20} width={20} />
                            <a onClick={handleCopy} className="hovered-underlined">
                              copy
                            </a>
                          </div>
                          <div className="social">
                            <FacebookShareButton url={shareUrl}>
                              <Svg href="facebook" className="fb" />
                            </FacebookShareButton>
                            <TwitterShareButton url={shareUrl}>
                              <Svg href="twitter" className="tw" />
                            </TwitterShareButton>
                            <LinkedinShareButton url={shareUrl}>
                              <Svg href="linkedin" className="ln" />
                            </LinkedinShareButton>
                          </div>
                        </div>
                        <div className="inputs-seperator">or</div>
                        <div className="inputs-share-emails">
                          <Input
                            className="inputs-share-input"
                            label={t('Type Your Friends Emails')}
                            name={'shareEmail'}
                          />
                          <Button
                            className="inputs-share-submit"
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
          </div>
        </Col>
      </Row>
    </Container>
  );
});
