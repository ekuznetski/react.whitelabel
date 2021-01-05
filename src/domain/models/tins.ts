import { Country, countries } from '@domain/enums';
import { ITins } from '@domain/interfaces';

const initialValue: ITins = {
  choice: null,
  reason: null,
  tins: [],
};
export class MTins {
  choice: boolean | null;
  reason: string | null;
  tins: { country: Country; tax_number: string }[];

  constructor(props: ITins = initialValue) {
    this.choice = props.choice;
    this.reason = props.reason;
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
