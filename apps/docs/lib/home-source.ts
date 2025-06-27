import { home } from '@/.source'
import { loader } from 'fumadocs-core/source'

export const homeSource = loader({
  baseUrl: '/',
  source: home.toFumadocsSource(),
})
