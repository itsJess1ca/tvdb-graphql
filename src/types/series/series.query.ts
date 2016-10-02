import {
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull
} from 'graphql';

import {
  SeriesType,
  SeriesResolver
} from './';

export const seriesQuery = {
  type: SeriesType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLInt) }
  },
  resolve: SeriesResolver
};
