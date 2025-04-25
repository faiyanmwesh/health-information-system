import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/client.model';
import { ProgramService } from '../../services/program.service';
import { Program } from '../../models/program.model';

@Component({
  selector: 'app-client-view',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './client-view.component.html',
})
export class ClientViewComponent implements OnInit {
getProgramName(_t20: number) {
throw new Error('Method not implemented.');
}
  client?: Client;
  programs: Program[] = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cs: ClientService,
    private ps: ProgramService
  ) {}
  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.client = this.cs.getAll().find(c=>c.id===id);
    if (!this.client) this.router.navigate(['/dashboard/clients']);
    this.programs = this.ps.getAll();
  }
}
