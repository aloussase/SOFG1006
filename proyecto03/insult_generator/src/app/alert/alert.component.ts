import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

type AlertType = 'success' | 'danger' | 'info';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
  @Input() alertShowing = false;
  @Input() alertText = '';
  @Input() alertType: AlertType = 'success';

  @Output() close = new EventEmitter<void>();

  alertClass = 'alert-success';

  constructor() {}

  onClose() {
    this.close.emit();
  }

  ngOnInit() {
    this.alertClass = `alert-${this.alertType}`;
  }
}
