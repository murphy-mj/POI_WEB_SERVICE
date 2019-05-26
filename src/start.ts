import { inject } from 'aurelia-framework';
import { RouterConfiguration, Router } from 'aurelia-router';
import { PLATFORM } from 'aurelia-pal';
import { DonationService } from './services/donation-service';




export class Start {
  router: Router;
  constructor(private ds: DonationService) {}


  configureRouter(config: RouterConfiguration, router: Router) {
    config.map([
      {
        route: ['', 'login'],
        name: 'Login',
        moduleId: PLATFORM.moduleName('views/login'),
        nav: true,
        title: 'Login'
      },
      {
        route: 'signup',
        name: 'signup',
        moduleId: PLATFORM.moduleName('views/signup'),
        nav: true,
        title: 'Signup'
      }
    ]);
    this.router = router;
  }

  attached() {
    this.ds.checkIsAuthenticated();
  }


}
