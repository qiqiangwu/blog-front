import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-add-catalog',
  templateUrl: './add-catalog.component.html',
  styleUrls: ['./add-catalog.component.less'],
})
export class AddCatalogComponent implements OnInit {
  @Output() cancel = new EventEmitter<any>();
  @Output() add = new EventEmitter<{ name: string }>();

  @Input() name: string;
  
  constructor(private message: NzMessageService) {}

  ngOnInit(): void {}

  onCancel() {
    this.cancel.emit();
  }

  addCatalog() {
    if (!this.name) {
      this.message.create('error', '请输入文章类别');
    }
    this.add.emit({ name: this.name });
  }
}
