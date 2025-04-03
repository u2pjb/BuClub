import { Component, ViewChild, viewChild } from '@angular/core';
import { MembersService } from '../services/members.service';
import { Member, Members } from '../../types';
import { MemberComponent } from '../components/member/member.component';
import { CommonModule } from '@angular/common';
import { Paginator, PaginatorModule } from 'primeng/paginator';
import { EditPopupComponent } from '../components/edit-popup/edit-popup.component';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MemberComponent,
    ButtonModule,
    CommonModule,
    PaginatorModule,
    EditPopupComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private membersService: MembersService) {}

  @ViewChild('paginator') paginator: Paginator | undefined;

  members: Member[] = [];
  rows: number = 5;
  totalRecords: number = 0;

  displayEditPopup: boolean = false;
  displayAddPopup: boolean = false;

  toggleEditPopup(member: Member) {
    this.selectedMember = member;
    this.displayEditPopup = !this.displayEditPopup;
  }

  toggleDeletePopup(member: Member) {
    if (!member.id) {
      return;
    }

    this.deletePerson(member.id);
  }

  toggleAddPopup() {
    this.displayAddPopup = !this.displayAddPopup;
  }

  selectedMember: Member = {
    id: 0,
    firstname: '',
    lastname: '',
    addressline1: '',
    addressline2: '',
    addressline3: '',
    addressline4: '',
    postcode: '',
    phonenumber: '',
    email: '',
    paid: 0,
    notes: '',
    image: 'assets/images/dflt_img.jpg',
  };

  onConfirmEdit(member: Member) {
    if (!this.selectedMember.id) {
      return;
    }

    this.editPerson(member, this.selectedMember.id);
    this.displayEditPopup = false;
  }

  onConfirmAdd(member: Member) {
    this.addMember(member);
    this.displayAddPopup = false;
  }

  onMemberOutput(member: Member) {
    console.log(member, 'output');
  }

  onPageChange(event: any) {
    this.fetchMembers(event.page, event.rows);
  }

  resetPaginator() {
    this.paginator?.changePage(0);
  }

  fetchMembers(page: number, perPage: number) {
    this.membersService
      .getMembers('http://localhost:3000/people', { page, perPage })
      .subscribe({
        next: (members: Members) => {
          this.members = members.items;
          this.totalRecords = members.total;
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  editPerson(member: Member, id: number) {
    this.membersService
      .editMember(`http://localhost:3000/people/${id}`, member)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.fetchMembers(0, this.rows);
          this.resetPaginator();
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  deletePerson(id: number) {
    this.membersService
      .deleteMember(`http://localhost:3000/people/${id}`)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.fetchMembers(0, this.rows);
          this.resetPaginator();
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  addMember(member: Member) {
    this.membersService
      .addMember(`http://localhost:3000/people`, member)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.fetchMembers(0, this.rows);
          this.resetPaginator();
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  ngOnInit() {
    this.fetchMembers(0, this.rows);
  }
}
