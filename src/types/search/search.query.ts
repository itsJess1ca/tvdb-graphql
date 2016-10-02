import {
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList
} from 'graphql';
import {
  SeriesSearchType,
  SearchResolver
} from './';

export const searchQuery = {
  type: new GraphQLList(SeriesSearchType),
  args: {
    name: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve: SearchResolver
};
