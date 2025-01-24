import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Character } from '../models';
import { catchError, map, Observable, of } from 'rxjs';
import { CharacterAdapter } from '../adapters';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  state = signal({
    characters: new Map<number, Character>(),
  });

  constructor() {
    this.getCharacters();
  }

  getFormattedCharacters() {
    return Array.from(this.state().characters.values());
  }
  // private apiUrl = 'https://api.example.com/characters';
  // private http = inject(HttpClient);

  getCharacters():void{
    const mockCharacters: Character[] = [
      {
        id: 1,
        name: 'Jorge',
        lastname: 'Ford',
        age: 54,
      },
      {
        id: 2,
        name: 'Carlo',
        lastname: 'Magno',
        age: 14,
      },
      {
        id: 3,
        name: 'Luana',
        lastname: 'Parlota',
        age: 32,
      },
      {
        id: 4,
        name: 'Espa',
        lastname: 'Trana',
        age: 19,
      },
    ];

    of(mockCharacters).subscribe(result => {
      result.forEach(character => this.state().characters.set(character.id, character));
      this.state.set({characters: this.state().characters})
    })
  }

  getCharacterById(id: number) {
    return this.state().characters.get(id);
  }

  updateCharacter(Character: Character): void {
    const updateCharacter = {...Character}

    of(updateCharacter).subscribe((result => {
      this.state.update((state) => {
        state.characters.set(result.id, result);
        return {characters: state.characters}
      })
    }))
    this.getCharacters();
  }

  deleteCharacter(id: number): void {
    of({status: 200}).subscribe(() => {
      this.state.update((state) => {
        state.characters.delete(id);
        return {characters: state.characters}
      })
    })
  }


  // updateCharacter(Character: Character): Observable<Character> {
  //   return this.http.put<Character>(`${this.apiUrl}`, Character);
  // }

  // deleteCharacter(id: number): Observable<void> {
  //   return this.http.delete<void>(`${this.apiUrl}/${id}`);
  // }
}
