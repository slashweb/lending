type SingleConfig = {
    WALLETCONNECT: {
        PROYECT_ID: string;
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
        }
    },
    test: {
        WALLETCONNECT: {
            PROYECT_ID: 'afbc50dd45344f9efbad7a3c05239c56'
        }
    },
    production: {
        WALLETCONNECT: {
            PROYECT_ID: 'afbc50dd45344f9efbad7a3c05239c56'
        }
    } 
};

export const environment = config[process.env.NODE_ENV || 'development'];
