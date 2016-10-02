/// <reference path="./typings.d.ts" />
import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull
} from 'graphql';

import {
  seriesQuery,
  searchQuery
} from './types';


const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Query the server',
  fields: () => ({
    series: seriesQuery,
    search: searchQuery
  })
});


export default new GraphQLSchema({
  query: QueryType
})
