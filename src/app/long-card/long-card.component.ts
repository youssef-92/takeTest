import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-long-card',
  templateUrl: './long-card.component.html',
  styleUrls: ['./long-card.component.sass']
})
export class LongCardComponent implements OnInit {

  constructor() { }

  @Input() favorite : boolean | undefined;
  @Input() source: string="";
  @Input() date: string="";
  @Input() name: string="";
  @Output() favoriteEvent  = new EventEmitter

    ngOnInit(): void {
    }
  onClickFav(event:any){
    event.stopPropagation()
    this.favoriteEvent.emit(event)
  }

}
