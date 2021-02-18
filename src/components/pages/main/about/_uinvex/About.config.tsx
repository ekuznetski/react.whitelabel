import { Img } from '@components/shared';
import i18n from '@i18next';
import React from 'react';
import { config as _config } from '@pages/main/about/About.config';

const t = i18n.getLazyT;

export const config = {
  ..._config,
  inTouchCards: [
    {
      className: 'p-10',
      header: (
        <>
          <span>{`<`}</span>12
        </>
      ),
      content: t('Less Than 12ms Execution Time'),
      uid: 1,
    },
    {
      className: 'p-10',
      header: (
        <>
          500<span>+</span>
        </>
      ),
      content: t('Orders Executed per Day'),
      uid: 2,
    },
    {
      className: 'p-10',
      header: (
        <>
          10<span>+</span>
        </>
      ),
      content: t('Customer support in 10 languages'),
      uid: 3,
    },
  ],
};
