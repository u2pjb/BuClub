import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-member-status',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './member-status.component.html',
  styleUrl: './member-status.component.scss',
})
export class MemberStatusComponent {
  constructor() {}

  @Input() paid: number = 0;

  getStatus(): string {
    if (this.paid === -1) {
     // console.log('circ3' + this.paid);
      return 'circle3';
    } else {
      if (this.paid >= new Date().getFullYear()) {
       // console.log('circ1' + this.paid);
        return 'circle1';
      } else {
        //console.log('circ2' + this.paid);
        return 'circle2';
      }
    }
  }

  ngOnInit() {
   
  }
}
