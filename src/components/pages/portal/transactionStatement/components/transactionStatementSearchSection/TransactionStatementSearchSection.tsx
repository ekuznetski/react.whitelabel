import { MTransactionalStatement } from '@domain/models';
import React, { memo } from 'react';
import { TransactionStatementSearchItem } from '..';

interface IStatementSearchResult {
  title: string | React.ReactFragment;
  statements: MTransactionalStatement[];
}

export const StatementSearchResultSection = memo(function StatementSearchResultSection({
  title,
  statements,
}: IStatementSearchResult) {
  return statements.length ? (
    <div className="statement-search-result-section">
      <div className="search-result__title mb-6">{title}</div>
      {statements.map((statement) => (
        <TransactionStatementSearchItem {...statement} />
      ))}
    </div>
  ) : null;
});
