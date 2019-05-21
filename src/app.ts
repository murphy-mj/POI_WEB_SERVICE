import { RouterConfiguration, Router } from 'aurelia-router';
import { PLATFORM } from 'aurelia-pal';

export class App {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router) {
    config.map([
      {
        route: ['', 'donate'],
        name: 'Donate',
        moduleId: PLATFORM.moduleName('views/donate'),
        nav: true,
        title: 'Donate'
      },
      {
        route: 'candidates',
        name: 'candidates',
        moduleId: PLATFORM.moduleName('views/candidates'),
        nav: true,
        title: 'Candidate'
      },
      {
        route: 'logout',
        name: 'logout',
        moduleId: PLATFORM.moduleName('views/logout'),
        nav: true,
        title: 'Logout'
      },
      {
        route: 'dataPoi',
        name: 'dataPoi',
        moduleId: PLATFORM.moduleName('views/dataPoi'),
        nav: true,
        title: 'data-poi'
      },
      {
        route: 'pointsInt',
        name: 'pointsInt',
        moduleId: PLATFORM.moduleName('views/pointsInt'),
        nav: true,
        title: 'Points of Interest'
      },
      {
        route: 'stats',
        name: 'stats',
        moduleId: PLATFORM.moduleName('views/stats'),
        nav: true,
        title: 'Satats'
      },
      {
        route: 'observation',
        name: 'observation',
        moduleId: PLATFORM.moduleName('views/observation'),
        nav: true,
        title: 'Observations'
      }




    ]);
    this.router = router;
  }
}
