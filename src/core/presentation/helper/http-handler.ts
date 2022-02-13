import { Response } from 'express';
import { DomainError } from '../../domain/errors/domain-error';
import { ControllerError } from '../error/controller-error';

export const ok = (res: Response, data?: any, code?: number) => {
  return res.status(code ? code : 200).send({
    ok: true,
    data,
  });
};

export const serverError = (res: Response, error?: any) => {
  if (error instanceof DomainError || error instanceof ControllerError) {
    return res.status(error.code).send({
      ok: false,
      error: error.message,
      identifier: error.name,
    });
  }

  if (error instanceof Error) {
    return res.status(500).send({
      ok: false,
      error: error.message,
      identifier: error.name,
    });
  }

  return res.status(500).send({
    ok: false,
    error,
    identifier: 'Erro desconhecido.',
  });
};
