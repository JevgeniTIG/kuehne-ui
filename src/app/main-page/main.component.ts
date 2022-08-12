import {Component, OnInit} from "@angular/core";
import {Person} from "../models/Person";
import {PersonService} from "../services/person.service";
import {PageEvent} from "@angular/material/paginator";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-main',
  templateUrl: 'main.component.html',
  styleUrls: ['main.component.css'],
})

export class MainComponent implements OnInit {

  people: Person [] = [];
  lowValue: number = 0;
  highValue: number = 20;

  // @ts-ignore
  public searchForm: FormGroup;


  constructor(private personService: PersonService,
              private formBuilder: FormBuilder) {

  }


  ngOnInit(): void {
    this.searchForm = this.createSearchForm();
    this.getAllPeople();
  }

  getAllPeople() {
    this.people = [];
    this.personService.getAllPeople().subscribe(data => {
      this.people = data;
    })
  }

  createSearchForm(): FormGroup {
    const patternForInput = '^[0-9a-zA-Z]+$';
    return this.formBuilder.group({
      inputParam: ['', Validators.compose([Validators.required, Validators.pattern(patternForInput)])],
    });
  }

  public getPaginatorData(event: PageEvent): PageEvent {
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;
    return event;
  }

  getAllByName(filterParam: string): void {
    this.personService.getAllPeopleByName(filterParam).subscribe(data => {
      if (data.size > 0) {
        this.people = [];
      }
      this.people = data;
    })
  }

  search() {
    if (this.searchForm.valid) {
      this.getAllByName(this.searchForm.value.inputParam)
    }
  }

  resetSearch() {
    this.searchForm.reset()
    this.getAllPeople()
  }


}
