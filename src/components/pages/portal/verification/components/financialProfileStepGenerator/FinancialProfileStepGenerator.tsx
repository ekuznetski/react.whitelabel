import React, { Fragment, memo } from 'react';
import { AnyFunction, IFPQuestion, IFPState } from '@domain/interfaces';
import { EFPQuestionView } from '@domain/enums';
import { Button, Checkbox, Input, IRadioItem, Radio, Select } from '@components/shared';
import { FieldValidators, FPAnswers } from '@domain';
import { Form, Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

function getQuestionInputName(state: IFPState, question: IFPQuestion): string | null {
  const lastAnswerId = state.data.slice(-1)[0]?.answer;
  if (state.data.length && typeof question.id === 'object' && !question.id[lastAnswerId]) {
    return null;
  }
  return state.data.length && typeof question.id !== 'number' ? `q_${question.id[lastAnswerId]}` : `q_${question.id}`;
}

const CreateQuestion = memo(function CreateQuestion({ question, state }: { question: IFPQuestion; state: IFPState }) {
  const options = question.answers.reduce((acc: IRadioItem[], e) => {
    if (question.answers.includes(e)) {
      acc.push({
        label: FPAnswers[e].text,
        value: FPAnswers[e].apiId.toString(),
      });
    }
    return acc;
  }, []);
  const name = getQuestionInputName(state, question);
  if (!name) {
    return null;
  }
  const props = {
    name: name,
    options: options,
  };
  switch (question.view) {
    case EFPQuestionView.radio:
      return (
        <>
          <h4>{question.text}</h4>
          <Radio optionClassName={'col-6'} {...props} />
        </>
      );
    case EFPQuestionView.radioWithIcon:
      return (
        <>
          <h4>{question.text}</h4>
          <Radio optionClassName={'col-12'} {...props} />
        </>
      );
    case EFPQuestionView.select:
      return <Select {...props} label={question.text} />;
  }
});

export const FinancialProfileStepGenerator = memo(function FinancialProfileStep({
  state,
  submitFn,
}: {
  state: IFPState;
  submitFn: AnyFunction;
}) {
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
            {state.questions.map((question) => {
              const name = getQuestionInputName(state, question);
              return (
                <Fragment key={JSON.stringify(question.id)}>
                  <CreateQuestion state={state} question={question} />
                  {name && FPAnswers[props.values[name]]?.needRemark && (
                    <Input name={name + '_remark'} label={t('Please Specify')} />
                  )}
                </Fragment>
              );
            })}
            <Button type="submit">{t('Submit')}</Button>
          </Form>
        );
      }}
    </Formik>
  );
});
