import {
  GraphQLString,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLList
} from 'graphql';
import { EpisodeType } from '../episode/episode.type';
import { EpisodeSortEnumGQL, EpisodeSortEnum } from '../../connectors/tvdb.connector';


export const SeriesSearchType = new GraphQLObjectType({
  name: 'Search_Result',
  description: 'A list of series matching the search string',

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
    overview: {
      type: GraphQLString
    },
    seriesName: {
      type: GraphQLString
    },
    status: {
      type: GraphQLString
    },
    episodeCount: {
      type: GraphQLInt,
      resolve: (series, args, context) => context.tvdb.getEpisodeCount(series.id)
    },
    episodes: {
      args: {
        limit: {
          type: GraphQLInt
        },
        season: {
          type: GraphQLInt
        },
        sortBy: {
          type: EpisodeSortEnumGQL
        }
      },
      type: new GraphQLList(EpisodeType),
      resolve: (series, args: {sortBy: EpisodeSortEnum}, context, ast) => context.tvdb.getEpisodesOfSeries(series.id, args.sortBy)
    }
  })
});
