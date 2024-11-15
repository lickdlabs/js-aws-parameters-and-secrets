type TResponse = {
  Parameter: {
    ARN: string;
    DataType: string;
    LastModifiedDate: string;
    Name: string;
    Selector: null;
    SourceResult: null;
    Type: string;
    Value: string;
    Version: number;
  };
  ResultMetadata: object;
};

const AWS_SECRETS_EXTENTION_HTTP_HOST =
  process.env.AWS_SECRETS_EXTENTION_HTTP_HOST || "localhost";

const AWS_SECRETS_EXTENTION_HTTP_PORT =
  process.env.AWS_SECRETS_EXTENTION_HTTP_PORT || 2773;

const AWS_SECRETS_EXTENTION_HTTP_PATH =
  "/systemsmanager/parameters/get/?withDecryption=true&name=";

const AWS_SECRETS_EXTENTION_SERVER_ENDPOINT = `http://${AWS_SECRETS_EXTENTION_HTTP_HOST}:${AWS_SECRETS_EXTENTION_HTTP_PORT}${AWS_SECRETS_EXTENTION_HTTP_PATH}`;

export const getParamater = async (path: string): Promise<TResponse> => {
  const response = await fetch(AWS_SECRETS_EXTENTION_SERVER_ENDPOINT + path, {
    method: "GET",
    headers: {
      "X-Aws-Parameters-Secrets-Token": process.env.AWS_SESSION_TOKEN!,
    },
  });

  if (!response.ok) {
    throw new Error(
      `Error occured while requesting secret ${path}. Responses status was ${response.status}`,
    );
  }

  return (await response.json()) as TResponse;
};

export const getParamaterValue = async (path: string): Promise<string> =>
  (await getParamater(path)).Parameter.Value;
