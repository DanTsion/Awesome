import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ToastrService } from '../../services/toastr.service';
import { Toastr } from 'src/app/shared/models/toastr';

@Component({
  selector: 'al-toastr',
  templateUrl: './toastr.component.html',
  styleUrls: ['./toastr.component.scss']
})
export class ToastrComponent implements OnInit {

  public toastr$: Observable<Toastr | null>;

  constructor(private toastrService: ToastrService) { }

  ngOnInit() {
    this.toastr$ = this.toastrService.toastr$;
  }
  closeToastr(){
    this.toastrService.closeToastr();
  }
  click(){
    this.toastrService.showToastr({
      category: "danger",
      message: 'coucou'
    })
  }
}
