// Generouted, changes to this file will be overriden
/* eslint-disable */

import { components, hooks, utils } from '@generouted/react-router/client'

export type Path =
  | `/auth/login`
  | `/auth/onboarding`
  | `/auth/sso`
  | `/dashboard`
  | `/dashboard/mahasiswa`
  | `/dashboard/malpun`
  | `/dashboard/organisator`
  | `/dashboard/panitia`
  | `/dashboard/qrscanner/malpun`
  | `/dashboard/qrscanner/state`
  | `/dashboard/state`
  | `/dashboard/state/:id`
  | `/dashboard/toggles`
  | `/dashboard/verification`

export type Params = {
  '/dashboard/state/:id': { id: string }
}

export type ModalPath = never

export const { Link, Navigate } = components<Path, Params>()
export const { useModals, useNavigate, useParams } = hooks<Path, Params, ModalPath>()
export const { redirect } = utils<Path, Params>()
