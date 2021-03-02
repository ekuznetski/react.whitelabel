export type NumberAttr = number | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';

export type RowColumns = NumberAttr | { cols?: NumberAttr };

export type ColOrder = 'first' | 'last' | NumberAttr;
export type ColSize = boolean | 'auto' | NumberAttr;
export type ColSpec = ColSize | { span?: ColSize; offset?: NumberAttr; order?: ColOrder };

export interface ColProps {
  children?: React.ReactNode;
  className?: string;
  xs?: ColSpec;
  sm?: ColSpec;
  md?: ColSpec;
  lg?: ColSpec;
  xl?: ColSpec;
}

export interface RowProps {
  children?: React.ReactNode;
  className?: string;
  noGutters?: boolean;
  xs?: RowColumns;
  sm?: RowColumns;
  md?: RowColumns;
  lg?: RowColumns;
  xl?: RowColumns;
}

export interface ContainerProps {
  children?: React.ReactNode;
  className?: string;
  fluid?: boolean | 'sm' | 'md' | 'lg' | 'xl';
}
