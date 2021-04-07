
import { NextPage } from 'next';
import { ParsedUrlQuery } from 'node:querystring';

interface Params extends ParsedUrlQuery {
  slug: string,
}

const Edit: NextPage = ()