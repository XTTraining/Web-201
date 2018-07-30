import express from 'express';
import renderer from './helpers/renderer';
import reducers from './client/reducers';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const app = express();
app.use(express.static('public'));

app.get('*', (req, res) => {
    const store = createStore(reducers,{}, applyMiddleware(thunk));

    res.send(renderer(req, store));
});

app.listen(3000, () => {
    console.log('listening on port 3000 :)');
});