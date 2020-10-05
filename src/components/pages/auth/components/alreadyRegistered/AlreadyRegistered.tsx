import React from 'react';
import { Link } from 'react-router-dom';
import './AlreadyRegistered.scss';

export function AlreadyRegistered() {
  return (
    <div className="mt-5 text-center auth-under-form fadeFromBottom-row__6">
      Already Registered?
      <Link className="already__link ml-1" to={`/login`}>
        Sign In
      </Link>
    </div>
  );
}
