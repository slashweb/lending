const config = {
    development: {
        WALLETCONNECT: {
            PROYECT_ID: 'afbc50dd45344f9efbad7a3c05239c56'
        },
        CONTRACT: {
            key: '0x70D314258d8b04cc85a36CEF084194344335DBcA'
        },
        WORLDCOIN: {
            APP_ID: 'app_db53bb67695d234a2b5a02105cdf4f47',
        },
    },
    test: {
        WALLETCONNECT: {
            PROYECT_ID: 'afbc50dd45344f9efbad7a3c05239c56'
        },
        CONTRACT: {
            key: '0x70D314258d8b04cc85a36CEF084194344335DBcA'
        },
        WORLDCOIN: {
            APP_ID: 'app_db53bb67695d234a2b5a02105cdf4f47',
        },
    },
    production: {
        WALLETCONNECT: {
            PROYECT_ID: 'afbc50dd45344f9efbad7a3c05239c56'
        },
        CONTRACT: {
            key: '0x70D314258d8b04cc85a36CEF084194344335DBcA'
        },
        WORLDCOIN: {
            APP_ID: 'app_db53bb67695d234a2b5a02105cdf4f47',
        },
    } 
};

export const environment = config[process.env.NODE_ENV || 'development'];
