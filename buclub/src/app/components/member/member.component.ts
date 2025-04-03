import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Member } from '../../../types';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService } from 'primeng/api';
import { TruncateNamePipe } from '../../pipes/truncate-name.pipe';
import { MemberStatusComponent } from "../member-status/member-status.component";

@Component({
  selector: 'app-member',
  standalone: true,
  imports: [FormsModule, ButtonModule, ToastModule, ConfirmPopupModule, TruncateNamePipe, MemberStatusComponent],
  providers: [ConfirmationService],
  templateUrl: './member.component.html',
  styleUrl: './member.component.scss',
})
export class MemberComponent {
  constructor(private confirmationService: ConfirmationService) {}

  @ViewChild('deleteButton') deleteButton: any;

  @Input() member!: Member;
  @Output() edit: EventEmitter<Member> = new EventEmitter<Member>();
  @Output() delete: EventEmitter<Member> = new EventEmitter<Member>();

  editMember() {
    this.edit.emit(this.member);
  }

  confirmDelete() {
    this.confirmationService.confirm({
      target: this.deleteButton.nativeElement,
      message: 'Are you sure you wish to delete this member?',
      accept: () => {
        this.deleteMember();
      },
    });
  }

  deleteMember() {
    this.delete.emit(this.member);
  }

  ngOnInit() {}
}
