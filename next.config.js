// next.config.js
// buraya eklenen domainlerdeki resimlerin yüklenmesine izin verir
module.exports = {
    images: {
        remotePatterns: [
            {
                hostname: '**.com',
            },
        ],
    },
};
