import express from 'express';
import renderer from './helpers/renderer';
import reducers from './client/reducers';
import {matchRoutes} from 'react-router-config';
import Routes from './client/Routes';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const app = express();
app.use(express.static('public'));

app.get('*', (req, res) => {
    const store = createStore(reducers,{}, applyMiddleware(thunk));
    const promises = matchRoutes(Routes, req.path)
    .map(({ route }, i) => {
        if(route.loadData){
            route.loadData(store);
            console.log(store.getState());
        }
      return route.loadData ? route.loadData(store) : null;
    });
    Promise.all(promises).then(()=>{
        res.send(renderer(req, store));
    });
});

app.listen(3000, () => {
    console.log('listening on port 3000 :)');
});