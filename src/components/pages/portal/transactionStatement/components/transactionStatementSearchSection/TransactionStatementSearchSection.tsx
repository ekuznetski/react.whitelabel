import { MTransactionalStatement } from '@domain/models';
import classNames from 'classnames';
import React, { memo } from 'react';
import { TransactionStatementSearchItem } from '..';

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
  return statements.length ? (
    <div className={classNames('statement-search-result-section', className)}>
      <div className="search-result__title mb-6">{title}</div>
      {statements.map((statement) => (
        <TransactionStatementSearchItem {...statement} />
      ))}
    </div>
  ) : null;
});
