<template>
  <div class="parent">
    <div v-if="isLoading">
      <loader />
    </div>

    <Header />
    <div class="main">
      <!-- <span>{{ response }}</span> -->
      <div class="jobs">
        <div v-for="res in response" :key="res.id" class="job-card">
          <h2 style="text-align: center" class="job-title">
            <span>{{ res.jobTitle }}</span>
          </h2>
          <p class="job-desc">
            <span>{{ res.jobDescTruncated }}</span>
          </p>
          <p>
            <b>Date Announced: </b><span>{{ res.dateAnnouncedFormatted }}</span>
          </p>
          <p style="text-align: left">
            <b>Location: </b>
            <span> {{ res.location }}</span>
          </p>
          <p>
            <b>Max Salary: </b><span> {{ res.maxSalary }}</span>
          </p>
          <p class="bottom-item">
            <b>Min Salary: </b><span> {{ res.minSalary }}</span>
          </p>
          <a :href="res.url" target="_blank">
            <div class="btn-apply" style="text-align: center">
              <button>Apply here</button>
            </div></a
          >
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import axios from "axios";

import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import { truncateText } from "../utils/truncateText";
import Loader from "@/components/Loader.vue";

export default {
  name: "JobsiteHomeView",
  components: { Header, Footer, Loader },
  data() {
    return {
      isLoading: false,
      responseArray: [],
      response: [],
      jobSearchApi: [],
      indeedApi: [],
      remoteJobApi: [],
      jSearchApi: [],
      adzunaJobApi: [],
      searchInput: "",
      jobTitle: "",
      jobDesc: "",
      jobLocation: "",
      maxSalary: "",
      minSalary: "",
    };
  },

  mounted() {
    // this.jobSearchApiFx();
    // this.indeedApiFx();
    // this.remoteJobApiFx();
    this.adzunaJobApJSFx();
    this.adzunaJobApiFx();
    this.jobsRequest();
  },

  methods: {
    // async jobSearchApiFx() {
    //   const options = {
    //     method: "GET",
    //     url: "https://job-search-api1.p.rapidapi.com/v1/job-description-search",
    //     params: {
    //       q: "javascript",
    //     },
    //     headers: {
    //       "X-RapidAPI-Key":
    //         "21c1b08ca3msh5d72998593cbe88p184b2bjsn114c9d7c52a7",
    //       "X-RapidAPI-Host": "job-search-api1.p.rapidapi.com",
    //     },
    //   };
    //   try {
    //     const { data } = await axios.request(options);
    //     const results = ``;
    //     this.jobSearchApi = data;
    //     this.response.push(this.jobSearchApi);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // },
    async indeedApiFx() {
      // const axios = require("axios");

      const options = {
        method: "GET",
        url: "https://indeed12.p.rapidapi.com/job/02eb3a9f080f10e7",
        headers: {
          "X-RapidAPI-Key":
            "21c1b08ca3msh5d72998593cbe88p184b2bjsn114c9d7c52a7",
          "X-RapidAPI-Host": "indeed12.p.rapidapi.com",
        },
      };

      try {
        const { data } = await axios.request(options);
        this.indeedApi = data;
        console.log(data);
        this.responseArray.push(this.indeedApi);
      } catch (error) {
        console.error(error);
      }
    },
    // async remoteJobApiFx() {
    //   const options = {
    //     method: "GET",
    //     url: "https://remote-jobs-api.p.rapidapi.com/jobs",
    //     // params: { company: "shopify" },
    //     headers: {
    //       "X-RapidAPI-Key":
    //         "21c1b08ca3msh5d72998593cbe88p184b2bjsn114c9d7c52a7",
    //       "X-RapidAPI-Host": "remote-jobs-api.p.rapidapi.com",
    //     },
    //   };

    //   try {
    //     const { data } = await axios.request(options);
    //     this.remoteJobApi = data;
    //     this.response.push(this.remoteJobApi);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // },
    // async jSearchFx() {
    //   const options = {
    //     method: "GET",
    //     url: "https://jsearch.p.rapidapi.com/search",
    //     params: {
    //       // query: this.searchInput,
    //       query: "javascript",
    //       // page: "1",
    //       // num_pages: "1",
    //     },
    //     headers: {
    //       "X-RapidAPI-Key":
    //         "21c1b08ca3msh5d72998593cbe88p184b2bjsn114c9d7c52a7",
    //       "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    //     },
    //   };

    //   try {
    //     const { data } = await axios.request(options);
    //     this.jSearchApi = data;
    //     this.response.push(this.jSearchApi);
    //   } catch (error) {
    //     alert("Job not found");
    //     console.error(error);
    //   }
    // },
    async adzunaJobApJSFx() {
      this.isLoading = true;
      const app_id = "cce4b21f";
      const app_key = "e36ec455662c956e0504dee76d149541";
      const baseUrl = "http://api.adzuna.com:80/v1/api/jobs/gb/search/1";

      // Define query parameters as an object
      const queryParams = {
        app_id: app_id,
        app_key: app_key,
        results_per_page: 20,
        what: "react vue",
        "content-type": "application/json", // Use quotes for special characters in property names
      };

      const apiUrl =
        baseUrl + "?" + new URLSearchParams(queryParams).toString();

      const { data } = await axios.get(apiUrl);
      const res = data.results;
      res.map((data) => {
        const location = data.location.display_name;
        const jobTitle = data.title;
        const jobDesc = data.description;
        const jobDescTruncated = truncateText(jobDesc, 25);
        const maxSalary = data.salary_max;
        const minSalary = data.salary_min;
        const dateAnnounced = data.created;
        const dateObject = new Date(dateAnnounced);
        const dateAnnouncedFormatted = dateObject.toISOString().split("T")[0];
        const id = data.id;
        const url = data.redirect_url;

        const finalArray = {
          location,
          jobTitle,
          jobDescTruncated,
          maxSalary,
          minSalary,
          dateAnnouncedFormatted,
          id,
          url,
        };
        this.responseArray.push(finalArray);
      });
      this.isLoading = false;
    },
    async adzunaJobApiFx() {
      this.isLoading = true;
      const app_id = "cce4b21f";
      const app_key = "e36ec455662c956e0504dee76d149541";
      const baseUrl = "http://api.adzuna.com:80/v1/api/jobs/gb/search/1";

      // Define query parameters as an object
      const queryParams = {
        app_id: app_id,
        app_key: app_key,
        results_per_page: 20,
        what: "designer graphic",
        "content-type": "application/json", // Use quotes for special characters in property names
      };

      const apiUrl =
        baseUrl + "?" + new URLSearchParams(queryParams).toString();

      const { data } = await axios.get(apiUrl);
      this.isLoading = false;
      const res = data.results;
      res.map((data) => {
        const location = data.location.display_name;
        const jobTitle = data.title;
        const jobDesc = data.description;
        const jobDescTruncated = truncateText(jobDesc, 25);
        const maxSalary = data.salary_max;
        const minSalary = data.salary_min;
        const dateAnnounced = data.created;
        const dateObject = new Date(dateAnnounced);
        const dateAnnouncedFormatted = dateObject.toISOString().split("T")[0];
        const id = data.id;
        const url = data.redirect_url;

        const finalArray = {
          location,
          jobTitle,
          jobDescTruncated,
          maxSalary,
          minSalary,
          dateAnnouncedFormatted,
          id,
          url,
        };
        this.responseArray.push(finalArray);
      });

      // Shuffled array
      function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
      }

      if (this.responseArray) {
        shuffleArray(this.responseArray);
        console.log("Shuffled this.responseArray:", this.responseArray);
      }
    },

    jobsRequest() {
      this.response = this.responseArray
    },

    
  },
};
</script>

<style scoped>
.jobs {
  margin: 100px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}
.job-card {
  padding: 20px;
  border-radius: 5px;
  /* width: 100px; */
  /* height: 100px; */
  background-color: #f1faee; /* Background color of the box */
  box-shadow: 5px 5px 10px #ccc;
  text-align: justify;
  position: relative;
}
div button {
  background: #457b9d;
  border: #457b9d 1px solid;
  border-radius: 5px;
  color: #fff;
  padding: 6px 10px;
  cursor: pointer;
}

.bottom-item {
  margin-bottom: 40px;
}

.btn-apply {
  position: absolute;
  left: 50%;
  bottom: 10px;
  transform: translateX(-50%);
}

/* .job-desc {
  
} */

/* Media query for mobile responsiveness */
@media (max-width: 991px) {
  .jobs {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20;
  }
}
</style>