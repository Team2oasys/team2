import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListService } from '../list.service';
import { List } from '../list';

@Component({
  selector: 'app-get-by-id',
  templateUrl: './get-by-id.component.html',
  styleUrls: ['./get-by-id.component.css']
})
export class GetByIdComponent implements OnInit {

  constructor (private rou:Router,private ser:ListService,private act:ActivatedRoute) {};

list:List;
id:string;

ngOnInit(): void {
  this.id = this.act.snapshot.params['id'];
  console.log(this.id);
  this.getById();
}

getById() {
  this.ser.getByid(this.id).subscribe((res) => {
    this.list = res as List;
    console.log(this.list);
  });
}

  
back() {
this.rou.navigate(['get']);}

}
