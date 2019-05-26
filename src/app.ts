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
        title: 'Stats'
      },
      {
        route: 'observation',
        name: 'observation',
        moduleId: PLATFORM.moduleName('views/observation'),
        nav: true,
        title: 'Observations'
      },
      {
        route: 'addcomment/:id',
        name: 'addcomment',
        moduleId: PLATFORM.moduleName('views/addcomment'),
        nav: false,
        title: 'Add Comment'
      },

      {
        route: 'viewcomment/:id',
        name: 'viewcomment',
        moduleId: PLATFORM.moduleName('views/viewcomment'),
        nav: false,
        title: 'View Comments'
      }


    ]);
    this.router = router;
  }
}
