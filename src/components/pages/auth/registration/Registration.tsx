import { Button, Img, Modal, ModalContext, ModalNav, ModalTitle, PageTitle, Svg } from '@components/shared';
import { ENotificationType, ERegSteps } from '@domain/enums';
import { IRegData } from '@domain/interfaces';
import { ac_login, ac_preRegister, ac_register, ac_showNotification } from '@store';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { FifthStep, FirstStep, FourthStep, SecondStep, ThirdStep } from './components';
import './Registration.scss';
import { useHistory } from 'react-router-dom';
import { usePathLocale } from '@utils/hooks';

function getLocalStorageRegData() {
  const b64String = localStorage.getItem('regData');
  let b64StringDecoded = '';
  if (b64String) {
    for (let i = 0; i < b64String.length; i++) {
      b64StringDecoded += String.fromCodePoint(b64String.charCodeAt(i) >> 2);
    }
    return JSON.parse(atob(b64StringDecoded));
  } else {
    return null;
  }
}

function setLocalStorageRegData(data: any) {
  const newObj = { ...(getLocalStorageRegData() || {}), ...data };
  const b64String = btoa(JSON.stringify(newObj));
  let b64StringEncoded = '';
  for (let i = 0; i < b64String.length; i++) {
    b64StringEncoded += String.fromCodePoint(b64String.charCodeAt(i) << 2);
  }
  localStorage.setItem('regData', b64StringEncoded);
}

export function randomNumber(length = 6) {
  return parseInt(
    Math.random()
      .toString()
      .slice(2, 2 + length),
  );
}
export function randomString(length = 1) {
  // @ts-ignore
  return Array.from({ length }, () =>
    randomNumber(100)
      .toString(36)
      .replace(/[^a-z]/g, ''),
  ).join('');
}

export function Registration() {
  const [name, setName] = useState<string>('XXXX');
  const [formData, setFormData] = useState<IRegData>();
  const [activeStep, setActiveStep] = useState<ERegSteps>(ERegSteps.step1);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [continueReg, setContinueReg] = useState<boolean | null>(null);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const regData = getLocalStorageRegData();
  const history = useHistory();
  const { localizePath } = usePathLocale();

  useEffect(() => {
    if (!!regData) {
      setModalOpen(true);
    }
  }, []);

  useEffect(() => {
    if (!!regData && !!continueReg) {
      setFormData(regData);
      setName(`${regData[ERegSteps.step1]?.first_name} ${regData[ERegSteps.step1]?.surname}`);

      if (!!regData[ERegSteps.step1]) {
        setActiveStep(ERegSteps.step2);
      }
      if (!!regData[ERegSteps.step2]) {
        setActiveStep(ERegSteps.step3);
      }
      if (!!regData[ERegSteps.step3]) {
        setActiveStep(ERegSteps.step4);
      }
    }

    if (continueReg === false) {
      localStorage.removeItem('regData');
    }
  }, [continueReg]);

  async function onSubmitFn(data: any) {
    setFormData({ ...formData, ...data });
    if (activeStep === ERegSteps.step1) {
      const preRegister = new Promise((resolve) => {
        dispatch(ac_preRegister(data[ERegSteps.step1], () => resolve())); //TODO add checking
      });
      await preRegister;
      setName(`${data?.[ERegSteps.step1]?.first_name} ${data?.[ERegSteps.step1]?.surname}`);
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
        delete preparedData['promotion'];
        dispatch(
          ac_register(
            preparedData,
            (e) => {
              dispatch(ac_login({ username: preparedData.username, password: preparedData.password }));
              localStorage.removeItem('regData');
            },
            (e) => {
              console.log('failure registration', e);
              setActiveStep(ERegSteps.step1);
              dispatch(
                ac_showNotification({
                  type: ENotificationType.failure,
                  context: 'Registration unsuccessful',
                }),
              );
            },
          ),
        );
      }
    }

    if (activeStep !== ERegSteps.step4 && activeStep !== ERegSteps.step5) {
      setLocalStorageRegData(data);
    }
    if (activeStep !== ERegSteps.step5) {
      setActiveStep(activeStep + 1);
    }
  }

  return (
    <div className="registration">
      <Container>
        <Row>
          <Col sm={12} md={7} lg={6} xl={5} className="m-auto">
            <PageTitle title={t('Open a Trading Account')} showBackButton={false} />
            <ul className="steps-indicator">
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

      <Modal isOpen={isModalOpen} isOpenDispatcher={setModalOpen} className="continue-registration-modal">
        <ModalTitle title={t('Do you want to continue registration')} />
        <ModalContext>
          <Img src="live-account-bg.png" height="200" />
        </ModalContext>
        <ModalNav>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              setContinueReg(true);
              setModalOpen(false);
            }}
          >
            {t('Yes continue')}
          </Button>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setContinueReg(false);
              setModalOpen(false);
            }}
            className="mt-4 start-new"
          >
            {t('No start new')}
          </a>
        </ModalNav>
      </Modal>
    </div>
  );
}
