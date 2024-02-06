import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListService } from '../list.service';

@Component({
  selector: 'app-delete-by-id',
  templateUrl: './delete-by-id.component.html',
  styleUrls: ['./delete-by-id.component.css']
})
export class DeleteByIdComponent implements OnInit {

  constructor (private rou:Router,private ser:ListService,private act:ActivatedRoute) {};

  id:string;
  
  ngOnInit(): void {
    this.id=this.act.snapshot.params['id'];
    this.delete();
    };
  
  delete(){
    this.ser.deleteById(this.id).subscribe((res)=>{
    this.rou.navigate(['get']);
    });
  }

}
