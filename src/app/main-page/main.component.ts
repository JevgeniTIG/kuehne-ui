import {Component, OnInit} from "@angular/core";
import {Person} from "../models/Person";
import {PersonService} from "../services/person.service";
import {MatTableDataSource} from "@angular/material/table";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-main',
  templateUrl: 'main.component.html',
  styleUrls: ['main.component.css'],
})

export class MainComponent implements OnInit {

  people: Person [] = [];
  lowValue: number = 0;
  highValue: number = 20;


  constructor(private personService: PersonService) {

  }


  ngOnInit(): void {
    this.personService.getAllPeople().subscribe(data=> {
      this.people = data;
    })
  }

  public getPaginatorData(event: PageEvent): PageEvent {
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;
    return event;
  }



}
