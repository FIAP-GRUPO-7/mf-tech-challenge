import { registerApplication, start, LifeCycles } from "single-spa";

// Chart
registerApplication({
  name: "@grupo7/chart",
  app: () => System.import<LifeCycles<any>>("@grupo7/chart"),
  activeWhen: ["/"],
});

// Extract List
registerApplication({
  name: "@grupo7/extractlist",
  app: () => System.import<LifeCycles<any>>("@grupo7/extractlist"),
  activeWhen: ["/"],
});

// Greeting Card
registerApplication({
  name: "@grupo7/greetingcard",
  app: () => System.import<LifeCycles<any>>("@grupo7/greetingcard"),
  activeWhen: ["/"],
});

// Header
registerApplication({
  name: "@grupo7/header",
  app: () => System.import<LifeCycles<any>>("@grupo7/header"),
  activeWhen: ["/"],
});

// Sidebar
registerApplication({
  name: "@grupo7/sidebar",
  app: () => System.import<LifeCycles<any>>("@grupo7/sidebar"),
  activeWhen: ["/"],
});

start();
