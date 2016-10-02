NOTE: This is extremely early WIP - work will be gradually done on this as I have time/chance

An Unofficial wrapper for the TVDB v2 api.

Ensure `process.env.TVDB_API_KEY` is set with your API key.
```
Run Dev
- npm install
- npm start
- Go to http://localhost:4000/graphiql (For the GraphIQL UI)
- http://localhost:4000/graphql (for standard requests)
```

```
Run Production build
- npm run build:prod
```


Example
------------
```
query {
  series(id:175001) {
    seriesName
  }
}
```
returns:
```
{
  "data": {
    "series": {
      "seriesName": "Teen Wolf"
    }
  }
}
```
