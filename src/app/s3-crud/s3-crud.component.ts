import { Component, inject, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-s3-crud',
  templateUrl: './s3-crud.component.html',
  styleUrl: './s3-crud.component.css',

  standalone: true,
  imports: [CommonModule],
})
export class S3CrudComponent implements OnInit {
  buckets: string[] = [];
  selectedBucket: string = '';
  objects: string[] = [];

  http = inject(HttpClient);

  ngOnInit() {
    this.fetchBuckets();
  }

  fetchBuckets(): void {
    this.http.get<{ buckets: string[] }>('arn:aws:lambda:us-east-1:694963961769:function:kellyw6lambda1').subscribe(
      (data) => {
        this.buckets = data.buckets;
      },
      (error) => {
        console.error('Error fetching the bucket list:', error);
      },
    );
  }

  onBucketChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedBucket = target.value;
    if (this.selectedBucket) {
      this.fetchObjects();
    }
  }

  fetchObjects(): void {
    this.http
      .get<{
        objects: string[];
      }>(`arn:aws:lambda:us-east-1:694963961769:function:kellyw6lambda1?bucket=${this.selectedBucket}`)
      .subscribe(
        (data) => {
          this.objects = data.objects;
        },
        (error) => {
          console.error('Error fetching the objects list:', error);
        },
      );
  }
}
