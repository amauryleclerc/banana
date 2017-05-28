import { Headers, Http, Response, URLSearchParams } from '@angular/http';
import { Observable, Subject } from 'rxjs/Rx';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';

export abstract class AbstractRestClientService<T> {

  public static readonly PAGE_SIZE = '20';
  bottomSubject: Subject<boolean> = new Subject();

  constructor(private httpClient: Http, private embeddedName: string) {

  }

  protected _getAllByPage(): Observable<T> {
    return this.getByPage(0, this.httpClient)//
      .flatMap(res => {
        return Observable.concat(
          Observable.of(res), //
          Observable.zip(this.bottomSubject.debounce(() => Observable.timer(500)),//
            Observable.range(1, res.json().page.totalPages),//
            (a, b) => b) //
            .concatMap(page => this.getByPage(page, this.httpClient))
        ).flatMap(response => this.handleResponseArray(response));
      }).catch(this.handleError);
  }
  protected _getAll(): Observable<T> {
    return this.getByPage(0, this.httpClient)//
      .flatMap(res => {
        return Observable.concat(
          Observable.of(res), //
          Observable.range(1, res.json().page.totalPages)//
            .concatMap(page => this.getByPage(page, this.httpClient))
        ).flatMap(response => this.handleResponseArray(response));
      }).catch(this.handleError);
  }

  protected _getOne(id: string): Observable<T> {
    return this.httpClient.get(this.getUrl() + '/' + id).flatMap(this.handleResponse);
  }

  public getUrl(): string {
    return 'http://' + window.location.host + '/api/' + this.embeddedName;
  }

  public save(item: T): Observable<T> {
    return this.httpClient.post(this.getUrl(), item)//
      .flatMap(this.handleResponse);
  }


  private getByPage(page: number, http: Http): Observable<Response> {
    const params = new URLSearchParams();
    params.set('page', page.toString());
    params.set('size', AbstractRestClientService.PAGE_SIZE);
    params.set('sort', 'name');
    return http.get(this.getUrl(), { search: params });
  }

  protected handleResponse(res: Response): Observable<T> {
    if (res.status === 200 || res.status === 201) {
      const item: T = <T>res.json();
      return Observable.of(item);
    }
    return Observable.empty();
  }

  protected handleResponseArray(res: Response): Observable<T> {
    if (res.status === 200) {
      const items: T[] = <Array<T>>res.json()._embedded[this.embeddedName];
      return Observable.from(items);
    }
    return Observable.empty();
  }

  public loadMore() {
    this.bottomSubject.next(true);
  }

  protected handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}



