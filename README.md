

# Hike EU 

This is a site where users can browse hiking routes and post their own trails using interactive mapping and blogging features! 

[Here is a link](https://hike-eu.netlify.app/) to the deployed app. You can login with email: test@test.com and password: test1234 if you would like to try out the hiking route creation features.

Hike EU is a full stack app with the frontend built in React and a [backend](https://github.com/t0mc0llins/backend-hike-eu) that uses NodeJS and Express.

<img src="https://i.imgur.com/o3TDntL.png" width="8%"> 

## Viewing a route
Each hike created using the tools on Hike EU has 3 main components. 
1. A summary card which is shown in the explore interface
2. A blog which is generated from the user entered data.
3. An interactive map locked to user defined constaints. This map has one or more routes drawn onto it.
<img src="https://i.imgur.com/Gw54JwI.gif">

## Creating a hike

I made a three part wizard to create hikes. A stepper at the top of the page tracks progress.

### Step 1

Enter the hike summary which will be displayed on the explore page.

<img src="https://i.imgur.com/sIhK1yr.gif">

### Step 2

The user sets the bounds of the map and then draws the routes on with a polyline tool.

Instructions are displayed in the sidebar.

<img src="https://i.imgur.com/SOm3m2Q.gif">

### Step 3

The user enters the blog information. A hike is composed of days and each day has one or more stages. 

A clickable table of contents menu is generated from the day and stage headings

<img src="https://i.imgur.com/sKZzntz.gif">

## Final product!

Albeit a very basic example for the sake of demonstration.

<img src="https://i.imgur.com/ms68BUH.gif">
