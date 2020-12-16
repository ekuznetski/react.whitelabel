import { Svg } from '@components/shared';
import i18n from 'i18next';
import React from 'react';
const t = i18n.getFixedT(i18n.language);

export const config = {
  contactsList: [
    {
      title: t('Client Support'),
      points: [
        {
          icon: 'envelope',
          label: 'support@hycm.com',
        },
        {
          icon: 'clock',
          label: t('Working hours 24 5'),
        },
      ],
    },
    {
      title: t('Account Opening'),
      points: [
        {
          icon: 'envelope',
          label: 'accounts@hycm.com',
        },
        {
          icon: 'phone',
          label: '+44 (208) 816-7812',
        },
        {
          icon: 'clock',
          label: t('Working hours 24 5'),
        },
      ],
    },
    {
      title: t('General Inquiries'),
      points: [
        {
          icon: 'envelope',
          label: 'info@hycm.com',
        },
        {
          icon: 'phone',
          label: '+44 (208) 816-7812',
        },
        {
          icon: 'clock',
          label: t('Working hours 24 5'),
        },
      ],
    },
    {
      title: t('Complaints'),
      points: [
        {
          icon: 'envelope',
          label: 'complaints@hycm.com',
        },
        {
          icon: 'clock',
          label: '9:00 - 18.00 (GMT +3)',
        },
      ],
    },
  ],
  officesCards: [
    {
      header: officesCardHeader('London, United Kingdom', 'Headquarters'),
      content: '18 King William Street London, EC4N 7BP',
      uid: 1,
    },
    {
      header: officesCardHeader('Limassol, Cyprus', 'Europe'),
      content: 'The Noble Center, 4th Floor 47 Spyrou Kyprianou Avenue, Mesa Geitonia 4003',
      uid: 2,
    },
    {
      header: officesCardHeader('Dubai, United Arab Emirates', 'Dubai Office'),
      content: '9th Floor, Liberty House, Dubai International Financial Center',
      uid: 3,
    },
    {
      header: officesCardHeader('Sharq, Kuwait', 'Kuwait Office'),
      content: '31st Floor KIPCO Tower Khalid Bin Al Waleed Street',
      uid: 4,
    },
    {
      header: officesCardHeader('Hong Kong', 'HENYEP Group Headquarters'),
      content: '10th Floor, Nine Queens Road Central',
      uid: 5,
    },
    {
      header: officesCardHeader('London, United Kingdom', 'Headquarters'),
      content: '71 Fort Street, 1st Floor Appleby Tower, P.O. Box 950, Grand Cayman, KY1-1102',
      uid: 6,
    },
  ],
};

function officesCardHeader(location: string, office: string) {
  return (
    <>
      <div className="location mb-5">
        <Svg href="globe" width={16} className="mr-3" />
        {location}
      </div>
      <div className="office">
        {office}
        <div className="office-line mt-6"></div>
      </div>
    </>
  );
}
