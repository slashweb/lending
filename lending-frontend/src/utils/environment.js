const config = {
    development: {
        WALLETCONNECT: {
            PROYECT_ID: 'afbc50dd45344f9efbad7a3c05239c56'
        },
        CONTRACT: {
            key: '0x56F84b7888725E97ec1Ed242BCF1E3223043C1a9'
        },
    },
    test: {
        WALLETCONNECT: {
            PROYECT_ID: 'afbc50dd45344f9efbad7a3c05239c56'
        },
        CONTRACT: {
            key: '0x56F84b7888725E97ec1Ed242BCF1E3223043C1a9'
        },
    },
    production: {
        WALLETCONNECT: {
            PROYECT_ID: 'afbc50dd45344f9efbad7a3c05239c56'
        },
        CONTRACT: {
            key: '0x56F84b7888725E97ec1Ed242BCF1E3223043C1a9'
        },
    } 
};

export const environment = config[process.env.NODE_ENV || 'development'];
