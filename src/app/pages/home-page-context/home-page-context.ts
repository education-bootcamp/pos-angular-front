import { Component } from '@angular/core';
import { MainHeader } from "../../core/main-header/main-header";
import { RouterOutlet } from "@angular/router";
import { MainFooter } from "../../core/main-footer/main-footer";

@Component({
  selector: 'app-home-page-context',
  imports: [MainHeader, RouterOutlet, MainFooter],
  templateUrl: './home-page-context.html',
  styleUrl: './home-page-context.scss',
})
export class HomePageContext {}
