import { countries, Country } from '@domain/enums';
import { ITins } from '@domain/interfaces';

export class MTins {
  choice: boolean;
  reason: boolean;
  tins: { country: Country; tax_number: string }[];

  constructor(props: ITins) {
    this.choice = props.choice;
    this.reason = props.reason == 'yes' ? true : props.reason == 'no' ? false : !!props.reason;
    this.tins = props.tins.map((item) => ({
      country: countries.find((country) => country.name === item.country) || {
        name: undefined,
        code: undefined,
        phoneCode: '',
      },
      tax_number: item.tax_number,
    }));
  }
}
