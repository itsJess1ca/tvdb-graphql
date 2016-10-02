interface SearchResult {
  data: Search[]
}

interface Search {
  aliases: string[];
  banner: string;
  firstAired: string;
  id: number;
  network: string;
  overview: string;
  seriesName: string;
  status: string;
}

interface SeriesResult {
  data: Series
}

interface Series {
  aliases: string[];
  banner: string;
  firstAired: string;
  id: number;
  network: string;
  networkId: string;
  runtime: string;
  overview: string;
  seriesName: string;
  status: string;
  genre: string;
  lastUpdated: number;
  airsDayOfWeek: string;
  airsTime: string;
  rating: string;
  imdbId: string;
  zap2itId: string;
  added: string;
  addedBy: number;
  siteRating: number;
  siteRatingCount: number;
}

interface EpisodeResult {
  links: {
    first: number;
    last: number;
    next: number;
    prev: number;
  };
  data: Episode[];
  errors: {
    invalidFilters: string;
    invalidLanguage: string;
    invalidQueryParams: string;
  }
}

interface Episode {
  absoluteNumber: number;
  airedEpisodeNumber: number;
  airedSeason: number;
  airedSeasonID: number;
  dvdEpisodeNumber: number;
  dvdSeason: number;
  episodeName: string;
  firstAired: string;
  id: number;
  language: {
    episodeName: string;
    overview: string;
  };
  overview: string;
  guestStars: string[];
  directors: string[];
  writers: string[];
  productionCode: string;
  showUrl: string;
  lastUpdated: number;
  dvdDiscid: string;
  dvdChapter: number;
  filename: string;
  seriesId: string;
  lastUpdatedBy: string;
  airsAfterSeason: number;
  airsBeforeSeason: number;
  airsBeforeEpisode: number;
  thumbAuthor: number;
  thumbAdded: string;
  thumbWidth: string;
  thumbHeight: string;
  imdbId: string;
  siteRating: number;
  siteRatingCount: number
}
