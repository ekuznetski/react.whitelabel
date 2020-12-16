export interface ITins {
  choice: boolean;
  reason: string | null;
  tins: { country: string; tax_number: string }[];
}
