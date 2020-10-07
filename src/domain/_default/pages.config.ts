import {
  About,
  Contacts,
  Platform,
  Products,
  Registration,
  Home,
  ForgotPassword,
  ResetPassword,
} from '@components/pages';
import { IPageSectionsConfig } from '../interfaces';

export const pageSectionsConfig: IPageSectionsConfig[] = [
  { component: About, sections: [] },
  { component: Contacts, sections: [] },
  { component: Platform, sections: [] },
  { component: Products, sections: [] },
  { component: Registration, sections: [] },
  { component: Home, sections: [] },
  { component: ForgotPassword, sections: [] },
  { component: ResetPassword, sections: [] },
];
