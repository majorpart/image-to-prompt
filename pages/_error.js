import React from 'react';
import NextErrorComponent from 'next/error';

function Error({ statusCode, hasGetInitialPropsRun, err }) {
  if (!hasGetInitialPropsRun && err) {
    // getInitialProps is not called in case of
    // https://github.com/vercel/next.js/issues/8592. As a workaround, we pass
    // err via _app.js so it can be captured
    return null;
  }

  return <NextErrorComponent statusCode={statusCode} />;
}

Error.getInitialProps = async ({ res, err, asPath }) => {
  const errorInitialProps = await NextErrorComponent.getInitialProps({
    res,
    err,
  });

  // Workaround for https://github.com/vercel/next.js/issues/8592, mark when
  // getInitialProps has run
  errorInitialProps.hasGetInitialPropsRun = true;

  // Running on the server, the response object is available.
  //
  // Next.js will pass an err on the server if a page's data fetching methods
  // threw or returned a Promise that rejected
  //
  // Running on the client (browser), Next.js will provide an err if:
  //
  //  - a page's `getInitialProps` threw or returned a Promise that rejected
  //  - an error was thrown before render (RenderError)
  //  - an error was thrown during render (RenderError)
  //  - an error was caught in the error boundary and passed to the error
  //    page via `getInitialProps` (via `err` prop)
  //
  // In any of the above cases Next.js will pass an `err` object to the error
  // page, which can be used to render a custom error page.

  if (res?.statusCode === 404) {
    // Returning `{ statusCode: 404 }` from `getInitialProps` will trigger Next.js's
    // 404 page. This is useful if you want to show a custom 404 page or handle
    // 404s in a different way.
    return { statusCode: 404 };
  }

  // If the error page has a `getInitialProps` method, it will be called so that
  // the error can be logged. This is useful for error reporting.
  if (err) {
    console.error('Error in _error.js:', err);
    return errorInitialProps;
  }

  // This allows to have a custom error page that can receive error data.
  return errorInitialProps;
};

export default Error;

