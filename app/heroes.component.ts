import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  moduleId: module.id,// Set the moduleId property to module.id so that templateUrl and styleUrls are relative to the component.
  selector: 'my-heroes',
  templateUrl: 'heroes-list.html',
  styleUrls: ['heroes-list.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  selectedHero: Hero;
  constructor(private heroService: HeroService, private router: Router) {
  }
  ngOnInit() {
    this.getHeroes();
  }
  getHeroes(): void {
    // this.heroService.getHeroesSlowly().then(heroes => this.heroes = heroes);
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }
  add(name: string): void {
    name = name.trim();
    if(!name) return;
    this.heroService.create(name).then(hero => {
      this.heroes.push(hero);
      this.selectedHero = null;
    })
  }
}
