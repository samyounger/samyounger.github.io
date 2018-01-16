---
title: Google prediction API setup
date: 2017-04-10
categories: [ big-data, google, prediction, api ]
---

    DESCRIPTION: I am setting up an application which is using historic data of restaurant deliveries per hour to predict on any given hour and day what order volume should be expected. I am going to pass the data to the google prediction api to do the regression analysis.

<a class="main-link" href="https://cloud.google.com/prediction/docs/">Google Prediction API</a>

## Overview

The Google Prediction API very simply takes a CSV file as input which is calls training data, and it outputs its prediction.


## Quick start

A Google cloud storage account needs to be set up:

<a class="main-link" href="https://console.cloud.google.com/">Google Cloud Storage</a>

### Enable prediction API

To enable the prediction API, in the left menu go to API manager, and top center click `Enable API`. In the search box type 'Prediction' and it should appear. Click on this an follow the instructions to enable it.

### Enable billing

You also need to enable billing for your project. To do this, in the left column menu, select billing and follow the instructions.

Also ensure the Google cloud storage API is enabled.

### Cloud storage

Open the cloud `storage > storage` section from the left menu, and create a storage bucket. The name you choose must be globally unique. In the other fields leave as default values, and `create`.

Once the bucket is created, click 'upload file' and upload your data file you want the prediction-APi to analyse. This should be a `.txt` file, it should not have any column headers, and the first column data type [string, integer] determines whether the analysis is regression (for integers) or categorisation (for strings).

### Train the model

Pass in the data csv file to the prediction API as follows:

{% gist 3d77c4b6862647e2734c8d1e2ab4d1b1 train_the_model.json %}

The `[PROJECT_ID]` is the name of your project, and the storageDataLocation is the location of your project with the csv file name.

Successful reponses look like this

{% gist 3d77c4b6862647e2734c8d1e2ab4d1b1 train_the_model_result.json %}

To confirm completion of the training, call this method:

{% gist 3d77c4b6862647e2734c8d1e2ab4d1b1 confirm_training_completion.js %}


Replace the `[PROJECT_ID]` with your projects name.

In response take a look at the `trainingStatus` status:

{% gist 3d77c4b6862647e2734c8d1e2ab4d1b1 training_status.json %}

### Submit fresh data

Once the model has been trained, you can submit data as frequently as you like for analysis as long as it remains in the same format as in the trained model.

{% gist 3d77c4b6862647e2734c8d1e2ab4d1b1 get_prediction.json %}

In reponse for the language prediction API we should get data which looks like this:

{% gist 3d77c4b6862647e2734c8d1e2ab4d1b1 get_prediction_response.json %}

And you're done. FYI - the above instructions were taken from the google docs on the prediction api link provided at the top of this post. For more in depth instruction I would recommend going to the actual Google page and following.

The next step for me is to use these instructions above to create an order prediction service in a Ruby on Rails API.
