const region = "ap-southeast-2";

const dev = {
  s3: {
    REGION: region,
    BUCKET: "storage-dev-s3bucket-pkk8p6ig7t44"
  },
  apiGateway: {
    REGION: region,
    URL: "https://api.bobletv2.tigerbaby.com.au/dev"
  },
  cognito: {
    REGION: region,
    USER_POOL_ID: "ap-southeast-2_CDlNgyWmi",
    APP_CLIENT_ID: "1g9ttadmcgifdksvefr4n1ttv3",
    IDENTITY_POOL_ID: "ap-southeast-2:e9674cd4-c808-4cf4-aaca-c6f7512465ba"
  }
};

const prod = {
  s3: {
    REGION: region,
    BUCKET: "storage-prod-s3bucket-e2u3xeg8t2cz"
  },
  apiGateway: {
    REGION: region,
    URL: "https://api.bobletv2.tigerbaby.com.au/prod"
  },
  cognito: {
    REGION: region,
    USER_POOL_ID: "	ap-southeast-2_VxvFbG89p",
    APP_CLIENT_ID: "7c4ictrcjf7ac22664u2ef7lrr",
    IDENTITY_POOL_ID: "ap-southeast-2:d6bc6646-a5e6-4dc1-963e-3ee39ca5da4b	"
  }
};

// Default to dev if not set
const config = process.env.REACT_APP_STAGE === 'prod'
  ? prod
  : dev;

export default {
  // Add common config values here
  MAX_ATTACHMENT_SIZE: 5000000,
  ...config
};
