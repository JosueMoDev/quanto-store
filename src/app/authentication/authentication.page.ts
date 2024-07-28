import { Component, OnInit } from '@angular/core';
import { IonRouterOutlet } from '@ionic/angular/standalone';

@Component({
  selector: 'app-authentication.page',
  templateUrl: './authentication.page.html',
  styleUrls: ['./authentication.page.scss'],
  standalone: true,
  imports:[IonRouterOutlet]
})
export default class AuthenticationPage  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
