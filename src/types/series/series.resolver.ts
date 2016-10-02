import * as fetch from 'node-fetch';
import { ROOTURL } from '../../config';

export function SeriesResolver(_, {id}: {id: number}, context, ast): Promise<any> {
  const requestedFields = ast.fieldASTs[0].selectionSet.selections.map(selection => selection.name.value);
  console.log(`Requesting ${`${ROOTURL.tvdb}/series/${id}/filter?keys=${requestedFields.join()}`}`);
  return context.tvdb.getSeriesById(id, requestedFields);
}
