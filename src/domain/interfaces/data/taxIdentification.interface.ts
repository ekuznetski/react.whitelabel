export interface ITins {
  choice: boolean | null;
  reason: string | null;
  tins: ITinsList[];
}

export interface ITinsList {
  country: string;
  tax_number: string;
}
