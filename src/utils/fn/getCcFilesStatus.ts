import { EClientStatusCode, EDocumentsType } from '@domain/enums';
import { TClientStatus } from '@domain/interfaces';
import { MDocuments } from '@domain/models';
import { generateStatus } from './generateStatus';

export function getCcFilesStatus(filesList: EDocumentsType[], documents: MDocuments): TClientStatus {
  return documents
    .getAllDocumentsOfTypes(filesList)
    .map((file) => file.code)
    .reduce((a, c, i, arr) => {
      if (arr.includes(EClientStatusCode.rejected) && arr.splice(1))
        // if arr includes rejected code, enforce arr to be the size of 1, so the .reduce() has only 1 iteration
        return generateStatus(EClientStatusCode.rejected);
      return generateStatus(EClientStatusCode.submitted);
    }, generateStatus(EClientStatusCode.notSubmitted));
}
