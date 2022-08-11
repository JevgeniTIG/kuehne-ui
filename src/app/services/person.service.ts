import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

const PERSON_API = 'http://localhost:8080/' + 'api/v1/persons';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private http: HttpClient) {
  }

  getAllPeople(): Observable<any> {

    return this.http.get(PERSON_API);
  }

}
