import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import Routes from '../client/Routes';
import { Provider } from 'react-redux';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';

export default (req, store) => {
    const sheet = new ServerStyleSheet();

    const content = renderToString(
        <Provider store={store}>
            <StaticRouter location={req.path} context={{}}>
                <StyleSheetManager sheet={sheet.instance}>
                    <Routes />
                </StyleSheetManager>
            </StaticRouter>
        </Provider>);
    return `<html><head>
                <title>Khana Peena</title>
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <meta name="description" content="Free Web tutorials">
                <meta name="keywords" content="HTML,CSS,XML,JavaScript">
            </head>
                <body>
                    <div id="root">${content}</div>
                    <script src="bundle.js" type="text/javascript">
                    </script>
                </body>
            </html>`;
};