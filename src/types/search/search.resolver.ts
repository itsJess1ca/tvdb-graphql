import * as fetch from 'node-fetch';
import { ROOTURL } from '../../config';

export function SearchResolver(_, {name}: {name: string}, context, ast) {
  console.log("Fetching results for ", name);
  return context.tvdb.search(name);
}
