import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private apiInfo = 'AIzaSyBgZ_QMCqgnFN3GIi0YBcVis4E4uX7Rw18';
  userToken: string;

  constructor(private httpClient: HttpClient) {
    this.readToken();
  }

  logout(){
    localStorage.removeItem('token');
  }

  signUp(usuario: UsuarioModel){
    const authData = {
      email: usuario.email,
      password: usuario.password,
      returnSecureToken: true
    }

    return this.httpClient.post(`${this.url}signUp?key=${this.apiInfo}`,
                                  authData)
                          .pipe(
                            map(response => {
                              this.saveToken(response['idToken']);
                              return response;
                            })
                          );

  }
  
  signIn(usuario: UsuarioModel){
    const authData = {
      email: usuario.email,
      password: usuario.password,
      returnSecureToken: true
    }
    return this.httpClient.post(`${this.url}signInWithPassword?key=${this.apiInfo}`,
                                  authData)
                          .pipe(
                            map(response => {
                              this.saveToken(response['idToken']);
                              return response;
                            })
                          );
  }

  private saveToken(idToken: string){
    this.userToken = idToken;
    localStorage.setItem('token',this.userToken)
  }

  readToken(){
    this.userToken = localStorage.getItem('token') ? localStorage.getItem('token') : '';
  }

  isAuth(): boolean {
    return this.userToken.length > 2;
  }

}
