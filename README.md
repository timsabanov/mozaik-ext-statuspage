# Mozaïk statuspage.io widget

This widget display status from multiple statuspage.io sources in your [Mozaik](http://mozaik.rocks/) dashboard.

![json](https://raw.githubusercontent.com/timsabanov/mozaik-ext-statuspage/master/preview/mozaik-ext-statuspage.png)

## Installation

To install mozaik-ext-statuspage from npm, run:

```bash
npm install --save mozaik-ext-statuspage
```

## Configuration



#### config.js

In your Mozaik dashboard's config.js file, add the following section to widgets array:

```javascript
  {
      type:  'statuspage.data',
      title: '3rd party servicesS',
      sources: [
        'https://status.digitalocean.com',
        'https://status.dropbox.com',
        'https://www.intercomstatus.com'
      ],
      columns: 1, rows: 1,
      x: 1, y: 1
  }
```

Sources property is array of valid statuspage urls of the services you wish to monitor.

#### App.jsx

In your Mozaik dashboard's App.jsx you need to import statuspage module and register it with Mozaik extensions.

```javascript
import Mozaik  from 'mozaik/browser';
import statuspage from 'mozaik-ext-statuspage';

Mozaik.Registry.addExtensions({
    github,
    travis,
    statuspage
});

```

#### server.js

In your Mozaik dashboard's server.js you need to import statuspage module and register it with Mozaik api interface.

```javascript
import Mozaik  from 'mozaik/browser';
import statuspage from 'mozaik-ext-statuspage';import statuspage from 'mozaik-ext-statuspage/client';

const mozaik = new Mozaik(config);
mozaik.bus.registerApi('statuspage', statuspage);

```


## Usage

Widget contains 3 properties:
<code>name</code>, <code>status</code> <code>last_updated_at</code>

Name is clickable url that opens status page in new window.

Statuses are pulled directly from single statuspage api endpoint (/api/v2/status.json). 

Based on the current status, label and background color are dynamically changed:

indicator         | description                | color
------------------|----------------------------|------------
`none`            | `All Systems Operational`  | `green`
`minor`           | `Partial System Outage`    | `orange`
`major`           | `Major Service Outage`     | `red`
`critical`        | `Critical Service Outage`  | `red`



