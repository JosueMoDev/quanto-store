import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-sidemenu',
  standalone: true,
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss'],
  imports: [IonicModule]
})
export class SidemenuComponent implements OnInit {
  constructor() {}
  menuType: string = 'overlay';
  ngOnInit() {}
}