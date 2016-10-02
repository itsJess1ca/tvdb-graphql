///<reference path="tvdb.connector.d.ts"/>
import { ROOTURL } from '../config';
import * as fetch from 'node-fetch';
import { GraphQLEnumType } from 'graphql';

class TVDBConnector {
  baseUrl: string = "https://api.thetvdb.com";
  token: string;
  fetchOptions: FetchOptions = {
    headers: {
      "Authorization": `Bearer ${this.token}`
    }
  };

  constructor() {
    //noinspection TypeScriptUnresolvedVariable
    if (!process.env.TVDB_API_KEY) {
      console.error("[TVDB] TVDB_API_KEY environment not set");
      return;
    }
    console.log("[TVDB] Now Running");
    this.getToken()
      .then((token) => {
        console.log("[TVDB] Got auth token");
        this.updateToken(token);
      })
      .catch(err => {console.error("[TVDB] Failed to get auth token: ", err);});
  }

  updateToken(token: string): void {
    this.token = token;
    this.fetchOptions = {
      headers: {
        "Authorization": `Bearer ${this.token}`
      }
    }
  }

  getToken(): Promise<string> {
    return new Promise((resolve, reject) => {
      console.log("[TVDB] Getting auth token");
      //noinspection TypeScriptUnresolvedVariable
      fetch(`${this.baseUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: `{"apikey": "${process.env.TVDB_API_KEY}"}`
      })
        .then(res => {
          if (res.status === 401 || res.status === 404) {
            reject(res.status === 401 ? "Unauthorized" : "Resource not found");
          } else {
            return res;
          }
        })
        .then(res => res.json())
        .then(({token}) => resolve(token))
        .catch((err) => reject(err))
    })
  }

  refreshToken(): Promise<void> {
    return new Promise((resolve, reject) => {
      console.log("Requesting new token");
      //noinspection TypeScriptUnresolvedFunction
      fetch(`${this.baseUrl}/refresh_token`, this.fetchOptions)
        .then(res => res.json())
        .then((data) => {
          console.log("Got new token", data);
          this.token = data.token;
          console.log("token", this.token);
          console.log("headers", this.fetchOptions);
          console.log(data.token);
          resolve();
        })
        .catch(err => {
          console.log("Failed to get new token");
          return reject(err)
        });
    })
  }

  authCheck(res, query: string) {
    console.log("Running auth check");
    if (res.status === 401) {
      // unauthorized
      console.log("Auth check: Failed");
      return this.refreshToken().then(() => {
        return fetch(query, this.fetchOptions)
      });
    } else {
      console.log("Auth check: Success");
      return res;
    }
  }

  search(name: string): Promise<Search[]> {
    return new Promise((resolve, reject) => {
      const query = `${ROOTURL.tvdb}/search/series?name='${name}'`;
      fetch(query, this.fetchOptions)
        .then(res => {return this.authCheck(res, query)})
        .then(res => res.json())
        .then(({data}: SearchResult) => {
          resolve(data);
        })
        .catch(err => {
          console.error(err);
          reject(err);
        })
    })
  }

  getSeriesById(id: number, requestedFields: string[]): Promise<Series> {
    return new Promise((resolve, reject) => {
      const query = `${ROOTURL.tvdb}/series/${id}/filter?keys=${requestedFields.join()}`;
      fetch(query, this.fetchOptions)
        .then(res => {return this.authCheck(res, query)})
        .then(res => res.json())
        .then(({data}: SeriesResult) => {
          resolve(data);
        })
        .catch(err => {
          console.error(err);
          reject(err);
        })
    })
  }

  getEpisodesOfSeries(id: number, sortBy?: EpisodeSortEnum): Promise<any> {
    return new Promise((resolve, reject) => {
      //noinspection TypeScriptUnresolvedFunction
      fetch(`${ROOTURL.tvdb}/series/${id}/episodes`, this.fetchOptions)
        .then(res => res.json())
        .then(({data}) => {
          console.log(sortBy === undefined ? 'no sorting defined' : 'Sort by: ' + sortBy);
          // todo: Set up sorting
          resolve(data);
        })
    })
  }

  getEpisodeCount(id): Promise<number> {
    return new Promise((resolve, reject) => {
      this.getEpisodesOfSeries(id).then(data => {
        resolve(data.length);
      })
    })
  }
}
const EpisodeSortEnumGQL = new GraphQLEnumType({
  name: 'EpisodeSort',
  description: 'How to sort the episodes of the current series',
  values: {
    SERIES: {
      value: 0,
      description: 'Sort by Series number'
    },
    EPISODE: {
      value: 1,
      description: 'Sort by Episode number'
    }
  }
});

interface FetchOptions {
  headers: any;
  method?: "GET" | "POST" | "DELETE" | "PUT";
  redirect?: 'follow' | 'manual' | 'error';
  body?: any;
}

const enum EpisodeSortEnum {
  SERIES,
  EPISODE
}
export default TVDBConnector;
export { EpisodeSortEnum, EpisodeSortEnumGQL };
