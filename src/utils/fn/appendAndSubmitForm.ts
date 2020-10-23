import { AnyFunction } from '@domain/interfaces';

export function appendAndSubmitForm(url: string, data: { [key: string]: any }): any {
  const form = document.createElement('form');
  form.setAttribute('action', 'https://api.hycm.com/deposits/add');
  form.setAttribute('method', 'post');
  Object.keys(data).forEach((key) => {
    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('name', key);
    input.setAttribute('value', data[key]);
    form.appendChild(input);
  });
  document.body.appendChild(form);
  form.submit();
  return '123';
}
