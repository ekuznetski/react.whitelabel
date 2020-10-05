import { Button, Modal, PageTitle } from '@components/shared';
import { IRegData } from '@domain/interfaces';
import { ac_preRegister, ac_register } from '@store';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { FifthStep, FirstStep, FourthStep, SecondStep, ThirdStep } from './components';
import './Registration.scss';

export enum ERegSteps {
  step1,
  step2,
  step3,
  step4,
  step5,
}

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

export function Registration() {
  const [name, setName] = useState<string>('XXXX');
  const [formData, setFormData] = useState<IRegData>();
  const [activeStep, setActiveStep] = useState<ERegSteps>(ERegSteps.step1);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [continueReg, setContinueReg] = useState<boolean | null>(null);
  const regData = getLocalStorageRegData();
  const dispatch = useDispatch();

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
    }
    if (continueReg === false) {
      localStorage.removeItem('regData');
    }
  }, [continueReg]);

  const { t } = useTranslation();

  async function onSubmitFn(data: any) {
    setFormData({ ...formData, ...data });
    setActiveStep(activeStep + 1);

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
        preparedData['domain'] = 'com'; //TODO remove
        preparedData['username'] = formData.step1.email;
        dispatch(ac_register(preparedData, () => console.log('registered, i hope')));
      }
    }

    if (activeStep !== ERegSteps.step4 && activeStep !== ERegSteps.step5) {
      setLocalStorageRegData(data);
    }
  }

  return (
    <div className="registration">
      <Container>
        <Row>
          <Col sm={12} md={7} lg={5} className="m-auto">
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
      <Modal isOpen={isModalOpen} isOpenDispatcher={setModalOpen}>
        {t('Do you want to continue registration')}
        <Row>
          <Col xs={6}>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                setContinueReg(true);
                setModalOpen(false);
              }}
              className="fadeFromBottom-row__5"
            >
              {t('Yes, continue')}
            </Button>
          </Col>
          <Col xs={6}>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                setContinueReg(false);
                setModalOpen(false);
              }}
              className="fadeFromBottom-row__5"
            >
              {t('No, start new')}
            </Button>
          </Col>
        </Row>
      </Modal>
    </div>
  );
}

export default Registration;
