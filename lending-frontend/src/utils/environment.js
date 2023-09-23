const config = {
    development: {
        WALLETCONNECT: {
            PROYECT_ID: 'afbc50dd45344f9efbad7a3c05239c56'
        },
        CONTRACT: {
            key: '0x67fda08d6c4a6Db34f7A38DfeC118705864c0937'
        },
        WORLDCOIN: {
            APP_ID: 'app_f177c7f33a49a50ca1ce33f8ed9f0909',
        },
    },
    test: {
        WALLETCONNECT: {
            PROYECT_ID: 'afbc50dd45344f9efbad7a3c05239c56'
        },
        CONTRACT: {
            key: '0x67fda08d6c4a6Db34f7A38DfeC118705864c0937'
        },
        WORLDCOIN: {
            APP_ID: 'app_f177c7f33a49a50ca1ce33f8ed9f0909',
        },
    },
    production: {
        WALLETCONNECT: {
            PROYECT_ID: 'afbc50dd45344f9efbad7a3c05239c56'
        },
        CONTRACT: {
            key: '0x67fda08d6c4a6Db34f7A38DfeC118705864c0937'
        },
        WORLDCOIN: {
            APP_ID: 'app_f177c7f33a49a50ca1ce33f8ed9f0909',
        },
    } 
};

export const environment = config[process.env.NODE_ENV || 'development'];
