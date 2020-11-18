import React, { memo, useState } from 'react';
import { FinancialProfileStepGenerator, FinancialProfileLastStep } from '..';
import { FPQuestions } from '@domain';
import { EFPSteps } from '@domain/enums';
import { IFPState } from '@domain/interfaces';
import './FinancialProfile.scss';

export const FinancialProfile = memo(function FinancialProfile() {
  console.log(123);
  const [state, setState] = useState<IFPState>({
    step: EFPSteps.step1,
    data: [],
    questions: FPQuestions.filter((e) => e.step === EFPSteps.step1),
  });
  function submitFn(data: any) {
    if (state.step === Object.keys(EFPSteps).length / 2) {
      console.log('submit kyc', state.data);
      return;
    }
    data = Object.keys(data).map((e) => ({
      question: parseInt(e.replace('q_', '')),
      answer: data[e as keyof typeof data],
    }));
    setState((__state: IFPState) => {
      console.log(__state);
      return {
        step: __state.step + 1,
        data: [...__state.data, ...data],
        questions: FPQuestions.filter((e) => e.step === __state.step + 1),
      };
    });
  }
  return (
    <div className="financial-profile">
      {state.step !== Object.keys(EFPSteps).length / 2 ? (
        <FinancialProfileStepGenerator state={state} submitFn={submitFn} />
      ) : (
        <FinancialProfileLastStep submitFn={submitFn} />
      )}
      <div className="progress-bar">
        <div
          className="progress-bar-active"
          style={{ width: `${(100 / (Object.keys(EFPSteps).length / 2)) * state.step}%` }}
        >
          <div className="progress">{`${(100 / (Object.keys(EFPSteps).length / 2)) * state.step}%`}</div>
        </div>
      </div>
      <pre>{JSON.stringify(state, null, '\t')}</pre>
    </div>
  );
});
