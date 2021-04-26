import { PageTitle } from '@components/shared';
import { ENotificationType, ERegSteps } from '@domain/enums';
import { ILoginResponse, IRegData } from '@domain/interfaces';
import { ContinueRegistrationModal } from '@pages/auth/registration/components/continueRegistrationModal/ContinueRegistrationModal';
import {
  ac_fetchClientSettings,
  ac_login,
  ac_preRegister,
  ac_register,
  ac_showModal,
  ac_showNotification,
} from '@store';
import { useSessionStorageState } from 'ahooks';
import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { Col, Container, Row } from '@components/shared';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { FifthStep, FirstStep, FourthStep, SecondStep, ThirdStep } from './components';
import './Registration.scss';
import TagManager from 'react-gtm-module';

export function Registration() {
  const [name, setName] = useState<string>('XXXX');
  const [formData, setFormData] = useState<IRegData>();
  const [activeStep, setActiveStep] = useState<ERegSteps>(ERegSteps.step1);
  const [continueReg, setContinueReg] = useState<boolean | null>(null);
  const [localStorageRegData, setLocalStorageRegData] = useSessionStorageState<IRegData>('regData');
  const { t } = useTranslation();
  const formRef = useRef<HTMLUListElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!!localStorageRegData) {
      dispatch(
        ac_showModal(ContinueRegistrationModal, { setContinueReg: setContinueReg }, 'continue-registration-modal'),
      );
    }
  }, []);

  useEffect(() => {
    if (!!localStorageRegData && !!continueReg) {
      setFormData(localStorageRegData);
      dispatch(
        ac_fetchClientSettings(
          { username: localStorageRegData[ERegSteps.step1]['email'] },
          () => {
            setName(
              `${localStorageRegData[ERegSteps.step1]?.first_name} ${localStorageRegData[ERegSteps.step1]?.surname}`,
            );
            if (!!localStorageRegData[ERegSteps.step1]) {
              setActiveStep(ERegSteps.step2);
            }
            if (!!localStorageRegData[ERegSteps.step2]) {
              setActiveStep(ERegSteps.step3);
            }
            if (!!localStorageRegData[ERegSteps.step3]) {
              setActiveStep(ERegSteps.step4);
            }
          },
          () =>
            dispatch(
              ac_showNotification({
                type: ENotificationType.danger,
                message: 'Settings not loaded',
              }),
            ),
        ),
      );
    }

    if (continueReg === false) {
      setLocalStorageRegData();
    }
  }, [continueReg]);

  function onSubmitFn(data: any) {
    setFormData({ ...formData, ...data });
    if (activeStep === ERegSteps.step1) {
      dispatch(
        ac_preRegister(
          data[ERegSteps.step1],
          () => setName(`${data?.[ERegSteps.step1]?.first_name} ${data?.[ERegSteps.step1]?.surname}`),
          () =>
            dispatch(
              ac_showNotification({
                type: ENotificationType.danger,
                message: 'Registration unsuccessful',
              }),
            ),
        ),
      );
    }

    if (activeStep === ERegSteps.step5) {
      if (formData) {
        const preparedData = Object.keys(formData).reduce((acc: any, el: string) => {
          // @ts-ignore
          return { ...acc, ...formData[el] };
        }, {});
        preparedData['domain'] = 'com'; //TODO remove when new api will be ready
        preparedData['username'] = formData[ERegSteps.step1].email;
        delete preparedData['first_name'];
        delete preparedData['surname'];
        delete preparedData['email'];
        delete preparedData['phone_prefix'];
        delete preparedData['phone'];
        delete preparedData['mobile'];
        delete preparedData['language'];

        dispatch(
          ac_register(
            preparedData,
            (e) => {
              dispatch(
                ac_login(
                  { username: preparedData.username, password: preparedData.password },
                  () => ({ response }: ILoginResponse) => {
                    TagManager.dataLayer({
                      dataLayer: {
                        event: 'user',
                        name: `${response.profile.first_name} ${response.profile.surname}`,
                        email: response.profile.email,
                        userId: response.profile.userId,
                      },
                    });
                  },
                ),
              );
              setLocalStorageRegData();
            },
            (e) => {
              console.log('failure registration', e);
              setActiveStep(ERegSteps.step1);
              dispatch(
                ac_showNotification({
                  type: ENotificationType.danger,
                  message: 'Registration unsuccessful',
                }),
              );
            },
          ),
        );
      }
    }

    if (activeStep !== ERegSteps.step4 && activeStep !== ERegSteps.step5) {
      setLocalStorageRegData({ ...formData, ...data });
    }
    if (activeStep !== ERegSteps.step5) {
      setActiveStep(activeStep + 1);
      formRef?.current?.scrollIntoView();
    }
  }
  return (
    <div className="registration mb-15">
      <Container>
        <Row>
          <Col sm={9} md={7} lg={6} xl={5} className="m-auto">
            <PageTitle title={t('Open a Trading Account')} showBackButton={false} />
            <ul className="steps-indicator" ref={formRef}>
              {Array.from({ length: 5 }).map((_, i) => (
                <li
                  key={i}
                  className={classNames(
                    'steps-indicator__step',
                    `step${i + 1}`,
                    // @ts-ignore
                    activeStep === ERegSteps[`step${i + 1}`] ? 'active' : '',
                    // @ts-ignore
                    activeStep - 1 >= ERegSteps[`step${i + 1}`] ? 'completed' : '',
                  )}
                />
              ))}
            </ul>
            {activeStep === ERegSteps.step1 && <FirstStep submitFn={onSubmitFn} />}
            {activeStep === ERegSteps.step2 && <SecondStep submitFn={onSubmitFn} />}
            {activeStep === ERegSteps.step3 && <ThirdStep submitFn={onSubmitFn} />}
            {activeStep === ERegSteps.step4 && <FourthStep submitFn={onSubmitFn} />}
            {activeStep === ERegSteps.step5 && <FifthStep name={name} submitFn={onSubmitFn} />}
          </Col>
        </Row>
      </Container>
    </div>
  );
}
