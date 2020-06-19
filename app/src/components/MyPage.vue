<template>
<div id="app">
<!-- HTML -->
  <section class="banner">
    <h1>
      <b><u>Welcome to the "CIA"!</u></b>
    </h1>
    <h2>'Click on links carefree!'</h2>
    <p> Not the one you're thinking about! CIA means Caught In Action.
    To start, insert your URL below to see if it's malicious or not!
  </p>
    <h2>
    <!-- Input elements go here -->
    <input id="url-input" placeholder="Enter URL here" v-model="urlInput"></input>
    <input id="check-url-button" type="button" value="Test This Website" @click="urlReputation()"></input>
  </h2>
  </section>
<!-- VUE -->
<div class="wrapper">
  <div class="box1">
  <div class="risk-score" style="max-width: 200px;">
    Risk score: {{ riskScore }}%
    <VueSvgGauge
    :start-angle="-110"
    :end-angle="110"
    :value="retrievedData.riskScore"
    :separator-step="0"
    :min="0"
    :max="100"
    :gauge-color="[{ offset: 0, color: '#8CDFAD'}, {offset: 70, color: '#f12711'}, { offset: 100, color: '#ED213A'}]"
    :scale-interval="5"/>
  </div>
  </div>

<div class="box2">
  <div class="num-of-detections">
    Number of detections: {{ numOfDetections }}
  </div>

  <div class="is_domain_blacklisted">
    Is the domain blacklisted? {{ isdomainBlacklisted }}
  </div>

  </div>

<div class="box3">
  <div class="city-name">
    <p><u>Server Location</u></p>
    City: {{ cityName }}
  </div>

  <div class="region_name">
    State: {{ regionName }}
  </div>

  <div class="country_name">
    Country : {{ countryName }}
  </div>

  <div class="continent_name">
    Continent : {{ continentName }}
  </div>
  </div>

<div class="box4">
  <div class="is_suspicious_content">
    Is the content suspicious? {{ issuspiciousContent }}
  </div>

  <div class="is_suspicious_domain">
    Is the domain suspicious? {{ issuspiciousDomain }}
  </div>

  <div class="is_suspicious_url_pattern">
    Is the url pattern suspicious? {{ issuspiciousurlPattern }}
  </div>
</div>

<div class="box5">
  <div class="server">
    Web Server: {{ serverType }}
  </div>
  <div class="isp">
    ISP: {{ Isp }}
  </div>

  <div class="ip">
    IP address: {{ Ip }}
  </div>
  </div>

<div class="box6">
  <div class="is_uncommon_clickable_url">
    Uncommon Clickable URL? {{ isuncommonclickableUrl }}
  </div>

  <div class="is_windows_exe_file">
    Does the URL have a windows executable file? {{ iswindowsexeFile }}
  </div>

  <div class="is_credit_card_field">
    Does the URL have a credit card field? {{ iscreditcardField }}
  </div>

  </div>

</div>

  <section class="footer">
    <h3>Legend</h3>
    <p>Risk score is the percentage of chance a link is malicious</p>
    <p>Number of detections is the number of malware engines that receive a hit for malicious activity</p>

  </section>
</div>
</template>

<script>

import { VueSvgGauge } from 'vue-svg-gauge';

export default {
  data: function() {
    return {
      urlInput: "https://",
      retrievedData: {
        numOfDetections: 0,
        riskScore: 0,
        cityName: "",
        continentName: "",
        countryName: "",
        Ip: 0,
        Isp: "",
        regionName: "",
        issuspiciousContent: false,
        issuspiciousDomain: false,
        issuspiciousurlPattern: false,
        isdomainBlacklisted: false,
        isuncommonclickableUrl: false,
        iswindowsexeFile: false,
        iscreditcardField: false,
        serverType: "",
      }
    };
  },
  components: {
    VueSvgGauge,
  },
  computed: {
    numOfDetections: function() {
      return this.retrievedData.numOfDetections === undefined ? "DNE" : this.retrievedData.numOfDetections;
    },
    riskScore: function() {
      return this.retrievedData.riskScore === undefined ? 0 : this.retrievedData.riskScore;
    },
    cityName: function() {
      return this.retrievedData.cityName === undefined ? "DNE" : this.retrievedData.cityName;
    },
    continentName: function() {
      return this.retrievedData.continentName === undefined ? "DNE" : this.retrievedData.continentName;
    },
    countryName: function() {
      return this.retrievedData.countryName === undefined ? "DNE" : this.retrievedData.countryName;
    },
    Ip: function() {
      return this.retrievedData.Ip === undefined ? "DNE" : this.retrievedData.Ip;
    },
    Isp: function() {
      return this.retrievedData.Isp === undefined ? "DNE" : this.retrievedData.Isp;
    },
    regionName: function() {
      return this.retrievedData.regionName === undefined ? "DNE" : this.retrievedData.regionName;
    },
    issuspiciousContent: function() {
      return this.retrievedData.issuspiciousContent === undefined ? "DNE" : this.retrievedData.issuspiciousContent;
    },
    issuspiciousDomain: function() {
      return this.retrievedData.issuspiciousDomain === undefined ? "DNE" : this.retrievedData.issuspiciousDomain;
    },
    issuspiciousurlPattern: function() {
      return this.retrievedData.issuspiciousurlPattern === undefined ? "DNE" : this.retrievedData.issuspiciousurlPattern;
    },
    isdomainBlacklisted: function() {
      return this.retrievedData.isdomainBlacklisted === undefined ? "DNE" : this.retrievedData.isdomainBlacklisted;
    },
    isuncommonclickableUrl: function() {
      return this.retrievedData.isuncommonclickableUrl === undefined ? "DNE" : this.retrievedData.isuncommonclickableUrl;
    },
    iswindowsexeFile: function() {
      return this.retrievedData.iswindowsexeFile === undefined ? "DNE" : this.retrievedData.iswindowsexeFile;
    },
    iscreditcardField: function() {
      return this.retrievedData.iscreditcardField === undefined ? "DNE" : this.retrievedData.iscreditcardField;
    },
    serverType: function() {
      return this.retrievedData.serverType === undefined ? "DNE" : this.retrievedData.serverType;
    },

  },
  methods: {
    urlReputation: function() {
      this.apiQuery("urlrep", {
        key: "Place API Void API key here",
        url: this.urlInput,
      });
    },
    apiQuery: function(endpoint, queryParams) {

      // Build the `url`
      let url = new URL(`https://endpoint.apivoid.com/${endpoint}/v1/pay-as-you-go/`);
      //
      Object.keys(queryParams).forEach(function(key) {
        url.searchParams.append(key, queryParams[key])
      });

      let app = this;
      // Fetch response
      let response = fetch(url, {
          method: "GET",
        })
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {

          // EXTRACT USEFUL DATA HERE
          app.retrievedData.numOfDetections = data["data"]["report"]["domain_blacklist"]["detections"];

          app.retrievedData.riskScore = data["data"]["report"]["risk_score"]["result"];

          app.retrievedData.cityName = data["data"]["report"]["server_details"]["city_name"];

          app.retrievedData.continentName = data["data"]["report"]["server_details"]["continent_name"];

          app.retrievedData.countryName = data["data"]["report"]["server_details"]["country_name"];

          app.retrievedData.Ip = data["data"]["report"]["server_details"]["ip"];

          app.retrievedData.Isp = data["data"]["report"]["server_details"]["isp"];

          app.retrievedData.regionName = data["data"]["report"]["server_details"]["region_name"];

          app.retrievedData.issuspiciousContent = data["data"]["report"]["security_checks"]["is_suspicious_content"];

          app.retrievedData.issuspiciousDomain = data["data"]["report"]["security_checks"]["is_suspicious_domain"];

          app.retrievedData.issuspiciousurlPattern = data["data"]["report"]["security_checks"]["is_suspicious_url_pattern"];

          app.retrievedData.isdomainBlacklisted = data["data"]["report"]["security_checks"]["is_domain_blacklisted"];

          app.retrievedData.isuncommonclickableUrl = data["data"]["report"]["security_checks"]["is_uncommon_clickable_url"];

          app.retrievedData.iswindowsexeFile = data["data"]["report"]["security_checks"]["is_windows_exe_file"];

          app.retrievedData.iscreditcardField = data["data"]["report"]["security_checks"]["is_credit_card_field"];

          app.retrievedData.serverType = data["data"]["report"]["response_headers"]["server"];


          return data;
        });
    },
  }
}
</script>

<!--CSS-->
<style scoped>
  @import url(https://fonts.googleapis.com/css?family=Lato|Arvo|Abel:400,300,100,700,900);

  h1,
  p,
  a{
    margin: 0;
    padding: 0;
  }

  h1 {
    font-size: 2.8em;
    padding: 10px 0;
    font-weight: 800;

  }

  .banner {
    width: 100%;
    padding:10px 0;
    text-align: center;
    background: #33cccc;
    color: white;
    font-size: 15px;
    font-family: 'Lato';

  }

  .btn-bgstroke {
    font-size: 20px;
    padding: 10px 10px;
    cursor: pointer;
    font-weight: 300;
  }

  .btn-bgstroke:hover {
    background-color: white;
    color: #33cccc;
  }

  .wrapper {
    display: grid;
    padding: 20px;
    padding-top: 50px;
    padding-left: 400px;
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 200px;
    font-family: 'Abel';
    font-weight: 400;
    font-size: 20px;
    text-align: justify;
   }

  .footer {
   position: absolute;
   padding-bottom: 20px;
   left: 0;
   bottom: 0;
   width: 100%;
   background-color: #33cccc;
   color: white;
   text-align: center;
   font-family: 'Arvo';
   font-size: 15px;
  }

</style>
