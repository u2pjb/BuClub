import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { Member } from '../../../types';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-edit-popup',
  standalone: true,
  imports: [
    DialogModule,
    CommonModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './edit-popup.component.html',
  styleUrl: './edit-popup.component.scss',
})
export class EditPopupComponent {
  constructor(private formBuilder: FormBuilder) {}
  @Input() display: boolean = false;
  @Output() displayChange = new EventEmitter<boolean>();
  @Output() confirm = new EventEmitter<Member>();
  @Output() cancel = new EventEmitter<void>();
  @Input() header!: string;

  @Input() member: Member = {
    // id: number;
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
    image: '',
  };

  specialCharacterValidator(): ValidatorFn {
    return (control) => {
      const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(
        control.value
      );
      return hasSpecialChar ? { hasSpecialChar: true } : null;
    };
  }

  notInNamesValidator(): ValidatorFn {
    return (control) => {
      const hasSpecialChar = /[!@#$%^&*()_+=\[\]{};:"\\|,<>\/?]+/.test(
        control.value
      );
      return hasSpecialChar ? { hasSpecialChar: true } : null;
    };
  }

  memberForm = this.formBuilder.group({
    firstname: ['', [Validators.required, this.notInNamesValidator()]],
    lastname: ['', [Validators.required]],
    addressline1: ['', []],
    addressline2: ['', []],
    addressline3: ['', []],
    addressline4: ['', []],
    postcode: ['', []],
    phonenumber: ['', []],
    email: ['', []],
    paid: [0, []],
    notes: ['', []],
    image: ['', []],
  });

  ngOnChanges() {
    this.memberForm.patchValue(this.member);
  }

  onConfirm() {
    const {
      firstname,
      lastname,
      addressline1,
      addressline2,
      addressline3,
      addressline4,
      postcode,
      phonenumber,
      email,
      paid,
      notes,
      image,
    } = this.memberForm.value;

    this.confirm.emit({
      firstname: firstname || '',
      lastname: lastname || '',
      addressline1: addressline1 || '',
      addressline2: addressline2 || '',
      addressline3: addressline3 || '',
      addressline4: addressline4 || '',
      postcode: postcode || '',
      phonenumber: phonenumber || '',
      email: email || '',
      paid: paid || 0,
      notes: notes || '',
      image: image || '',
    });

    this.display = false;
    this.displayChange.emit(this.display);
  }

  onCancel() {
    this.display = false;
    this.displayChange.emit(this.display);
  }

  onPaidPlus() {
    var val = new Date().getFullYear();
    if (this.member.paid === val) {
      this.member.paid++;
    } else {
      this.member.paid = new Date().getFullYear();
    }

    this.ngOnChanges();
  }

  onPaidHon() {
    this.member.paid = -1;
    this.ngOnChanges();
  }
}
