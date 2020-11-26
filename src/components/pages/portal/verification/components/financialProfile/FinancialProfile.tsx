import React, { memo, useState } from 'react';
import { FinancialProfileLastStep, FinancialProfileStepGenerator } from '..';
import { FPQuestions } from '@domain';
import { EClientStatusCode, EFPSteps } from '@domain/enums';
import { IFPState, ISubmitFPRequest, ISubmitFPRequestItem } from '@domain/interfaces';
import './FinancialProfile.scss';
import { useDispatch, useSelector } from 'react-redux';
import { ac_submitFinancialProfile, IStore } from '@store';
import { MClientData } from '@domain/models';
import { Svg } from '@components/shared';
import { Col } from 'react-bootstrap';

export const FinancialProfile = memo(function FinancialProfile() {
  const { statusData } = useSelector<IStore, { statusData: MClientData }>((state) => ({
    statusData: state.data.client.statusData,
  }));
  const dispatch = useDispatch();
  const [state, setState] = useState<IFPState>({
    step: EFPSteps.step1,
    data: [],
    questions: FPQuestions.filter((e) => e.step === EFPSteps.step1),
  });
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
  const progressPercent = (100 / (Object.keys(EFPSteps).length / 2)) * state.step;
  return statusData.fp_status.code === EClientStatusCode.submitted ? (
    <div className="text-center">
      <h3>Financial profile Completed</h3>
      <Svg className="mt-5" href="profile-completed" width={78} />
    </div>
  ) : (
    <div className="financial-profile">
      {state.step !== Object.keys(EFPSteps).length / 2 ? (
        <FinancialProfileStepGenerator state={state} submitFn={submitFn} />
      ) : (
        <FinancialProfileLastStep submitFn={submitFn} />
      )}
      <div className="progress-bar">
        <div className="progress-bar-active" style={{ width: `${progressPercent}%` }}>
          <div
            className="progress"
            style={{ right: `${progressPercent ? '-15' : '-26'}px` }}
          >{`${progressPercent}%`}</div>
        </div>
      </div>
      <pre>{JSON.stringify(state, null, '\t')}</pre>
    </div>
  );
});
