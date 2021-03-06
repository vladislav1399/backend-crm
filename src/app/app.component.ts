import {Component, OnInit} from '@angular/core';
import {AuthService} from './shared/services/auth.service';


@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})


export class AppComponent implements OnInit {
  constructor(private authService: AuthService) {
  }
  title = 'Beauty Space';

  ngOnInit() {
    const potentialToken = localStorage.getItem('token');
    if (potentialToken !== null) {
      this.authService.setToken(potentialToken);

    }
  }


}
