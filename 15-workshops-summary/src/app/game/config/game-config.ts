import { Component, inject } from '@angular/core';
import { GameConfigService } from './game-config.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-game-config',
  imports: [
    RouterLink,
    MatButtonModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
  template: `
    <a routerLink="../..">Back</a>

    <form
      [formGroup]="form"
      style="display: flex; align-items: center; flex-direction: column; margin-top: 1rem"
    >
      <mat-form-field class="example-full-width">
        <mat-label>Player name</mat-label>
        <input formControlName="playerName" matInput placeholder="Choose your name" />
        <mat-icon matPrefix>person</mat-icon>
        <mat-error>Player name is required</mat-error>
      </mat-form-field>
      <div>
        <label id="example-radio-group-label">Pick difficulty</label>
        <mat-radio-group
          formControlName="difficulty"
          aria-label="Select an option"
          aria-labelledby="example-radio-group-label"
        >
          <mat-radio-button value="easy">Easy (4x4)</mat-radio-button>
          <mat-radio-button value="normal">Medium (6x4)</mat-radio-button>
          <mat-radio-button value="hard">Hard (6x6)</mat-radio-button>
        </mat-radio-group>
      </div>
      <div>
        <label id="example-radio-group-label">Pick your favorite game type</label>
        <mat-radio-group
          formControlName="gameType"
          aria-label="Select an option"
          aria-labelledby="example-radio-group-label"
        >
          <mat-radio-button value="freeplay">Free Play</mat-radio-button>
          <mat-radio-button value="countdown">Countdown</mat-radio-button>
        </mat-radio-group>
      </div>

      <mat-form-field class="example-full-width">
        <mat-label>Countdown in seconds</mat-label>
        <input type="number" [minlength]="30" formControlName="countdown" matInput />
        <mat-icon matPrefix>timelapse</mat-icon>
        <mat-error>Must be at least 30 seconds</mat-error>
      </mat-form-field>
    </form>

    <button
      [disabled]="(form.invalid && form.touched) || form.untouched"
      matButton
      (click)="startGame()"
    >
      Start game
    </button>
  `,
  styles: ``,
})
export class GameConfig {
  private service = inject(GameConfigService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  form = this.service.createConfigForm();

  startGame() {
    this.service.startNewGame(this.form.getRawValue());
    this.router.navigate(['..', 'board'], { relativeTo: this.route });
  }
}
