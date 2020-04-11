var plugins = [{
      plugin: require('/home/martin/martin-andersen-cv/www/node_modules/gatsby-plugin-typography/gatsby-ssr'),
      options: {"plugins":[],"pathToConfigModule":"/home/martin/martin-andersen-cv/www/node_modules/@christiandavid/gatsby-theme-byfolio/src/utils/typography"},
    },{
      plugin: require('/home/martin/martin-andersen-cv/www/node_modules/gatsby-plugin-manifest/gatsby-ssr'),
      options: {"plugins":[],"name":"CV - Martin Andersen webmaeistro","short_name":"MA","description":"This cool App contains information about my work experience as a software developer.","lang":"en","start_url":"/","background_color":"#000","theme_color":"#fff","display":"standalone","icon":"src/images/icon.png"},
    },{
      plugin: require('/home/martin/martin-andersen-cv/www/node_modules/gatsby-plugin-transition-link/gatsby-ssr'),
      options: {"plugins":[],"layout":"/home/martin/martin-andersen-cv/www/node_modules/@christiandavid/gatsby-theme-byfolio/src/layout/index.js"},
    },{
      plugin: require('/home/martin/martin-andersen-cv/www/node_modules/gatsby-plugin-offline/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/home/martin/martin-andersen-cv/www/node_modules/gatsby-plugin-react-helmet/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/home/martin/martin-andersen-cv/www/node_modules/gatsby-plugin-sitemap/gatsby-ssr'),
      options: {"plugins":[],"exclude":["/experience/_additionalSkills"]},
    },{
      plugin: require('/home/martin/martin-andersen-cv/www/node_modules/gatsby-plugin-google-gtag/gatsby-ssr'),
      options: {"plugins":[],"trackingIds":["UA-"],"gtagConfig":{"anonymize_ip":true,"cookie_expires":0,"send_page_view":true,"cookie_name":"martin-andersen-cv.now.sh"},"pluginConfig":{"head":false,"respectDNT":false}},
    }]
// During bootstrap, we write requires at top of this file which looks like:
// var plugins = [
//   {
//     plugin: require("/path/to/plugin1/gatsby-ssr.js"),
//     options: { ... },
//   },
//   {
//     plugin: require("/path/to/plugin2/gatsby-ssr.js"),
//     options: { ... },
//   },
// ]

const apis = require(`./api-ssr-docs`)

// Run the specified API in any plugins that have implemented it
module.exports = (api, args, defaultReturn, argTransform) => {
  if (!apis[api]) {
    console.log(`This API doesn't exist`, api)
  }

  // Run each plugin in series.
  // eslint-disable-next-line no-undef
  let results = plugins.map(plugin => {
    if (!plugin.plugin[api]) {
      return undefined
    }
    const result = plugin.plugin[api](args, plugin.options)
    if (result && argTransform) {
      args = argTransform({ args, result })
    }
    return result
  })

  // Filter out undefined results.
  results = results.filter(result => typeof result !== `undefined`)

  if (results.length > 0) {
    return results
  } else {
    return [defaultReturn]
  }
}
