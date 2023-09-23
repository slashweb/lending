const config = {
    development: {
        WALLETCONNECT: {
            PROYECT_ID: 'afbc50dd45344f9efbad7a3c05239c56'
        },
        CONTRACT: {
            key: '0x196A6901F89591bCEee0e50e4d55A16aA5411735'
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
            key: '0x196A6901F89591bCEee0e50e4d55A16aA5411735'
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
            key: '0x196A6901F89591bCEee0e50e4d55A16aA5411735'
        },
        WORLDCOIN: {
            APP_ID: 'app_f177c7f33a49a50ca1ce33f8ed9f0909',
        },
    } 
};

export const environment = config[process.env.NODE_ENV || 'development'];
