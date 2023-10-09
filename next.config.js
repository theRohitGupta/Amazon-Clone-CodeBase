module.exports = {
    images: {
        domains: ["links.papareact.com", "fakestoreapi.com", "pngimg.com"]
    },
    webpack: (config, options) => {
        config.module.rules.push(
          {
            test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
            loader: 'url-loader?limit=100000' 
          }
        )
        return config
      },
      env:{
        stripe_public_key: process.env.STRIPE_PUBLIC_KEY
      }
}