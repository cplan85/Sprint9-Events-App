import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-btn-question-mark',
  templateUrl: './btn-question-mark.component.html',
  styleUrls: ['./btn-question-mark.component.scss']
})
export class BtnQuestionMarkComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DialogMapInfoDialog, {
      width: '70%',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  ngOnInit(): void {
  }

}

@Component({
  selector: 'dialog-animations-info',
  templateUrl: 'dialog-animations-info.html',
  styleUrls: ['./dialog-animation-info.scss']
})
export class DialogMapInfoDialog {
  constructor(public dialogRef: MatDialogRef<DialogMapInfoDialog>) {}
}
