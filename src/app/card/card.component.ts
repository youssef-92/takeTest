import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.sass']
})
export class CardComponent implements OnInit {

  constructor() { }
@Input() favorite : boolean | undefined;
@Input() title: string | undefined;
@Input() source: string="";
@Input() text: string="";
@Output() favoriteEvent  = new EventEmitter

  ngOnInit(): void {
  }
onClickFav(event:any){
  event.stopPropagation()
  this.favoriteEvent.emit(event)
}
}
