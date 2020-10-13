import { IBaseResponse, IClientProfile } from '..';

export interface IEditProfileRequest {
  first_name: string;
  surname: string;
  country: string;
  street: string;
  city: string;
  postcode: string;
  phone_prefix: number;
  phone: number;
  email: string;
}

export type IEditProfileResponse = {
  response: {
    data: IClientProfile;
  };
} & IBaseResponse;
