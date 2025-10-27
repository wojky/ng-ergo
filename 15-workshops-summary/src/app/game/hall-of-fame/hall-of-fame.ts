import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HallOfFameService } from './hall-of-fame.service';
import { MatTabsModule } from '@angular/material/tabs';
import { HallOfFameList, HallOfFameLists } from './hall-of-fame-list';

@Component({
  selector: 'app-hall-of-fame',
  imports: [RouterLink, MatTabsModule, HallOfFameList],
  template: `
    <a routerLink="..">Back</a>

    <h2>Hall of Fame</h2>

    <mat-tab-group>
      <mat-tab label="Easy">
        <app-hall-of-fame-list [lists]="lists().easy" />
      </mat-tab>
      <mat-tab label="Normal">
        <app-hall-of-fame-list [lists]="lists().normal" />
      </mat-tab>
      <mat-tab label="Hard">
        <app-hall-of-fame-list [lists]="lists().hard" />
      </mat-tab>
    </mat-tab-group>
  `,
  styles: `
    app-hall-of-fame-list {
      display: block;
      margin-top: 1rem;
    }
  `,
})
export class HallOfFame {
  service = inject(HallOfFameService);

  lists = computed(() => {
    return this.service.hallOfFame().reduce<HallOfFameLists>((acc, entry) => {
      acc[entry.difficulty] = acc[entry.difficulty] || [];

      acc[entry.difficulty].push({
        name: entry.name,
        turns: entry.turns,
      });

      return acc;
    }, {} as HallOfFameLists);
  });
}
