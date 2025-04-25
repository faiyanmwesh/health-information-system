// src/app/home/home.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProgramService } from '../../services/program.service';
import { ClientService } from '../../services/client.service';
import { Program } from '../../models/program.model';
import { Client } from '../../models/client.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  totalPrograms = 0;
  totalClients = 0;
  recentPrograms: Program[] = [];
  recentClients: Client[] = [];

  constructor(
    private progSvc: ProgramService,
    private clientSvc: ClientService
  ) {}

  ngOnInit() {
    const allPrograms = this.progSvc.getAll().sort((a,b)=>b.id-a.id);
    const allClients = this.clientSvc.getAll().sort((a,b)=>b.id-a.id);

    this.totalPrograms = allPrograms.length;
    this.totalClients = allClients.length;

    this.recentPrograms = allPrograms.slice(0, 5);
    this.recentClients = allClients.slice(0, 5);
  }
}
