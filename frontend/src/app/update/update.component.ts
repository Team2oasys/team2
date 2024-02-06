import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListService } from '../list.service';
import { FormControl, FormGroup } from '@angular/forms';
import { List } from '../list';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

constructor (private rou:Router,private ser:ListService,private act:ActivatedRoute) {}

FormOne=new FormGroup({
  title:new FormControl(),
  description:new FormControl(),
 });

id:string;

 
ngOnInit(): void {
  this.id = this.act.snapshot.params['id'];
  console.log(this.id);
  this.GetById();
}

GetById() {
  this.ser.getByid(this.id).subscribe((res) => {
    console.log(res);
    this.FormOne.patchValue(res);
  });
} 

update() {
  const form=this.FormOne.value  as List;
 this.ser.update(this.id,form).subscribe((res)=>{
     this.rou.navigate(['get']);

  })
}
back() {
this.rou.navigate(['get']);
}

}
