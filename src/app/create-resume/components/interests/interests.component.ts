import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-interests',
  templateUrl: './interests.component.html',
  styleUrls: ['./interests.component.scss'],
})
export class InterestsComponent  implements OnInit {

  constructor() { }
  buttonTexts: any = [{name1:'Music',img:"assets/icon/Vector (7).png"}, {name1:'Painting',img:"assets/icon/Group (2).png"},{name1: 'Travelling',img:"assets/icon/flight plane.png"},{ name1:'User Experience',img:"assets/icon/Vector (8).png"},{name1:'User Research',img:"assets/icon/Vector (8).png"}];
  ngOnInit() {}

}
