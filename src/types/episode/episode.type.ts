import {
  GraphQLString,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLList
} from 'graphql';
import { GraphQLNonNull } from 'graphql';


export const EpisodeType = new GraphQLObjectType({
  name: 'Episodes',
  description: 'Details for episodes relating to a specific series',

  fields: () => ({
    absoluteNumber: {
      type: GraphQLInt
    },
    airedEpisodeNumber: {
      type: GraphQLInt
    },
    airedSeason: {
      type: GraphQLInt
    },
    airedSeasonID: {
      type: GraphQLInt
    },
    dvdEpisodeNumber: {
      type: GraphQLInt
    },
    dvdSeason: {
      type: GraphQLInt
    },
    episodeName: {
      type: GraphQLString
    },
    firstAired: {
      type: GraphQLString
    },
    id: {
      type: GraphQLInt
    },
    language: {
      type: EpisodeLanguageType
    },
    overview: {
      type: GraphQLString
    }
  })
});

export const EpisodeLanguageType = new GraphQLObjectType({
  name: 'Episode_Language',
  description: 'Language details for a specific episode',
  fields: () => ({
    episodeName: {
      type: GraphQLString
    },
    overview: {
      type: GraphQLString
    }
  })
});
