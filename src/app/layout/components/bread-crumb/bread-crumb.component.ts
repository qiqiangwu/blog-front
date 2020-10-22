import { Component, Input, OnInit } from '@angular/core';
import { BreadCrumbService } from 'src/app/common/services/bread-crumb/bread-crumb.service';
import { BreadCrumbItem } from 'src/app/common/types/bread-crumb-item';

@Component({
  selector: 'app-bread-crumb',
  templateUrl: './bread-crumb.component.html',
  styleUrls: ['./bread-crumb.component.less'],
})
export class BreadCrumbComponent implements OnInit {
  @Input() items: BreadCrumbItem[];
  constructor(private breadcrumbService: BreadCrumbService) {}

  ngOnInit(): void {}

  jumpTo(index: number) {
    this.breadcrumbService.jumpTo(index);
  }
}
