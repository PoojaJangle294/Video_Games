import { Component, OnInit } from '@angular/core';
import { VideoServiceService } from '../services/video-service.service';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';




@Component({
  selector: 'app-video-games',
  templateUrl: './video-games.component.html',
  styleUrls: ['./video-games.component.css']
})
export class VideoGamesComponent implements OnInit {

  videoData: any;
  releasedate!: any;
  currentPage: number = 1;
  totalPages: number = 1;
  pageSize: number = 10;
  
  filteredVideoData = {
    name: '' || null,
    score: 0 || null
  }; 

  constructor(private videoservice: VideoServiceService, private http: HttpClient) {}

  ngOnInit() {
    this.fetchVideoContent(this.currentPage);
  }

   /**
   * Fetches the video content from the server with pagination.
   * The API response contains the video data and metadata, including total number of pages.
   */
  fetchVideoContent(page?: number) {
    const params = {
      page: page,
      pageSize: this.pageSize
    }
    this.videoservice.getVideoData(params).subscribe((response: any) => {
      this.videoData = response;
      this.totalPages = response.meta.pagination.total;
    });

  }

  /**
   * Handles the next page button click.
   * This function increments the current page number and fetches the video content for the next page.
   * Pagination ensures that the page number does not exceed the total number of pages available.
   */
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.fetchVideoContent(this.currentPage);
    }
  }

   /**
   * Handles the previous page button click.
   * This function decrements the current page number and fetches the video content for the previous page.
   * Pagination ensures that the page number does not go below 1.
   */
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchVideoContent(this.currentPage);
    }
  }

  /**
   * Applies the filter on the video data.
   * The filtered video data, including `name` and `score`, is sent as parameters to the API to fetch the filtered results.
   * The result is updated in the videoData variable, and the total number of pages is updated for pagination control.
   */
  async applyFilter() {
    try {
      const res = await this.videoservice.getFilterData(this.filteredVideoData).toPromise();
      this.videoData = res;
      this.totalPages = this.videoData.meta.pagination.total;

    } catch (error) {
      console.error('Error fetching filtered data:', error);
    }
  }

  /**
   * Clears the applied filters and resets the video data.
   * This function resets the filter criteria (name and score), and then fetches all video content for the first page.
   * It resets the pagination back to the first page.
   */
  clearFilter() {
    this.filteredVideoData = { name: null, score: null };
    this.currentPage = 1;
    this.fetchVideoContent(this.currentPage);
  }
}
