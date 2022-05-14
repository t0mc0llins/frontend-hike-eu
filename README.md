<img src="https://i.imgur.com/zKCyymJ.png" width="20%">
This is a site where users can browse hiking routes and post their own trails using interactive mapping and blogging features!

Hike EU is a full stack app with the frontend built in React and a [backend](https://github.com/t0mc0llins/backend-hike-eu) that uses NodeJS and Express.

## Viewing a route
Each hike created using the tools on Hike EU has 3 main components. 
1. A summary card which is shown in the explore interface
2. A blog which is generated from the user entered data. Each hike is composed of days with one or more stages.
3. An interactive map locked to user defined constaints. This map has one or more routes drawn onto it.
<img src="https://i.imgur.com/Gw54JwI.gif">

## Creating a hike
I made a three part wizard to create hikes. A stepper at the top of the page tracks progress.
The first step is to enter the hike summary which will be displayed on the explore page.

<img src="https://i.imgur.com/sIhK1yr.gif">
