import { Svg } from '@components/shared';
import { FPQuestions } from '@domain';
import { EClientStatusCode, EFPSteps } from '@domain/enums';
import { IFPState, ISubmitFPRequest, ISubmitFPRequestItem } from '@domain/interfaces';
import { MClientStatus } from '@domain/models';
import { ac_submitFinancialProfile, IStore } from '@store';
import classNames from 'classnames';
import React, { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { FinancialProfileLastStep, FinancialProfileStepGenerator } from './components';
import './FinancialProfile.scss';

export const FinancialProfile = memo(function FinancialProfile() {
  const { statusData } = useSelector<IStore, { statusData: MClientStatus }>((state) => ({
    statusData: state.data.client.statusData,
  }));
  const [state, setState] = useState<IFPState>({
    step: EFPSteps.step1,
    data: [],
    questions: FPQuestions.filter((e) => e.step === EFPSteps.step1),
  });
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const progressPercent = (100 / (Object.keys(EFPSteps).length / 2)) * state.step;

  function submitFn(data: any) {
    if (state.step === Object.keys(EFPSteps).length / 2) {
      const preparedData: ISubmitFPRequest = { kyc_answer: JSON.stringify(state.data) };
      dispatch(ac_submitFinancialProfile(preparedData));
      return;
    }
    data = Object.keys(data)
      .filter((e: string) => !e.includes('remark'))
      .map(
        (e): ISubmitFPRequestItem => {
          const result = {
            question: e.replace('q_', ''),
            answer: data[e as keyof typeof data],
          };
          if (Object.keys(data).includes(e + '_remark') && data[e + '_remark']) {
            Object.assign(result, { remark: data[e + '_remark'] });
          }
          return result;
        },
      );

    setState((__state: IFPState) => {
      return {
        step: __state.step + 1,
        data: [...__state.data, ...data],
        questions: FPQuestions.filter((e) => e.step === __state.step + 1),
      };
    });
  }

  return (
    <div className="financial-profile form-wrapper py-10 px-9 col-xl-10 col-12 m-auto">
      {statusData.fp_status.code === EClientStatusCode.submitted ? (
        <div className="text-center">
          <h3>{t('Financial Profile Completed')}</h3>
          <Svg className="mt-5" href="profile-completed" width={78} />
        </div>
      ) : (
        <>
          {state.step !== Object.keys(EFPSteps).length / 2 ? (
            <FinancialProfileStepGenerator state={state} submitFn={submitFn} />
          ) : (
            <FinancialProfileLastStep submitFn={submitFn} />
          )}
          <div
            className={classNames(
              'financial-profile__progress-bar mt-12',
              progressPercent === 100 && 'full',
              progressPercent === 0 && 'empty',
            )}
          >
            <div className="progress-bar__progress" style={{ width: `${progressPercent}%` }}>
              <div className="progress-bar__progress-label">{`${progressPercent}%`}</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
});
