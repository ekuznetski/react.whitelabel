import { MTransactionalStatement } from '@domain/models';
import classNames from 'classnames';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { TransactionStatementSearchItem } from '..';
import './TransactionStatementSearchSection.scss';

interface IStatementSearchResult {
  title: string | React.ReactFragment;
  statements: MTransactionalStatement[];
  className?: string;
}

export const StatementSearchResultSection = memo(function StatementSearchResultSection({
  title,
  statements,
  className,
}: IStatementSearchResult) {
  const { t } = useTranslation();

  return (
    <div className={classNames('statement-search-result-section', className)}>
      <div className="search-result__title mb-6">{title}</div>
      <div className="search-result__info">
        {statements.length
          ? statements.map((statement, idx) => <TransactionStatementSearchItem {...statement} key={idx} />)
          : t('No statement found for the defined period', { statementType: title })}
      </div>
    </div>
  );
});
