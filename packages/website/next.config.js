module.exports = {
    future: { webpack5: false },
    async redirects() {
        return [
            {
                source: '/developer',
                destination: '/developer/intro',
                permanent: true,
            },
        ]
    },
}