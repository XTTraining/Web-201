import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import Routes from '../client/Routes';
import { Provider } from 'react-redux';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';

export default (req, store) => {
    const sheet = new ServerStyleSheet();

    const content = renderToString(
        <Provider store={store}>
            <StaticRouter location={req.path} context={{}}>
                <StyleSheetManager sheet={sheet.instance}>
                    <div>{renderRoutes(Routes)}</div>
                </StyleSheetManager>
            </StaticRouter>
        </Provider>);
    return `<html lang="en"><head>
                <title>Khana Peena</title>
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <meta name="description" content="Khana Peena">
                <meta name="keywords" content="Khaana-Peena,Food,Online">
            </head>
                <body>
                    <div id="root">${content}</div>
                    <script src="bundle.js" type="text/javascript">
                    </script>
                </body>
            </html>`;
};