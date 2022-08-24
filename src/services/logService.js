import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

function init() {
  Sentry.init({
    dsn: "https://b00ef05f02b14dc4a0ca359305d873bb@o1370925.ingest.sentry.io/6674815",
    integrations: [new BrowserTracing()],
    tracesSampleRate: 1.0,
  });
}

export function log(error) {
  Sentry.captureException(error);
}

const logger = {
  init,
};

export default logger;
