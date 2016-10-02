import {
  GraphQLString,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLList
} from 'graphql';

export const SeriesType = new GraphQLObjectType({
  name: 'Series',
  description: 'All core data pertaining to a specific series',

  fields: () => ({
    aliases: {
      type: new GraphQLList(GraphQLString)
    },
    banner: {
      type: GraphQLString
    },
    firstAired: {
      type: GraphQLString
    },
    id: {
      type: GraphQLInt
    },
    network: {
      type: GraphQLString
    },
    networkId: {
      type: GraphQLInt
    },
    runtime: {
      type: GraphQLString
    },
    overview: {
      type: GraphQLString
    },
    seriesName: {
      type: GraphQLString
    },
    status: {
      type: GraphQLString
    },
    genre: {
      type: new GraphQLList(GraphQLString)
    },
    lastUpdated: {
      type: GraphQLInt
    },
    airsDayOfWeek: {
      type: GraphQLString
    },
    airsTime: {
      type: GraphQLString
    },
    rating: {
      type: GraphQLString
    },
    imdbId: {
      type: GraphQLString
    },
    zap2itId: {
      type: GraphQLString
    },
    added: {
      type: GraphQLString
    },
    addedBy: {
      type: GraphQLInt
    },
    siteRating: {
      type: GraphQLInt
    },
    siteRatingCount: {
      type: GraphQLInt
    }
  })
});
