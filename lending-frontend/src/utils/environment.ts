type SingleConfig = {
    WALLETCONNECT: {
        PROYECT_ID: string;
    },
    CONTRACT: {
        key: string;
    }
}
type Config = {
    development: SingleConfig,
    production: SingleConfig,
    test: SingleConfig,
}

const config: Config = {
    development: {
        WALLETCONNECT: {
            PROYECT_ID: 'afbc50dd45344f9efbad7a3c05239c56'
        },
        CONTRACT: {
            key: '0xcEe9E524Bb2b475F43c2755a38026B9b4a6CBD4a'
        },
    },
    test: {
        WALLETCONNECT: {
            PROYECT_ID: 'afbc50dd45344f9efbad7a3c05239c56'
        },
        CONTRACT: {
            key: '0xcEe9E524Bb2b475F43c2755a38026B9b4a6CBD4a'
        },
    },
    production: {
        WALLETCONNECT: {
            PROYECT_ID: 'afbc50dd45344f9efbad7a3c05239c56'
        },
        CONTRACT: {
            key: '0xcEe9E524Bb2b475F43c2755a38026B9b4a6CBD4a'
        },
    } 
};

export const environment = config[process.env.NODE_ENV || 'development'];
