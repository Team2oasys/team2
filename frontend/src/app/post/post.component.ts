import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ListService } from '../list.service';
import { FormControl, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { List } from '../list';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {

constructor (private rou:Router,private ser:ListService, private datePipe: DatePipe) {};

FormOne=new FormGroup({
  title:new FormControl(),
  description:new FormControl('',[Validators.required]),
  

});

postData() {
  
  const form=this.FormOne.value as List;
  
  form.date = this.datePipe.transform(new Date(), 'dd MMM yyyy') || '';
 this.ser.post(form).subscribe((res)=>{
   
  this.rou.navigate(['get']);

  })

}
back() {
this.rou.navigate(['get']);
}

}
