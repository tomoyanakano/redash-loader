# Redash Loader

  `redash-loader` is command line tool make it possible to fetch redash content(query and dashboard) from your Redash.
  <br>

## Usage

### install

Execute below command and install package.
```
install -g redash-loader
```

Download your Redash content.
```
redash-loader load <type> --api-key=YOUR_REDASH_USER_API_KEY --redash-url=YOUR_REDASH_URL
```
※ type would be `query`, `dashboard` or `all`.


Download redash content in current directory like below.
```
--current
  |-query
  | |-query_${id}
  | | |-query_${id}.sql //sql file
  | | |-query_${id}.json //json object
  | |-...
  |-dashboard
  | |-dashboard_${id}
  | | |-dashboard_${id}.json //json object
  | |-...
```
<br>

## How it helps
It is useful if you would like to control the versions of Redash queries or dashboards, and also like to backup those.<br>
Running it continuously with cron or github actions makes it possible.


# Contribution
please feel free to add issue and create pull request!!