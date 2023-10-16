# Angular Chart Dashboard

This is a single-page web application developed using Angular that allows users to view a list of charts and apply various settings to customize their dashboard. The application utilizes several libraries and follows modern best practices for building responsive and dynamic web applications.

## Features
- Responsive UI: The application is designed to work seamlessly on different screen sizes and devices, ensuring a consistent user experience.

- Header with Navigation: The header contains two links that lead to separate routes: "View Mode" and "Settings." The active link is highlighted to indicate the current route.

## View Mode
- List of Charts: In the "View Mode," users can explore a list of charts, which are dynamically generated or fetched from a public API. Each chart displays a time series with "value" and "date" fields.

- Date Range Filter: A date range filter is available for users to narrow down the data displayed on the charts. Selecting specific dates will affect the charts' visualizations. The date range filter is hidden if there are no charts to filter.

## Settings
- List of Charts: In the "Settings" route, users can view a list of charts and perform various operations on them.

- Add New Chart: Users have the option to add a new chart. When adding a chart, they can specify a name, type (e.g., line, spline, area), and color. The new chart settings will be applied after saving.

- Edit Existing Chart: For existing charts, users can edit their settings. They can modify the chart's name, type, and color. Any changes will be saved and applied to the chart.

- Remove Chart: Users also have the ability to remove charts they no longer need.

# Libraries and Technologies
The project utilizes the following libraries and technologies:

- Angular: The application is built with Angular, a popular front-end framework.

- RxJs: RxJs is used for reactive programming, enabling efficient data flow and asynchronous operations.

- Angular Material : Angular Material is used to create responsive and user-friendly components for the application's user interface.

- Highcharts: Highcharts is used to render interactive and visually appealing charts in the application.


# Getting Started
To run the application locally, follow these steps:

1. Clone the project repository from [Github]https://github.com/goldenglorys/ng_highcharts_spa
2. Navigate to the project directory and run the following command to install dependencies:

    ```npm install```
3. Start the development server by running:

    ```ng serve```

4. Open a web browser and access the application at http://localhost:4200

# Acknowledgments
Special thanks to the authors and contributors of the libraries and tools used in this project, as well as the Angular and web development communities.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.6.

[![Netlify Status](https://api.netlify.com/api/v1/badges/9b754129-e114-404a-9e77-b4b5c20aca9c/deploy-status)](https://app.netlify.com/sites/natlex-angular-spa/deploys)

[Live Link](https://natlex-angular-spa.netlify.app/)