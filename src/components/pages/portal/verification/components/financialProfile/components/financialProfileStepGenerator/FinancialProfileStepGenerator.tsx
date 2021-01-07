import { Button, IRadioItem, Input, Radio, Select } from '@components/shared';
import { FPAnswers, FieldValidators } from '@domain';
import { ECurrencyCode, ECurrencySymbol, EFPQuestionView } from '@domain/enums';
import { AnyFunction, IFPQuestion, IFPState } from '@domain/interfaces';
import { Form, Formik, FormikProps } from 'formik';
import React, { Fragment, memo } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

interface FinancialProfileStepGeneratorProps {
  state: IFPState;
  submitFn: AnyFunction;
}

export const FinancialProfileStepGenerator = memo(function FinancialProfileStep({
  state,
  submitFn,
}: FinancialProfileStepGeneratorProps) {
  const { t } = useTranslation();
  const initValues = state.questions.reduce((acc, question) => {
    const name = getQuestionInputName(state, question);
    if (name) {
      Object.assign(acc, {
        [name]: '',
      });
    }
    if (name && question.view === EFPQuestionView.select) {
      Object.assign(acc, {
        [name + '_remark']: '',
      });
    }
    return acc;
  }, {});

  if (!Object.keys(initValues).length) {
    Object.assign(initValues, {
      agreement: '',
    });
  }

  const validationSchema = Yup.object().shape(
    Object.keys(initValues).reduce((acc, name) => {
      if (name.includes('_remark')) {
        Object.assign(acc, {
          [name]: Yup.string().when([name.replace('_remark', '')], {
            is: (val: any) => {
              return !!val && FPAnswers[val]?.needRemark;
            },
            then: FieldValidators.requiredString,
            otherwise: Yup.string().notRequired(),
          }),
        });
      } else {
        Object.assign(acc, {
          [name]: FieldValidators.requiredString,
        });
      }
      return acc;
    }, {}),
  );

  return (
    <Formik
      enableReinitialize={true}
      initialValues={initValues}
      validationSchema={validationSchema}
      onSubmit={(data) => {
        submitFn?.(data);
      }}
    >
      {(props: FormikProps<any>) => {
        return (
          <Form className="m-auto form">
            {state.questions.map((question, q) => {
              const name = getQuestionInputName(state, question);
              return (
                <Fragment key={q}>
                  <CreateQuestion state={state} question={question} />
                  {name && FPAnswers[props.values[name]]?.needRemark && (
                    <Input name={name + '_remark'} label={t('Please Specify')} />
                  )}
                </Fragment>
              );
            })}
            <Button type="submit">{t('Continue')}</Button>
          </Form>
        );
      }}
    </Formik>
  );
});

const CreateQuestion = memo(function CreateQuestion({ question, state }: { question: IFPQuestion; state: IFPState }) {
  const options = question.answers.reduce((acc: IRadioItem[], e) => {
    if (question.answers.includes(e)) {
      acc.push({
        label: FPAnswers[e].text({ currencySymbol: ECurrencySymbol.usd, currencyCode: ECurrencyCode.usd }),
        value: FPAnswers[e].apiId.toString(),
      });
    }
    return acc;
  }, []);
  const name = getQuestionInputName(state, question);

  if (!name) return null;

  const props = { name, options };
  switch (question.view) {
    case EFPQuestionView.radio:
      return (
        <>
          <div className="financial-profile__step-title mb-9">
            {question.text({ currencySymbol: ECurrencySymbol.usd, currencyCode: ECurrencyCode.usd })}
          </div>
          <Radio className="mb-10" optionClassName={'col-6'} {...props} />
        </>
      );
    case EFPQuestionView.radioWithIcon:
      return (
        <>
          <div className="financial-profile__step-title mb-9">
            {question.text({ currencySymbol: ECurrencySymbol.usd, currencyCode: ECurrencyCode.usd })}
          </div>
          <Radio className="mb-10" optionClassName={'col-12'} {...props} />
        </>
      );
    case EFPQuestionView.select:
      return (
        <Select
          {...props}
          label={question.text({ currencySymbol: ECurrencySymbol.usd, currencyCode: ECurrencyCode.usd })}
        />
      );
  }
});

function getQuestionInputName(state: IFPState, question: IFPQuestion): string | null {
  const lastAnswerId = state.data.slice(-1)[0]?.answer;

  if (state.data.length && typeof question.id === 'object' && !question.id[lastAnswerId]) {
    return null;
  }

  return state.data.length && typeof question.id !== 'number' ? `q_${question.id[lastAnswerId]}` : `q_${question.id}`;
}
