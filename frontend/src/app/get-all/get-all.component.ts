import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { List } from '../list';
import { ListService } from '../list.service';

@Component({
  selector: 'app-get-all',
  templateUrl: './get-all.component.html',
  styleUrls: ['./get-all.component.css']
})
export class GetAllComponent implements OnInit{



  constructor (private rou:Router,private ser:ListService) {}

list:List[]=[];

ngOnInit(): void {
this.getAll();
  }

  getAll() {
    this.ser.getAll().subscribe((res)=>{
      this.list=res;
  
    });
    
  };
  post() {
this.rou.navigate(['post']);
  }
 
  deleteid(id:string) {
this.rou.navigate(['delete',id]);
    }
    update(id:string) {
  this.rou.navigate(['update',id]);
    }
    getById(id:string) {
    this.rou.navigate(['getById',id]);
    }

    logOut(){
      this.rou.navigate(['']);}
    }

